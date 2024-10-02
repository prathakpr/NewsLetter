import { Test, TestingModule } from '@nestjs/testing';
import { RssCampaignController } from './rss-campaign.controller';

describe('RssCampaignController', () => {
  let controller: RssCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RssCampaignController],
    }).compile();

    controller = module.get<RssCampaignController>(RssCampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
