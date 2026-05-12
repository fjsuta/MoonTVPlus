/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Blend, Cat, Clover, Container, Film, Globe, Home, Menu, MoreHorizontal, Search, Star, Tv, TvMinimalPlay, Users, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { useSite } from './SiteProvider';
import { useWatchRoomContextSafe } from './WatchRoomProvider';

export type UILayoutStyle = 'default' | 'pill' | 'minimal';
export type UILayout = 'default' | 'sidebar';

type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

interface ImmersiveSidebarContextType {
  layout: UILayout;
  layoutStyle: UILayoutStyle;
  hideLabels: boolean;
  isReady: boolean;
}

const ImmersiveSidebarContext = createContext<ImmersiveSidebarContextType>({
  layout: 'default',
  layoutStyle: 'default',
  hideLabels: false,
  isReady: false,
});

export const useImmersiveSidebar = () => useContext(ImmersiveSidebarContext);

declare global {
  interface Window {
    __uiLayout?: UILayout;
    __uiLayoutStyle?: UILayoutStyle;
    __uiHideLabels?: boolean;
  }
}

interface ImmersiveSidebarProps {
  onToggle?: (collapsed: boolean) => void;
  activePath?: string;
}

const ImmersiveSidebar = ({ onToggle, activePath = '/' }: ImmersiveSidebarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const watchRoomContext = useWatchRoomContextSafe();
  const { siteName } = useSite();

  if (pathname === '/watch-room/screen') {
    return null;
  }

  const [layout, setLayout] = useState<UILayout>(() => {
    if (typeof window !== 'undefined' && window.__uiLayout) {
      return window.__uiLayout;
    }
    return 'default';
  });

  const [layoutStyle, setLayoutStyle] = useState<UILayoutStyle>(() => {
    if (typeof window !== 'undefined' && window.__uiLayoutStyle) {
      return window.__uiLayoutStyle;
    }
    return 'default';
  });

  const [hideLabels, setHideLabels] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      if (typeof window.__uiHideLabels === 'boolean') {
        return window.__uiHideLabels;
      }
    }
    return false;
  });

  const [active, setActive] = useState(activePath);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const savedLayout = localStorage.getItem('uiLayout') as UILayout | null;
    const savedLayoutStyle = localStorage.getItem('uiLayoutStyle') as UILayoutStyle | null;
    const savedHideLabels = localStorage.getItem('uiHideLabels');

    if (savedLayout) {
      setLayout(savedLayout);
      window.__uiLayout = savedLayout;
    }
    if (savedLayoutStyle) {
      setLayoutStyle(savedLayoutStyle);
      window.__uiLayoutStyle = savedLayoutStyle;
    }
    if (savedHideLabels !== null) {
      setHideLabels(savedHideLabels === 'true');
      window.__uiHideLabels = savedHideLabels === 'true';
    }
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    if (typeof document !== 'undefined' && isReady) {
      document.documentElement.dataset.uiLayout = layout;
      document.documentElement.dataset.uiLayoutStyle = layoutStyle;
      if (hideLabels) {
        document.documentElement.dataset.uiHideLabels = 'true';
      } else {
        delete document.documentElement.dataset.uiHideLabels;
      }
    }
  }, [layout, layoutStyle, hideLabels, isReady]);

  useEffect(() => {
    const getCurrentFullPath = () => {
      const queryString = searchParams.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    };
    const fullPath = getCurrentFullPath();
    setActive(fullPath);
  }, [pathname, searchParams]);

  const handleLayoutChange = useCallback((newLayout: UILayout) => {
    setLayout(newLayout);
    localStorage.setItem('uiLayout', newLayout);
    window.__uiLayout = newLayout;
    onToggle?.(newLayout === 'sidebar');
  }, [onToggle]);

  const handleStyleChange = useCallback((newStyle: UILayoutStyle) => {
    setLayoutStyle(newStyle);
    localStorage.setItem('uiLayoutStyle', newStyle);
    window.__uiLayoutStyle = newStyle;
  }, []);

  const handleHideLabelsToggle = useCallback(() => {
    const newValue = !hideLabels;
    setHideLabels(newValue);
    localStorage.setItem('uiHideLabels', String(newValue));
    window.__uiHideLabels = newValue;
  }, [hideLabels]);

  const contextValue: ImmersiveSidebarContextType = {
    layout,
    layoutStyle,
    hideLabels,
    isReady,
  };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { icon: Film, label: '电影', href: '/douban?type=movie' },
    { icon: Tv, label: '剧集', href: '/douban?type=tv' },
    { icon: Cat, label: '动漫', href: '/douban?type=anime' },
    { icon: Clover, label: '综艺', href: '/douban?type=show' },
    { icon: TvMinimalPlay, label: '电视直播', href: '/live' },
    { icon: Globe, label: '网络直播', href: '/web-live' },
  ]);

  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;

    const items: MenuItem[] = [
      { icon: Film, label: '电影', href: '/douban?type=movie' },
      { icon: Tv, label: '剧集', href: '/douban?type=tv' },
      { icon: Cat, label: '动漫', href: '/douban?type=anime' },
      { icon: Clover, label: '综艺', href: '/douban?type=show' },
      { icon: TvMinimalPlay, label: '电视直播', href: '/live' },
    ];

    if (runtimeConfig?.WEB_LIVE_ENABLED) {
      items.push({ icon: Globe, label: '网络直播', href: '/web-live' });
    }

    if (runtimeConfig?.PRIVATE_LIBRARY_ENABLED) {
      items.push({ icon: Container, label: '私人影库', href: '/private-library' });
    }

    if (runtimeConfig?.ADVANCED_RECOMMENDATION_ENABLED) {
      items.push({ icon: Blend, label: '高级推荐', href: '/advanced-recommendation' });
    }

    if (watchRoomContext?.isEnabled) {
      items.push({ icon: Users, label: '观影室', href: '/watch-room' });
    }

    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      items.push({ icon: Star, label: '自定义', href: '/douban?type=custom' });
    }

    setMenuItems(items);
  }, [watchRoomContext?.isEnabled]);

  const getItemClasses = (isActive: boolean) => {
    const baseClasses = 'group flex items-center transition-all duration-300';

    let styleClasses = '';
    switch (layoutStyle) {
      case 'pill':
        styleClasses = isActive
          ? 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400'
          : 'text-gray-600 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:bg-gray-700/50';
        break;
      case 'minimal':
        styleClasses = isActive
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
        break;
      default:
        styleClasses = isActive
          ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400'
          : 'text-gray-600 hover:bg-gray-100/30 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400';
    }

    const layoutClasses = layoutStyle === 'minimal' || hideLabels
      ? 'justify-center w-full'
      : 'gap-3 justify-start';

    return `${baseClasses} ${styleClasses} ${layoutClasses}`;
  };

  const renderMenuItem = (item: MenuItem) => {
    const typeMatch = item.href.match(/type=([^&]+)/)?.[1];
    const decodedActive = decodeURIComponent(active);
    const decodedItemHref = decodeURIComponent(item.href);
    const activePathname = decodedActive.split('?')[0];
    const itemPathname = decodedItemHref.split('?')[0];

    const isActive =
      decodedActive === decodedItemHref ||
      (decodedActive.startsWith('/douban') && decodedActive.includes(`type=${typeMatch}`)) ||
      (!typeMatch && activePathname === itemPathname);

    const ItemIcon = item.icon;
    const showLabel = layoutStyle !== 'minimal' && !hideLabels;

    if (layoutStyle === 'pill') {
      return (
        <Link
          key={item.label}
          href={item.href}
          data-active={isActive}
          className={`${getItemClasses(isActive)} rounded-lg px-3 py-2.5 text-sm font-medium`}
        >
          <ItemIcon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'}`} />
          {showLabel && (
            <span className='whitespace-nowrap'>{item.label}</span>
          )}
        </Link>
      );
    }

    if (layoutStyle === 'minimal') {
      return (
        <Link
          key={item.label}
          href={item.href}
          data-active={isActive}
          className={`${getItemClasses(isActive)} p-2.5 rounded-lg`}
          title={item.label}
        >
          <ItemIcon className={`h-5 w-5 ${isActive ? 'text-green-600 dark:text-green-400' : ''}`} />
        </Link>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        data-active={isActive}
        className={`${getItemClasses(isActive)} rounded-lg px-3 py-2.5 text-sm font-medium`}
      >
        <ItemIcon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'}`} />
        {showLabel && (
          <span className='whitespace-nowrap'>{item.label}</span>
        )}
      </Link>
    );
  };

  if (!isReady || layout !== 'sidebar') {
    return null;
  }

  return (
    <ImmersiveSidebarContext.Provider value={contextValue}>
      <div className='hidden md:flex'>
        <aside
          data-sidebar
          className={`fixed top-0 left-0 h-screen bg-white/60 backdrop-blur-xl border-r border-gray-200/50 z-10 shadow-lg dark:bg-gray-900/70 dark:border-gray-700/50 transition-all duration-300 ${
            hideLabels || layoutStyle === 'minimal'
              ? 'w-16'
              : 'w-56'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className='flex h-full flex-col'>
            <div className='h-16 flex items-center justify-center border-b border-gray-200/50 dark:border-gray-700/50'>
              {hideLabels || layoutStyle === 'minimal' ? (
                <span className='text-xl font-bold text-green-600'>{siteName.charAt(0)}</span>
              ) : (
                <span className='text-xl font-bold text-green-600 tracking-tight'>{siteName}</span>
              )}
            </div>

            <nav className='flex-1 overflow-y-auto px-2 py-4 space-y-1'>
              <Link
                href='/'
                data-active={active === '/'}
                className={`${getItemClasses(active === '/')} rounded-lg px-3 py-2.5 text-sm font-medium`}
              >
                <Home className={`h-5 w-5 flex-shrink-0 ${active === '/' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'}`} />
                {(layoutStyle !== 'minimal' && !hideLabels) && (
                  <span className='whitespace-nowrap'>首页</span>
                )}
              </Link>
              <Link
                href='/search'
                data-active={active === '/search'}
                className={`${getItemClasses(active === '/search')} rounded-lg px-3 py-2.5 text-sm font-medium`}
              >
                <Search className={`h-5 w-5 flex-shrink-0 ${active === '/search' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200'}`} />
                {(layoutStyle !== 'minimal' && !hideLabels) && (
                  <span className='whitespace-nowrap'>搜索</span>
                )}
              </Link>

              <div className='pt-4 pb-2'>
                {(layoutStyle !== 'minimal' && !hideLabels) && (
                  <div className='px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                    分类
                  </div>
                )}
                {menuItems.map(renderMenuItem)}
              </div>
            </nav>

            <div className='border-t border-gray-200/50 dark:border-gray-700/50 p-2'>
              <button
                onClick={handleHideLabelsToggle}
                className={`${getItemClasses(false)} w-full rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50`}
              >
                <MoreHorizontal className='h-5 w-5 flex-shrink-0' />
                {(layoutStyle !== 'minimal' && !hideLabels) && (
                  <span className='whitespace-nowrap'>{hideLabels ? '显示标签' : '隐藏标签'}</span>
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </ImmersiveSidebarContext.Provider>
  );
};

export default ImmersiveSidebar;

export const getUILayoutSettings = () => {
  if (typeof window === 'undefined') {
    return { layout: 'default' as UILayout, layoutStyle: 'default' as UILayoutStyle, hideLabels: false };
  }
  return {
    layout: (localStorage.getItem('uiLayout') as UILayout) || 'default',
    layoutStyle: (localStorage.getItem('uiLayoutStyle') as UILayoutStyle) || 'default',
    hideLabels: localStorage.getItem('uiHideLabels') === 'true',
  };
};
