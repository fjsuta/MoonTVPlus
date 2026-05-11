import { BackButton } from './BackButton';
import { LanguageSelector } from './LanguageSelector';
import MobileBottomNav from './MobileBottomNav';
import MobileHeader from './MobileHeader';
import ImmersiveSidebar, { getUILayoutSettings } from './ImmersiveSidebar';
import Sidebar from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { UpdateNotification } from './UpdateNotification';
import { UserMenu } from './UserMenu';
import { VersionCheckProvider } from './VersionCheckProvider';
import { useEffect, useState } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  activePath?: string;
  hideNavigation?: boolean;
}

const PageLayout = ({ children, activePath = '/', hideNavigation = false }: PageLayoutProps) => {
  const [uiLayout, setUiLayout] = useState<'default' | 'sidebar'>('default');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const settings = getUILayoutSettings();
    setUiLayout(settings.layout);
    setIsReady(true);

    const handleLayoutChange = () => {
      const newSettings = getUILayoutSettings();
      setUiLayout(newSettings.layout);
    };

    window.addEventListener('uiLayoutChanged', handleLayoutChange);
    return () => {
      window.removeEventListener('uiLayoutChanged', handleLayoutChange);
    };
  }, []);

  return (
    <VersionCheckProvider>
      <div className='w-full min-h-screen'>
        {!hideNavigation && (
          <MobileHeader showBackButton={['/play', '/live'].includes(activePath)} />
        )}

        <div className='flex md:grid md:grid-cols-[auto_1fr] w-full min-h-screen md:min-h-auto'>
          {!hideNavigation && (
            <div className='hidden md:block'>
              {isReady && uiLayout === 'sidebar' ? (
                <ImmersiveSidebar activePath={activePath} />
              ) : (
                <Sidebar activePath={activePath} />
              )}
            </div>
          )}

          <div className='relative min-w-0 flex-1 transition-all duration-300'>
            {!hideNavigation && ['/play', '/live'].includes(activePath) && (
              <div className='absolute top-3 left-1 z-20 hidden md:flex'>
                <BackButton />
              </div>
            )}

            {!hideNavigation && (
              <div className='absolute top-2 right-4 z-20 hidden md:flex items-center gap-2'>
                <LanguageSelector />
                <ThemeToggle />
                <UserMenu />
                <UpdateNotification />
              </div>
            )}

            <main
              className={`flex-1 md:min-h-0 mb-14 md:mb-0 md:mt-0 mt-12 ${uiLayout === 'sidebar' && !hideNavigation ? 'md:ml-0' : ''}`}
              style={{
                paddingBottom: 'calc(3.5rem + env(safe-area-inset-bottom))',
              }}
            >
              {children}
            </main>
          </div>
        </div>

        {!hideNavigation && (
          <div className='md:hidden'>
            <MobileBottomNav activePath={activePath} />
          </div>
        )}
      </div>
    </VersionCheckProvider>
  );
};

export default PageLayout;
