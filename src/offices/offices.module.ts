import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './entities/office.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Office.name,
        schema: OfficeSchema,
      },
    ]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
