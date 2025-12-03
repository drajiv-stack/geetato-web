import { db } from '@/db';
import { siteSettings } from '@/db/schema';

async function main() {
    const sampleSettings = [
        {
            settingKey: 'company_name',
            settingValue: 'Geetato',
            settingType: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'logo_url',
            settingValue: '/images/logo.png',
            settingType: 'image',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'address',
            settingValue: '123 Health Street, Wellness City, Mumbai 400001, India',
            settingType: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'phone',
            settingValue: '+91 98765 43210',
            settingType: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'email',
            settingValue: 'hello@geetato.com',
            settingType: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'instagram_url',
            settingValue: 'https://instagram.com/geetato',
            settingType: 'url',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'facebook_url',
            settingValue: 'https://facebook.com/geetato',
            settingType: 'url',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'twitter_url',
            settingValue: 'https://twitter.com/geetato',
            settingType: 'url',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'linkedin_url',
            settingValue: 'https://linkedin.com/company/geetato',
            settingType: 'url',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            settingKey: 'tagline',
            settingValue: 'Healthy Indian Snacks for Every Lifestyle',
            settingType: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ];

    await db.insert(siteSettings).values(sampleSettings);
    
    console.log('✅ Site settings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});