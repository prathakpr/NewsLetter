import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Parser from 'rss-parser';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RssCampaignService {
    private readonly logger = new Logger(RssCampaignService.name);
    private parser = new Parser();
    private latestFeedItem: string | null = null; // Store the ID of the latest item

    constructor(private readonly mailerService: MailerService) { }

    @Cron('0 0 * * *')  // Run once a day at midnight, or customize this timing
    async checkRssFeed() {
        const rssUrl = 'https://your-news-rss-feed.com/rss';
        try {
            const feed = await this.parser.parseURL(rssUrl);

            const latestItem = feed.items[0];  // Get the most recent item
            if (this.latestFeedItem !== latestItem.guid) {
                this.latestFeedItem = latestItem.guid;  // Update the stored latest item
                this.logger.log('New RSS feed item detected: ' + latestItem.title);

                await this.sendEmailCampaign(latestItem);
            }
        } catch (error) {
            this.logger.error('Failed to fetch or parse RSS feed: ' + error.message, error.stack);
        }
    }

    async sendEmailCampaign(item: any) {
        const emailTemplate = this.createEmailTemplate(item);

        try {
            await this.mailerService.sendMail({
                to: 'subscriber@example.com',  // You might loop through subscribers
                subject: `New Post: ${item.title}`,
                html: emailTemplate,
            });
            this.logger.log(`Email sent to subscriber for RSS feed item: ${item.title}`);
        } catch (error) {
            this.logger.error(`Failed to send email: ${error.message}`, error.stack);
        }
    }

    private createEmailTemplate(item: any): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #f9f9f9;
                }
                .header {
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .content {
                    font-size: 18px;
                    margin-bottom: 20px;
                }
                .footer {
                    font-size: 16px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    New Post: ${item.title}
                </div>
                <div class="content">
                    <strong>${item.contentSnippet}</strong>
                    <br><br>
                    <a href="${item.link}">Read more</a>
                </div>
                <div class="footer">
                    Thank you,<br>
                    Team NewsLetter
                </div>
            </div>
        </body>
        </html>
        `;
    }
}
