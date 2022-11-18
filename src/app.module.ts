import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';
import { TrucksModule } from './trucks/trucks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { RoutesModule } from './routes/routes.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    UsersModule,
    PackagesModule,
    TrucksModule,
    OfficesModule,
    RoutesModule,
    DeliveriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // appmodule
}
