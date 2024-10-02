import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssCampaign } from './entities/rss-campaign.entity';
import { RssCampaignService } from './rss-campaign.service';
import { RssCampaignController } from './rss-campaign.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RssCampaign])],
  providers: [RssCampaignService],
  controllers: [RssCampaignController],
})
export class RssCampaignModule {}