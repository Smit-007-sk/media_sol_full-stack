import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WebsiteGenerationService } from '../website-generation/website-generation.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger('WebsiteGenerationCron');

  constructor(
    private readonly websiteGenerationService: WebsiteGenerationService,
  ) {}

  @Cron('* * * * *')
  async handleCron() {
    this.logger.log('Worker tick');

    try {
      const pendingJobs = await this.websiteGenerationService.findPendingJobs(5);

      for (const job of pendingJobs) {
        try {
          this.logger.log(`Found pending job: ${job.id}`);

          const claimed = await this.websiteGenerationService.claimJob(job.id);

          if (claimed) {
            this.logger.log(`Job ${job.id} claimed successfully`);
            this.logger.log(`Job ${job.id} is now PROCESSING`);

            if (job.request) {
              // 1. Template Selection
              this.logger.log(`Selecting template for request: ${job.request.id}`);
              const selection = await this.websiteGenerationService.selectAndPersistTemplate(
                job.id,
                job.request,
              );
              this.logger.log(`Job ${job.id} template selected: ${selection.templateKey}`);

              // 2. AI Content Generation
              this.logger.log(`Starting AI content generation for job: ${job.id}`);
              const { metadata } =
                await this.websiteGenerationService.generateAndPersistAiContent(
                  job.id,
                  job.request,
                  selection.templateKey,
                );
              this.logger.log(
                `Job ${job.id} AI content generated successfully (${metadata.provider} / ${metadata.model})`,
              );

              // 3. Website & CMS Draft Creation
              this.logger.log(`Creating draft website and CMS records for job: ${job.id}`);
              const result = await this.websiteGenerationService.createDraftWebsite(job.id);

              this.logger.log(
                `Job ${job.id} COMPLETED: Draft website created at /site/${result.website.slug} (Status: ${result.website.status})`,
              );
            } else {
              this.logger.warn(`Job ${job.id} has no associated request record`);
            }
          } else {
            this.logger.warn(
              `Job ${job.id} could not be claimed (already claimed or status modified)`,
            );
          }
        } catch (jobError) {
          this.logger.error(
            `Failed to process job ${job.id}: ${jobError?.message || jobError}`,
            jobError?.stack,
          );
          try {
            await this.websiteGenerationService.markJobFailed(
              job.id,
              jobError?.message || String(jobError),
            );
          } catch (failErr) {
            this.logger.error(`Could not record job failure state: ${failErr?.message || failErr}`);
          }
        }
      }
    } catch (error) {
      this.logger.error(
        `Error during cron worker execution: ${error?.message || error}`,
        error?.stack,
      );
    }
  }
}
