import { Module } from '@nestjs/common';
import { OfficesModule } from 'src/offices/offices.module';
import { UtilsModule } from 'src/utils/utils.module';
import { TestingController } from './testing.controller';

@Module({
  imports: [OfficesModule, UtilsModule],
  controllers: [TestingController],
})
export class TestingModule {}
