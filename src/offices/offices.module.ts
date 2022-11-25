import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './entities/office.schema';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Office.name,
        schema: OfficeSchema,
      },
    ]),
    UtilsModule,
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService],
})
export class OfficesModule {}
