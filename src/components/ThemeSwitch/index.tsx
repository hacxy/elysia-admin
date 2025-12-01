import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import './index.css';

const THEME_STORAGE_KEY = 'elysia-admin-theme';

interface ThemeSwitchProps {
  /** 主题值（受控模式），传入 true/false 表示受控，不传或传入 null 表示非受控 */
  value?: boolean | null
  /** 主题变化回调 */
  onChange?: (dark: boolean) => void
  /** 初始主题值（非受控模式，仅在组件首次渲染时生效） */
  defaultDark?: boolean
  /** 是否显示工具提示，默认为 true */
  showTooltip?: boolean
  /** 是否持久化到 localStorage，默认为 true */
  persist?: boolean
}

/**
 * 主题切换 Switch 组件
 * 用于在亮色和暗色主题之间切换
 */
export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  value,
  onChange,
  defaultDark = false,
  showTooltip = true,
  persist = true,
}) => {
  // 从 localStorage 读取或使用默认值
  const getInitialTheme = (): boolean => {
    if (persist && typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
    }
    return defaultDark;
  };

  // 受控模式：使用 value；非受控模式：使用内部状态
  const [internalDark, setInternalDark] = useState<boolean>(getInitialTheme);
  // 如果 value 是 null 或未定义，使用内部状态；否则使用 value
  const isControlled = value !== null && typeof value === 'boolean';
  const currentDark = isControlled ? value : internalDark;

  // 同步到 localStorage
  useEffect(() => {
    if (persist && typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, currentDark ? 'dark' : 'light');
    }
  }, [currentDark, persist]);

  const handleChange = (checked: boolean) => {
    // 如果不是受控模式，更新内部状态
    if (!isControlled) {
      setInternalDark(checked);
    }
    onChange?.(checked);
  };

  const switchElement = (
    <Switch
      checked={currentDark}
      onChange={handleChange}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      className="theme-switch"
    />
  );

  if (showTooltip) {
    return (
      <Tooltip title={currentDark ? '切换到亮色主题' : '切换到暗色主题'}>
        {switchElement}
      </Tooltip>
    );
  }

  return switchElement;
};

export default ThemeSwitch;
