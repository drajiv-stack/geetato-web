import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { instagramPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Extract and validate ID from route params
    const { id } = await context.params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check admin authentication
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      postUrl,
      imageUrl,
      caption,
      likesCount,
      commentsCount,
      isActive
    } = body;

    // Check if Instagram post exists
    const existingPost = await db.select()
      .from(instagramPosts)
      .where(eq(instagramPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Instagram post not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Prepare update data - only include provided fields
    const updateData: Record<string, any> = {
      updatedAt: new Date()
    };

    if (postUrl !== undefined) updateData.postUrl = postUrl;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (caption !== undefined) updateData.caption = caption;
    if (likesCount !== undefined) updateData.likesCount = likesCount;
    if (commentsCount !== undefined) updateData.commentsCount = commentsCount;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Update the Instagram post
    const updatedPost = await db.update(instagramPosts)
      .set(updateData)
      .where(eq(instagramPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPost[0], { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Extract and validate ID from route params
    const { id } = await context.params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check admin authentication
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Check if Instagram post exists
    const existingPost = await db.select()
      .from(instagramPosts)
      .where(eq(instagramPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Instagram post not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the Instagram post
    const deletedPost = await db.delete(instagramPosts)
      .where(eq(instagramPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      { 
        message: 'Instagram post deleted successfully',
        deletedPost: deletedPost[0]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}