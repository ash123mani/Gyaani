import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [HttpModule],
  providers: [CmsController, CmsService],
})
export class CmsModule {}
