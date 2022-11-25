import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as polyline from '@mapbox/polyline';

@Injectable()
export class MapboxProvider {
  // mapbox.provider
  private mapboxToken: string;
  private mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/`;
  private mapboxDrivingUrl = `https://api.mapbox.com/directions/v5/`;

  constructor(configService: ConfigService, private httpService: HttpService) {
    this.mapboxToken = configService.get<string>('MAPBOX_TOKEN');
  }

  async getCoordinates(address: string) {
    const url = `${this.mapboxGeocodingUrl}mapbox.places/${address}.json?access_token=${this.mapboxToken}`;
    return firstValueFrom(this.httpService.get(url)).then((response) => {
      return response.data.features[0].geometry.coordinates;
    });
  }

  async getAddress(lat: number, lng: number) {
    const url = `${this.mapboxGeocodingUrl}mapbox.places/${lng},${lat}.json?access_token=${this.mapboxToken}`;
    return firstValueFrom(this.httpService.get(url))
      .then((response) => {
        return response.data.features[0].place_name;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getDistance(origin: string, destination: string) {
    const url = `${this.mapboxGeocodingUrl}mapbox/driving/${origin};${destination}.json?access_token=${this.mapboxToken}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // return data.routes[0].distance;
  }

  async getDuration(origin: string, destination: string) {
    const url = `${this.mapboxGeocodingUrl}mapbox/driving/${origin};${destination}.json?access_token=${this.mapboxToken}`;
    // const response = await fetch(url);
    // const data = await response.json();
    // return data.routes[0].duration;
  }

  async getRoute(origin: string, destination: string) {
    const url = `${this.mapboxDrivingUrl}mapbox/driving-traffic/${origin};${destination}?geometries=polyline&access_token=${this.mapboxToken}`;
    return firstValueFrom(this.httpService.get(url))
      .then((response) => {
        const polyLine = polyline.decode(response.data.routes[0].geometry);
        const pointsWithDistance = this.mapToPointsWithDistance(polyLine);
        const totalDistance =
          pointsWithDistance[pointsWithDistance.length - 1].totalDistance;
        return { totalDistance, points: pointsWithDistance };
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async getRouteSteps(origin: string, destination: string) {
    const url = `${this.mapboxDrivingUrl}mapbox/driving/${origin};${destination}.json?access_token=${this.mapboxToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].legs[0].steps;
  }

  async getRouteCoordinates(origin: string, destination: string) {
    const url = `${this.mapboxDrivingUrl}mapbox/driving/${origin};${destination}.json?access_token=${this.mapboxToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].geometry.coordinates;
  }

  mapToPointsWithDistance(points: [number, number][]) {
    const pointsWithDistance = [];
    let distance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      const distanceToNextPoint = this.getDistanceBetweenPoints(
        point,
        nextPoint,
      );
      // eslint-disable-next-line prettier/prettier
      distance = +((distance + distanceToNextPoint).toFixed(2));
      pointsWithDistance.push({
        points: {
          lat: point[0],
          lng: point[1],
        },
        totalDistance: distance,
        difference: distanceToNextPoint,
      });
    }
    return pointsWithDistance;
  }

  calculateDistance(points: [number, number][]) {
    let distance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      distance += this.getDistanceBetweenPoints(points[i], points[i + 1]);
    }
    return distance;
  }

  getDistanceBetweenPoints(point1: [number, number], point2: [number, number]) {
    const R = 6371e3; // metres
    const φ1 = (point1[0] * Math.PI) / 180; // φ, λ in radians
    const φ2 = (point2[0] * Math.PI) / 180;
    const Δφ = ((point2[0] - point1[0]) * Math.PI) / 180;
    const Δλ = ((point2[1] - point1[1]) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    // eslint-disable-next-line prettier/prettier
    return +((d / 1000).toFixed(2)); // in km
  }
}
