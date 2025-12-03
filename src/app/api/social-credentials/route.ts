import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { socialCredentials } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

async function checkAdminAuth(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return { isAdmin: false, error: 'Authentication required', status: 401 };
  }

  const isAdmin = session.user.email?.toLowerCase().includes('admin');
  if (!isAdmin) {
    return { isAdmin: false, error: 'Admin access required', status: 403 };
  }

  return { isAdmin: true, session };
}

export async function GET(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.isAdmin) {
      return NextResponse.json(
        { error: authCheck.error, code: 'UNAUTHORIZED' },
        { status: authCheck.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const platform = searchParams.get('platform');

    let query = db.select().from(socialCredentials).orderBy(desc(socialCredentials.createdAt));

    if (platform) {
      query = query.where(eq(socialCredentials.platform, platform.trim().toLowerCase()));
    }

    const credentials = await query.limit(limit).offset(offset);

    return NextResponse.json(credentials, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.isAdmin) {
      return NextResponse.json(
        { error: authCheck.error, code: 'UNAUTHORIZED' },
        { status: authCheck.status }
      );
    }

    const body = await request.json();
    const { platform, accessToken, refreshToken, expiresAt, isActive } = body;

    if (!platform || typeof platform !== 'string' || platform.trim() === '') {
      return NextResponse.json(
        { error: 'Platform is required and must be a non-empty string', code: 'MISSING_PLATFORM' },
        { status: 400 }
      );
    }

    if (!accessToken || typeof accessToken !== 'string' || accessToken.trim() === '') {
      return NextResponse.json(
        { error: 'Access token is required and must be a non-empty string', code: 'MISSING_ACCESS_TOKEN' },
        { status: 400 }
      );
    }

    const normalizedPlatform = platform.trim().toLowerCase();

    const existingCredential = await db
      .select()
      .from(socialCredentials)
      .where(eq(socialCredentials.platform, normalizedPlatform))
      .limit(1);

    const now = new Date();
    const credentialData = {
      platform: normalizedPlatform,
      accessToken: accessToken.trim(),
      refreshToken: refreshToken ? refreshToken.trim() : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: typeof isActive === 'boolean' ? isActive : true,
      updatedAt: now,
    };

    if (existingCredential.length > 0) {
      const updated = await db
        .update(socialCredentials)
        .set(credentialData)
        .where(eq(socialCredentials.platform, normalizedPlatform))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    } else {
      const newCredential = await db
        .insert(socialCredentials)
        .values({
          ...credentialData,
          createdAt: now,
        })
        .returning();

      return NextResponse.json(newCredential[0], { status: 201 });
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}