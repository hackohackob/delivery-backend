import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RoutesModule } from 'src/routes/routes.module';
import { MapboxProvider } from './mapbox.provider/mapbox.provider';
import { PriceService } from './price.service';

@Module({
  imports: [HttpModule, RoutesModule],
  providers: [MapboxProvider, PriceService],
  exports: [MapboxProvider, PriceService],
})
export class UtilsModule {}
