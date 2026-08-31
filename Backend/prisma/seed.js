"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const TEMPLATE_METADATA = {
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
            role: client_1.UserRole.ADMIN,
            isActive: true,
        },
        create: {
            name: 'Development Admin',
            email: adminEmail,
            passwordHash,
            role: client_1.UserRole.ADMIN,
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
