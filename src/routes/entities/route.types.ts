export type RoutePath = {
  totalDistance: number;
  points: PathPoints[];
};

export type PathPoints = {
  points: {
    lat: number;
    lng: number;
  };
  totalDistance: number;
  difference: number;
};
