import type { RouteObjectWithChildren } from './config/router';
import { GithubFilled, LogoutOutlined } from '@ant-design/icons';
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router';
import LanguageSwitch from './components/LanguageSwitch';
import ThemeSwitch from './components/ThemeSwitch';
import { menuRoute } from './config/router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dark, setDark] = useState(localStorage.getItem('isDark') === 'true');

  // 创建翻译后的菜单路由
  const translatedMenuRoute = useMemo(() => {
    const translateRoute = (route: RouteObjectWithChildren): RouteObjectWithChildren => {
      if (!route.children) {
        return route;
      }
      return {
        ...route,
        children: route.children.map(child => {
          const childWithName = child as RouteObjectWithChildren;
          if (childWithName.name) {
            const translationKey = `menu.${childWithName.name.toLowerCase()}`;
            return {
              ...child,
              name: t(translationKey, childWithName.name), // 如果翻译不存在，使用原始名称
            };
          }
          return child;
        }),
      };
    };
    return translateRoute(menuRoute);
  }, [t]);

  return (
    <ProConfigProvider dark={dark}>
      <ConfigProvider>
        <ProLayout
          colorPrimary="#1677FF"
          location={{ pathname: location.pathname }}
          title={t('common.title')}
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          route={translatedMenuRoute}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              {dom}
            </div>
          )}
          layout="mix"
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮',
            render: (_props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: t('common.logout'),
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          menuFooterRender={props => {
            if (props?.collapsed)
              return null;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
                }}
              >
                <div>{t('footer.copyright')}</div>
                <div>{t('footer.author')}</div>
              </div>
            );
          }}
          actionsRender={props => {
            if (props.isMobile)
              return [];
            if (typeof window === 'undefined')
              return [];
            return [
              <LanguageSwitch key="LanguageSwitch" />,
              <ThemeSwitch
                key="ThemeSwitch"
                value={dark}
                onChange={val => {
                  setDark(val);
                }}
              />,
              <GithubFilled
                key="GithubFilled"
                onClick={() => {
                  window.open('https://github.com/hacxy/elysia-admin', '_blank');
                }}
              />,
            ];
          }}
        >
          <PageContainer>
            <Outlet />
          </PageContainer>
        </ProLayout>
      </ConfigProvider>
    </ProConfigProvider>
  );
}

export default App;
