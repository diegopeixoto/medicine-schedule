import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    setCurrentLocale(router.locale);
  }, [router.locale]);

  const changeLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'pt' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <button onClick={changeLanguage}>
      {currentLocale === 'en' ? 'Português' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
