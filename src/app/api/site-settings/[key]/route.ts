import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

const VALID_SETTING_TYPES = ['text', 'url', 'image', 'json'];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await context.params;

    if (!key || typeof key !== 'string' || key.trim() === '') {
      return NextResponse.json(
        { error: 'Valid setting key is required', code: 'INVALID_KEY' },
        { status: 400 }
      );
    }

    const setting = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, key))
      .limit(1);

    if (setting.length === 0) {
      return NextResponse.json(
        { error: 'Setting not found', code: 'SETTING_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(setting[0], { status: 200 });
  } catch (error) {
    console.error('GET setting error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (!session.user.email || !session.user.email.toLowerCase().includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const { key } = await context.params;

    if (!key || typeof key !== 'string' || key.trim() === '') {
      return NextResponse.json(
        { error: 'Valid setting key is required', code: 'INVALID_KEY' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { settingValue, settingType } = body;

    if (!settingValue) {
      return NextResponse.json(
        { error: 'Setting value is required', code: 'MISSING_SETTING_VALUE' },
        { status: 400 }
      );
    }

    if (settingType && !VALID_SETTING_TYPES.includes(settingType)) {
      return NextResponse.json(
        {
          error: `Invalid setting type. Must be one of: ${VALID_SETTING_TYPES.join(', ')}`,
          code: 'INVALID_SETTING_TYPE',
        },
        { status: 400 }
      );
    }

    const existingSetting = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, key))
      .limit(1);

    if (existingSetting.length === 0) {
      return NextResponse.json(
        { error: 'Setting not found', code: 'SETTING_NOT_FOUND' },
        { status: 404 }
      );
    }

    const updateData: {
      settingValue: string;
      settingType?: string;
      updatedAt: Date;
    } = {
      settingValue,
      updatedAt: new Date(),
    };

    if (settingType) {
      updateData.settingType = settingType;
    }

    const updated = await db
      .update(siteSettings)
      .set(updateData)
      .where(eq(siteSettings.settingKey, key))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update setting', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH setting error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}