import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './organizations/organizations.module';
import { UserModule } from './users/users.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ListsModule } from './lists/lists.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ClickStatsModule } from './click_stats/click_stats.module';
import { AuthModule } from './auth/auth.module';
import { Campaign } from './campaigns/entities/campaign.entity';
import { List } from './lists/entities/list.entity';
import { ClickStat } from './click_stats/entities/click_stat.entity';
import { Organization } from './organizations/entities/organization.entity';
import { Subscriber } from './subscribers/entities/subscriber.entity';
import { User } from './users/entities/user.entity';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/task.module';
import { RssCampaignModule } from './rss-campaign/rss-campaign.module';
import { RssCampaign } from './rss-campaign/entities/rss-campaign.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pulkit@6263626091',
      database: 'NewsLetter',
      entities: [Campaign, ClickStat, List, Organization, Subscriber, User, RssCampaign],
      synchronize: true,  // For dev environment only, not recommended in production
    }),
    TypeOrmModule.forFeature([RssCampaign]), // Ensure this is included
    OrganizationsModule,
    UserModule,
    SubscribersModule,

    ListsModule,
    CampaignsModule,
    ClickStatsModule,
    AuthModule,
    EmailModule,
    ScheduleModule.forRoot(), TasksModule, RssCampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
