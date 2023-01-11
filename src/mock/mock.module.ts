import { Module } from '@nestjs/common';
import { ClientsModule } from 'src/clients/clients.module';
import { OfficesModule } from 'src/offices/offices.module';
import { PackagesModule } from 'src/packages/packages.module';
import { TrucksModule } from 'src/trucks/trucks.module';
import { MockDataController } from './mock-data/mock-data.controller';
import { MockDataService } from './mock-data/mock-data.service';

@Module({
  imports: [PackagesModule, TrucksModule, OfficesModule, ClientsModule],
  providers: [MockDataService],
  exports: [],
  controllers: [MockDataController],
})
export class MockModule {}
