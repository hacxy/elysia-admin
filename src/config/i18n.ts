import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locale/en.json';
import zh from '../locale/zh.json';

const LANGUAGE_STORAGE_KEY = 'language';

// 命名空间名称，不是语言代码
// export const defaultNS = 'translation';

// 从 localStorage 获取保存的语言，如果没有则使用浏览器语言
function getInitialLanguage(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved) {
      return saved;
    }
    // 检测浏览器语言
    const browserLang = navigator.language || navigator.languages?.[0] || 'zh';
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    if (browserLang.startsWith('en')) {
      return 'en';
    }
  }
  return 'zh';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zh,
      },
      en: {
        translation: en,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'zh',
    // defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

// 监听语言变化，保存到 localStorage
i18n.on('languageChanged', lng => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  }
});

export default i18n;
