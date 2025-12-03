import { db } from '@/db';
import { instagramPosts } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const samplePosts = [
        {
            postUrl: 'https://instagram.com/p/sample1',
            imageUrl: '/images/instagram/post1.jpg',
            caption: 'Healthy snacking just got easier! 🥜🍪 Try our Sugar-Free Cookie Pack #HealthySnacks #Geetato',
            likesCount: 342,
            commentsCount: 28,
            postedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            isActive: true,
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        },
        {
            postUrl: 'https://instagram.com/p/sample2',
            imageUrl: '/images/instagram/post2.jpg',
            caption: 'Natural energy from our Jaggery Energy Bites 💪✨ Perfect pre-workout snack #NaturalEnergy #HealthyLiving',
            likesCount: 289,
            commentsCount: 19,
            postedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            isActive: true,
            createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        },
        {
            postUrl: 'https://instagram.com/p/sample3',
            imageUrl: '/images/instagram/post3.jpg',
            caption: 'Who says you can\'t have brownies? Try our Sugar-Free version! 🍫❤️ #SugarFree #HealthyDessert',
            likesCount: 418,
            commentsCount: 35,
            postedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            isActive: true,
            createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
        {
            postUrl: 'https://instagram.com/p/sample4',
            imageUrl: '/images/instagram/post4.jpg',
            caption: 'Fiber-rich goodness in every bite! Our Oat & Millet Cookies 🌾🍪 #HighFiber #HealthySnacking',
            likesCount: 256,
            commentsCount: 22,
            postedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
            isActive: true,
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        },
    ];

    await db.insert(instagramPosts).values(samplePosts);
    
    console.log('✅ Instagram posts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});