import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const TEMPLATE_METADATA: Record<string, Record<string, { name: string; description: string }>> = {
  'project-1-ai': {
    'template-01': {
      name: 'Emerald Prestige',
      description: 'An opulent emerald and ivory consultancy layout with refined typography, executive service showcases, and elegant storytelling.',
    },
    'template-02': {
      name: 'Editorial Terra',
      description: 'A warm terracotta editorial website layout crafted for creative publications, lifestyle brands, and architectural showcases.',
    },
    'template-03': {
      name: 'Pitch Gold Studio',
      description: 'An ultra-dark pitch black and gold design layout for luxury brands, high-end studios, and premium portfolios.',
    },
    'template-04': {
      name: 'Slate Blue Enterprise',
      description: 'A clean slate-blue corporate website featuring live metrics counters, enterprise case studies, and structured client testimonials.',
    },
    'template-05': {
      name: 'Alabaster Minimal',
      description: 'A pristine minimalist layout emphasizing narrative storytelling, craftsmanship, and subtle luxury visual presentations.',
    },
  },
  'project-2': {
    'template-01': {
      name: 'Aetheria Tech Cloud',
      description: 'A high-performance dark neon SaaS and cloud platform template with architecture diagrams, interactive SDK docs, and pricing tiers.',
    },
    'template-02': {
      name: 'Apex Luxury Estate',
      description: 'A premium real estate and architectural property showcase template with property grids, amenity highlights, and lead forms.',
    },
    'template-03': {
      name: 'Verve Creative Motion',
      description: 'A bold motion design studio layout featuring marquee text tickers, philosophy highlights, press coverage, and creative portfolios.',
    },
    'template-04': {
      name: 'Vitalis Medical Portal',
      description: 'A modern healthcare and clinical wellness template with appointment booking widgets, treatment timelines, and physician profiles.',
    },
    'template-05': {
      name: 'Vanguard Corporate Suite',
      description: 'A comprehensive enterprise suite template featuring interactive quote calculators, live demo modals, blog feeds, and stats counters.',
    },
  },
};

async function main() {
  console.log('Starting seed process...');

  const devAdminPassword = process.env.DEV_ADMIN_PASSWORD || 'ChangeMe123!';
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
  const passwordHash = await bcrypt.hash(devAdminPassword, saltRounds);

  // 1. Seed Development Admin User
  const adminEmail = 'admin@example.test';
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Development Admin',
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      name: 'Development Admin',
      email: adminEmail,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });
  console.log(`Seeded dev admin user: ${adminUser.email}`);

  // 2. Seed Projects
  const projectsData = [
    {
      name: 'Project-1(AI)',
      slug: 'project-1-ai',
      description: 'AI powered website templates',
    },
    {
      name: 'Project-2',
      slug: 'project-2',
      description: 'Standard client website templates',
    },
  ];

  for (const projData of projectsData) {
    const project = await prisma.project.upsert({
      where: { slug: projData.slug },
      update: { name: projData.name, description: projData.description },
      create: projData,
    });
    console.log(`Seeded project: ${project.name} (${project.slug})`);

    // 3. Seed 5 Templates for each Project with professional names & descriptions
    const templateKeys = [
      'template-01',
      'template-02',
      'template-03',
      'template-04',
      'template-05',
    ];

    for (const key of templateKeys) {
      const meta = TEMPLATE_METADATA[project.slug]?.[key] || {
        name: `${project.name} - ${key.toUpperCase()}`,
        description: `Reusable ${key} for ${project.name}`,
      };
      const templateSlug = `${project.slug}-${key}`;

      await prisma.template.upsert({
        where: {
          projectId_templateKey: {
            projectId: project.id,
            templateKey: key,
          },
        },
        update: {
          name: meta.name,
          description: meta.description,
          slug: templateSlug,
        },
        create: {
          projectId: project.id,
          name: meta.name,
          slug: templateSlug,
          templateKey: key,
          description: meta.description,
          previewImage: `/previews/${templateSlug}.jpg`,
          isActive: true,
        },
      });
      console.log(`  - Seeded template: "${meta.name}" (${key}) for ${project.name}`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
