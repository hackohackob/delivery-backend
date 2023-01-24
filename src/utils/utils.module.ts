import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { OfficesModule } from 'src/offices/offices.module';
import { RoutesModule } from 'src/routes/routes.module';
import { MapboxProvider } from './mapbox.provider/mapbox.provider';
import { PriceService } from './price.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => RoutesModule),
    forwardRef(() => OfficesModule),
  ],
  providers: [MapboxProvider, PriceService],
  exports: [MapboxProvider, PriceService],
  controllers: [],
})
export class UtilsModule {}
