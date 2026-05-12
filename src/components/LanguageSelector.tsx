/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */

'use client';

import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export type Language = 'zh-CN' | 'zh-TW' | 'ja' | 'en' | 'ru';

interface LanguageOption {
  value: Language;
  label: string;
  nativeLabel: string;
}

const languages: LanguageOption[] = [
  { value: 'zh-CN', label: '中文', nativeLabel: '简体中文' },
  { value: 'zh-TW', label: '中文', nativeLabel: '繁體中文' },
  { value: 'ja', label: '日本語', nativeLabel: '日本語' },
  { value: 'en', label: 'English', nativeLabel: 'English' },
  { value: 'ru', label: 'Русский', nativeLabel: 'Русский' },
];

const STORAGE_KEY = 'siteLanguage';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'zh-CN';
  return (localStorage.getItem(STORAGE_KEY) as Language) || 'zh-CN';
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, lang);
}

export function LanguageSelector() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('zh-CN');

  useEffect(() => {
    setMounted(true);
    setCurrentLang(getStoredLanguage());
  }, []);

  const handleSelect = (lang: Language) => {
    setStoredLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
  };

  const currentLanguage = languages.find(l => l.value === currentLang) || languages[0];

  if (!mounted) {
    return <div className='w-10 h-10' />;
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-10 h-10 p-2 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200/50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors'
        aria-label='Change language'
      >
        <Globe className='w-full h-full' />
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-40'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 py-1 z-50'>
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleSelect(lang.value)}
                className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${
                  currentLang === lang.value
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{lang.nativeLabel}</span>
                {currentLang === lang.value && (
                  <span className='text-green-600 dark:text-green-400'>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function getLanguageLabel(lang: Language): string {
  const language = languages.find(l => l.value === lang);
  return language?.nativeLabel || '简体中文';
}
