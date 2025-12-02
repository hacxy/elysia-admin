import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'zh' | 'en';

interface LanguageSwitchProps {
  /** 语言值（受控模式），传入 'zh-CN'/'en-US' 表示受控，不传或传入 null 表示非受控 */
  value?: Language | null
  /** 语言变化回调 */
  onChange?: (lang: Language) => void
  /** 初始语言值（非受控模式，仅在组件首次渲染时生效） */
  defaultLanguage?: Language
  /** 是否显示工具提示，默认为 true */
  showTooltip?: boolean
  /** 是否持久化到 localStorage，默认为 true */
  persist?: boolean
}

/**
 * 语言切换组件
 * 用于在中文和英文之间切换
 */
export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  value,
  onChange,
  // defaultLanguage = 'zh-CN',
  showTooltip = true,
  // persist = true,
}) => {
  const { i18n, t } = useTranslation();

  // 从 i18n 获取当前语言
  // const getCurrentLanguage = (): Language => {
  //   const lang = i18n.language as Language;
  //   if (lang === 'zh-CN' || lang === 'en-US') {
  //     return lang;
  //   }
  //   return defaultLanguage;
  // };

  // 受控模式：使用 value；非受控模式：使用 i18n 的当前语言
  const isControlled = value !== null && typeof value === 'string';
  // const currentLang = isControlled ? value : getCurrentLanguage();

  // 同步受控值到 i18n
  useEffect(() => {
    if (isControlled && i18n.language !== value) {
      i18n.changeLanguage(value);
    }
  }, [isControlled, value, i18n]);

  const handleChange = (lang: Language) => {
    // 更新 i18n 语言
    i18n.changeLanguage(lang);
    onChange?.(lang);
  };

  const languageOptions = [
    {
      key: 'zh',
      label: '中文',
      onClick: () => handleChange('zh'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => handleChange('en'),
    },
  ];

  const switchElement = (
    <Dropdown
      menu={{ items: languageOptions }}
      trigger={['click']}
    >
      <GlobalOutlined
        style={{ fontSize: 18, cursor: 'pointer' }}
        onClick={e => e.preventDefault()}
      />
    </Dropdown>
  );

  if (showTooltip) {
    return (
      <Tooltip title={t('common.switchLanguage')}>
        {switchElement}
      </Tooltip>
    );
  }

  return switchElement;
};

export default LanguageSwitch;
