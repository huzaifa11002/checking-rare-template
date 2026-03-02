'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ur' ? 'rtl' : 'ltr';
    document.dir = dir;
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return <>{children}</>;
}
