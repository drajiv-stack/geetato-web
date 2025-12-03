import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { instagramPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db.select()
      .from(instagramPosts)
      .where(eq(instagramPosts.isActive, true))
      .orderBy(desc(instagramPosts.postedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED'
      }, { status: 401 });
    }

    const userEmail = session.user?.email;
    if (!userEmail || !userEmail.toLowerCase().includes('admin')) {
      return NextResponse.json({ 
        error: 'Admin access required',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await request.json();
    const { imageUrl, postUrl, caption, likesCount, commentsCount, isActive } = body;

    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return NextResponse.json({ 
        error: 'imageUrl is required and must be a non-empty string',
        code: 'MISSING_REQUIRED_FIELD'
      }, { status: 400 });
    }

    const now = new Date();
    const insertData = {
      imageUrl: imageUrl.trim(),
      postUrl: postUrl ? postUrl.trim() : null,
      caption: caption ? caption.trim() : null,
      likesCount: typeof likesCount === 'number' ? likesCount : 0,
      commentsCount: typeof commentsCount === 'number' ? commentsCount : 0,
      isActive: typeof isActive === 'boolean' ? isActive : true,
      postedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const newPost = await db.insert(instagramPosts)
      .values(insertData)
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}