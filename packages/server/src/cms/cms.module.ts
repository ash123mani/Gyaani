import { Module } from '@nestjs/common';

import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  providers: [CmsController, CmsService],
})
export class CmsModule {}
