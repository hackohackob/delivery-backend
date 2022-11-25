import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { PackagesModule } from './packages/packages.module';
import { TrucksModule } from './trucks/trucks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from './utils/utils.module';
import { TestingModule } from './temp/testing/testing.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    HttpModule,
    ClientsModule,
    PackagesModule,
    TrucksModule,
    OfficesModule,
    RoutesModule,
    DeliveriesModule,
    UtilsModule,
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // appmodule
}
