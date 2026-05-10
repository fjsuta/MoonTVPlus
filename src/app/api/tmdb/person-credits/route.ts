/* eslint-disable @typescript-eslint/no-explicit-any, no-console */

import { NextRequest, NextResponse } from 'next/server';

import { getAuthInfoFromCookie } from '@/lib/auth';
import { getConfig } from '@/lib/config';
import { getTMDBPersonCredits } from '@/lib/tmdb.client';

export const runtime = 'nodejs';

/**
 * GET /api/tmdb/person-credits?id=xxx
 * 获取TMDB艺人的作品列表（电影+电视剧）
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

    const response = await getTMDBPersonCredits(
      tmdbApiKey,
      parseInt(personId, 10),
      tmdbProxy,
      tmdbReverseProxy
    );

    if (response.code !== 200) {
      return NextResponse.json(
        { error: '获取艺人作品失败', code: response.code },
        { status: response.code }
      );
    }

    return NextResponse.json({
      success: true,
      cast: response.cast,
      crew: response.crew,
    });
  } catch (error) {
    console.error('获取TMDB艺人作品失败:', error);
    return NextResponse.json(
      { error: '获取作品失败', details: (error as Error).message },
      { status: 500 }
    );
  }
}
