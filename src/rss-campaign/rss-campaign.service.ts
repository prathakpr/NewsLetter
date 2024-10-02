import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RssCampaign } from './entities/rss-campaign.entity';
import * as Parser from 'rss-parser';  // Import RSS parser

@Injectable()
export class RssCampaignService {
  private parser: Parser;

  constructor(
    @InjectRepository(RssCampaign)
    private rssCampaignRepository: Repository<RssCampaign>,
  ) {
    this.parser = new Parser();
  }

  async createCampaign(feedUrl: string, title: string, organizationId: number, listId: number) {
    const rssCampaign: RssCampaign = this.rssCampaignRepository.create({
      feedUrl,
      title,
      organization: { id: organizationId },
      list: { id: listId },
    });

    return await this.rssCampaignRepository.save(rssCampaign);
  }

  async fetchFeed(feedUrl: string): Promise<any> {
    try {
      const feed = await this.parser.parseURL(feedUrl);
      return feed.items; // Return RSS feed items
    } catch (error) {
      throw new Error('Error fetching RSS feed');
    }
  }
}
