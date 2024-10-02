import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class RssCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  feedUrl: string;  // RSS feed URL

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.rssCampaigns)
  organization: Organization;

  @ManyToOne(() => List, (list) => list.rssCampaigns)
  list: List;
}
