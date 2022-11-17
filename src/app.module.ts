import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';
import { TrucksModule } from './trucks/trucks.module';
import { OfficesModule } from './offices/offices.module';

@Module({
  imports: [UsersModule, PackagesModule, TrucksModule, OfficesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
