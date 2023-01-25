import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { RoutesModule } from 'src/routes/routes.module';
import { Delivery, DeliverySchema } from './entities/delivery.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TrucksModule } from 'src/trucks/trucks.module';
import { PackagesModule } from 'src/packages/packages.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
    RoutesModule,
    TrucksModule,
    PackagesModule,
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
