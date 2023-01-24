import { Controller, Get, Param, Query } from '@nestjs/common';
import { OfficesService } from 'src/offices/offices.service';
import { MapboxProvider } from 'src/utils/mapbox.provider/mapbox.provider';

@Controller('testing')
export class TestingController {
  constructor(
    private mapboxProvider: MapboxProvider,
    private officeService: OfficesService,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('mapbox-address')
  async getMapboxTest(): Promise<any> {
    return await this.mapboxProvider.getAddress(40.7128, -74.006);
  }

  @Get('mapbox-position')
  async getMapboxTestPosition(@Query('address') address): Promise<any> {
    return await this.mapboxProvider.getCoordinates(address);
  }

  @Get('offices-routes')
  async getOfficesRoutes(@Query('fo') fo, @Query('so') so): Promise<any> {
    const allOffices = await this.officeService.findAll();
    const firstOffice = allOffices[+fo];
    const secondOffice = allOffices[+so];
    const route = await this.mapboxProvider.getPathBetweenPoints(
      `${firstOffice.lng},${firstOffice.lat}`,
      `${secondOffice.lng},${secondOffice.lat}`,
    );
    // const route = await this.mapboxProvider.getRoute(
    //   `Varna, Bulgaria`,
    //   `Sofia, Bulgaria`,
    // );
    return route;
  }
}
