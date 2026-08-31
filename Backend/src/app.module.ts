import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TemplatesModule } from './templates/templates.module';
import { ClientsModule } from './clients/clients.module';
import { WebsitesModule } from './websites/websites.module';
import { ThemeModule } from './content/theme/theme.module';
import { HeroModule } from './content/hero/hero.module';
import { AboutModule } from './content/about/about.module';
import { ContactModule } from './content/contact/contact.module';
import { ServicesModule } from './content/services/services.module';
import { GalleryModule } from './content/gallery/gallery.module';
import { TestimonialsModule } from './content/testimonials/testimonials.module';
import { SocialLinksModule } from './content/social-links/social-links.module';
import { MediaModule } from './content/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    TemplatesModule,
    ClientsModule,
    WebsitesModule,
    ThemeModule,
    HeroModule,
    AboutModule,
    ContactModule,
    ServicesModule,
    GalleryModule,
    TestimonialsModule,
    SocialLinksModule,
    MediaModule,
  ],
})
export class AppModule {}
