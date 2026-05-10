/* eslint-disable @typescript-eslint/no-explicit-any, no-console */

import { NextRequest, NextResponse } from 'next/server';

import { getAuthInfoFromCookie } from '@/lib/auth';
import { getConfig } from '@/lib/config';
import { getTMDBPersonDetails } from '@/lib/tmdb.client';

export const runtime = 'nodejs';

/**
 * GET /api/tmdb/person-detail?id=xxx
 * 获取TMDB艺人的详细信息
 */
export async function GET(request: NextRequest) {
  try {
    const authInfo = getAuthInfoFromCookie(request);
    if (!authInfo || !authInfo.username) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const personId = searchParams.get('id');

    if (!personId) {
      return NextResponse.json({ error: '缺少艺人ID参数' }, { status: 400 });
    }

    const config = await getConfig();
    const tmdbApiKey = config.SiteConfig.TMDBApiKey;
    const tmdbProxy = config.SiteConfig.TMDBProxy;
    const tmdbReverseProxy = config.SiteConfig.TMDBReverseProxy;

    if (!tmdbApiKey) {
      return NextResponse.json(
        { error: 'TMDB API Key 未配置' },
        { status: 400 }
      );
    }

    const response = await getTMDBPersonDetails(
      tmdbApiKey,
      parseInt(personId, 10),
      tmdbProxy,
      tmdbReverseProxy
    );

    if (response.code !== 200) {
      return NextResponse.json(
        { error: '获取艺人详情失败', code: response.code },
        { status: response.code }
      );
    }

    return NextResponse.json({
      success: true,
      person: response.person,
    });
  } catch (error) {
    console.error('获取TMDB艺人详情失败:', error);
    return NextResponse.json(
      { error: '获取详情失败', details: (error as Error).message },
      { status: 500 }
    );
  }
}
