import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RssCampaignService } from './rss-campaign.service';

@Controller('rss-campaign')
export class RssCampaignController {
  constructor(private readonly rssCampaignService: RssCampaignService) {}

  @Post('create')
  async createCampaign(
    @Body('feedUrl') feedUrl: string,
    @Body('title') title: string,
    @Body('organizationId') organizationId: number,
    @Body('listId') listId: number,
  ) {
    return await this.rssCampaignService.createCampaign(feedUrl, title, organizationId, listId);
  }

  @Get('fetch/:id')
  async fetchFeed(@Param('id') campaignId: number) {
    const rssCampaign = await this.rssCampaignService.fetchFeed(campaignId);
    return rssCampaign;
  }

  @Get('fetch')
async fetchFeed(@Body('feedUrl') feedUrl: string) {
  const rssFeedData = await this.rssCampaignService.fetchFeed(feedUrl);
  return rssFeedData;
}
}
