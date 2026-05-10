'use client';

import { Calendar, ExternalLink, Film, Globe, User, X, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getTMDBImageUrl } from '@/lib/tmdb.client';

import ImageViewer from '@/components/ImageViewer';
import ProxyImage from '@/components/ProxyImage';

interface PersonDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  personId: number;
}

interface PersonData {
  id: number;
  name: string;
  original_name?: string;
  profile_path: string | null;
  biography: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  also_known_as?: string[];
  gender?: number;
  popularity?: number;
  homepage?: string;
  imdb_id?: string;
}

interface Credit {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  character?: string;
  job?: string;
  episode_count?: number;
}

const PersonDetailPanel: React.FC<PersonDetailPanelProps> = ({
  isOpen,
  onClose,
  personId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'all' | 'movie' | 'tv'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'popularity'>('date');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let animationId: number;
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setIsVisible(true);
      animationId = requestAnimationFrame(() => {
        animationId = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !personId) return;

    const fetchPersonData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [detailResponse, creditsResponse] = await Promise.all([
          fetch(`/api/tmdb/person-detail?id=${personId}`),
          fetch(`/api/tmdb/person-credits?id=${personId}`),
        ]);

        if (!detailResponse.ok) throw new Error('获取艺人详情失败');
        if (!creditsResponse.ok) throw new Error('获取艺人作品失败');

        const detailData = await detailResponse.json();
        const creditsData = await creditsResponse.json();

        setPersonData(detailData.person);

        const allCredits = [
          ...(creditsData.cast || []).map((c: any) => ({
            ...c,
            media_type: c.media_type || (c.first_air_date ? 'tv' : 'movie'),
          })),
          ...(creditsData.crew || [])
            .filter((c: any) =>
              !(creditsData.cast || []).some((cast: any) => cast.id === c.id && cast.media_type === c.media_type)
            )
            .map((c: any) => ({
              ...c,
              media_type: c.media_type || (c.first_air_date ? 'tv' : 'movie'),
            })),
        ];

        setCredits(allCredits);
      } catch (err) {
        console.error('获取艺人数据失败:', err);
        setError(err instanceof Error ? err.message : '获取艺人数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [isOpen, personId]);

  useEffect(() => {
    if (!isVisible) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isVisible, onClose]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const getExternalUrl = () => {
    if (personData?.imdb_id) return `https://www.imdb.com/name/${personData.imdb_id}`;
    if (personData?.homepage) return personData.homepage;
    return `https://www.themoviedb.org/person/${personId}`;
  };

  const filteredAndSortedCredits = (() => {
    let filtered = credits;

    if (activeTab !== 'all') {
      filtered = filtered.filter((c) => c.media_type === activeTab);
    }

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date': {
          const dateA = a.release_date || a.first_air_date || '';
          const dateB = b.release_date || b.first_air_date || '';
          comparison = dateA.localeCompare(dateB);
          break;
        }
        case 'rating':
          comparison = a.vote_average - b.vote_average;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return sorted;
  })();

  const calculateAge = (birthday?: string, deathday?: string) => {
    if (!birthday) return null;

    const birth = new Date(birthday);
    const end = deathday ? new Date(deathday) : new Date();
    const age = end.getFullYear() - birth.getFullYear();

    return end.getMonth() < birth.getMonth() ||
      (end.getMonth() === birth.getMonth() && end.getDate() < birth.getDate())
      ? age - 1
      : age;
  };

  const formatBiography = (bio?: string) => {
    if (!bio) return '';

    const cleaned = bio.replace(/\s*From Wikipedia.*$/i, '').trim();
    const maxLength = 500;

    if (cleaned.length <= maxLength) return cleaned;

    return cleaned.substring(0, maxLength).trim() + '...';
  };

  if (!isVisible || !mounted) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)', willChange: 'opacity' }}
      />

      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ease-out"
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: isAnimating ? 'scale(1) translateZ(0)' : 'scale(0.95) translateZ(0)',
          opacity: isAnimating ? 1 : 0,
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            艺人详情
          </h2>
          <div className="flex items-center gap-2">
            {personData && (
              <button
                onClick={() => window.open(getExternalUrl(), '_blank', 'noopener,noreferrer')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                title="打开外部页面"
                aria-label="打开外部页面"
              >
                <ExternalLink size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              title="关闭"
              aria-label="关闭"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          )}

          {error && (
            <div className="p-6 text-center">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && personData && (
            <div className="p-6">
              <div className="flex gap-8 mb-8">
                <div className="flex-shrink-0">
                  <div
                    className="relative w-40 h-56 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      if (personData.profile_path) {
                        handleImageClick(getTMDBImageUrl(personData.profile_path, 'w500'));
                      }
                    }}
                  >
                    {personData.profile_path ? (
                      <ProxyImage
                        originalSrc={getTMDBImageUrl(personData.profile_path, 'w500')}
                        alt={personData.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                        <User size={64} className="text-gray-300 dark:text-gray-600" />
                      </div>
                    )}
                  </div>

                  {personData.popularity && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                          热度 {(Math.round(personData.popularity * 10) / 10).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {personData.name}
                  </h3>
                  {personData.original_name && personData.original_name !== personData.name && (
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
                      {personData.original_name}
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    {personData.birthday && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={16} className="text-gray-400" />
                        <span>
                          {new Date(personData.birthday).toLocaleDateString('zh-CN')}
                          {calculateAge(personData.birthday, personData.deathday) !== null && (
                            <span className="ml-2 text-gray-500">
                              ({calculateAge(personData.birthday, personData.deathday)}岁)
                            </span>
                          )}
                          {personData.deathday && (
                            <span className="ml-2 text-red-500">
                              - {new Date(personData.deathday).toLocaleDateString('zh-CN')}
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    {personData.place_of_birth && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Globe size={16} className="text-gray-400" />
                        <span>{personData.place_of_birth}</span>
                      </div>
                    )}

                    {personData.gender !== undefined && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <User size={16} className="text-gray-400" />
                        <span>{personData.gender === 1 ? '女' : personData.gender === 2 ? '男' : '未知'}</span>
                      </div>
                    )}
                  </div>

                  {personData.also_known_as && personData.also_known_as.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">又名</h4>
                      <div className="flex flex-wrap gap-2">
                        {personData.also_known_as.slice(0, 5).map((name, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            {name}
                          </span>
                        ))}
                        {personData.also_known_as.length > 5 && (
                          <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                            +{personData.also_known_as.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {formatBiography(personData.biography) && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        简介
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap line-clamp-6">
                        {formatBiography(personData.biography)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Film size={20} />
                    代表作品 ({filteredAndSortedCredits.length})
                  </h4>

                  <div className="flex items-center gap-3">
                    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                      {(['all', 'movie', 'tv'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === tab
                              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          }`}
                        >
                          {tab === 'all' ? '全部' : tab === 'movie' ? '电影' : '电视剧'}
                        </button>
                      ))}
                    </div>

                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [sort, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                        setSortBy(sort);
                        setSortOrder(order);
                      }}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="date-desc">时间 ↓</option>
                      <option value="date-asc">时间 ↑</option>
                      <option value="rating-desc">评分 ↓</option>
                      <option value="rating-asc">评分 ↑</option>
                    </select>
                  </div>
                </div>

                {filteredAndSortedCredits.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    暂无作品信息
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredAndSortedCredits.map((credit) => (
                      <div
                        key={`${credit.id}-${credit.media_type}`}
                        className="group cursor-pointer"
                        onClick={() => {
                          window.open(
                            `/play?title=${encodeURIComponent(credit.title)}&stype=${credit.media_type}`,
                            '_blank'
                          );
                        }}
                      >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2 transition-transform group-hover:scale-105">
                          {credit.poster_path ? (
                            <ProxyImage
                              originalSrc={getTMDBImageUrl(credit.poster_path, 'w342')}
                              alt={credit.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              draggable={false}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                              <Film size={32} className="text-gray-300 dark:text-gray-600" />
                            </div>
                          )}

                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm bg-black/60 text-white">
                            {credit.media_type === 'movie' ? '电影' : '电视剧'}
                          </div>

                          {credit.vote_average > 0 && (
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium backdrop-blur-sm bg-black/60 text-yellow-400">
                              <Star size={10} className="fill-current" />
                              {credit.vote_average.toFixed(1)}
                            </div>
                          )}
                        </div>

                        <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {credit.title}
                        </h5>

                        {credit.character && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            饰演 {credit.character}
                          </p>
                        )}

                        {credit.job && !credit.character && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {credit.job}
                          </p>
                        )}

                        {(credit.release_date || credit.first_air_date) && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {(credit.release_date || credit.first_air_date || '').substring(0, 4)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showImageViewer && (
        <ImageViewer
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
          imageUrl={selectedImage}
          alt={personData?.name || ''}
        />
      )}
    </div>
  );

  return createPortal(content, document.body);
};

export default PersonDetailPanel;
