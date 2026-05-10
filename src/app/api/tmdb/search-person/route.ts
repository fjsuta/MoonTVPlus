/* eslint-disable @typescript-eslint/no-explicit-any, no-console */

import { NextRequest, NextResponse } from 'next/server';

import { getAuthInfoFromCookie } from '@/lib/auth';
import { getConfig } from '@/lib/config';
import { searchTMDBPerson } from '@/lib/tmdb.client';

export const runtime = 'nodejs';

/**
 * GET /api/tmdb/search-person?query=xxx
 * 搜索TMDB艺人，返回艺人列表供用户选择
 */
export async function GET(request: NextRequest) {
  try {
    const authInfo = getAuthInfoFromCookie(request);
    if (!authInfo || !authInfo.username) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (!query) {
      return NextResponse.json({ error: '缺少查询参数' }, { status: 400 });
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

    const response = await searchTMDBPerson(
      tmdbApiKey,
      query,
      page,
      tmdbProxy,
      tmdbReverseProxy
    );

    if (response.code !== 200) {
      return NextResponse.json(
        { error: 'TMDB 艺人搜索失败', code: response.code },
        { status: response.code }
      );
    }

    return NextResponse.json({
      success: true,
      results: response.results,
      page: response.page,
      total_pages: response.total_pages,
      total_results: response.total_results,
    });
  } catch (error) {
    console.error('TMDB艺人搜索失败:', error);
    return NextResponse.json(
      { error: '搜索失败', details: (error as Error).message },
      { status: 500 }
    );
  }
}
