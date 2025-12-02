import { GithubFilled, LogoutOutlined } from '@ant-design/icons';
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ThemeSwitch from './components/ThemeSwitch';
import { menuRoute } from './config/router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem('isDark') === 'true');
  return (
    <ProConfigProvider dark={dark}>
      <ConfigProvider>
        <ProLayout
          colorPrimary="#1677FF"
          location={{ pathname: location.pathname }}
          title="Elysia Admin"
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
          route={menuRoute}
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
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
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
                <div>© 2025 Made with Hacxy</div>
                <div>by Hacxy</div>
              </div>
            );
          }}
          actionsRender={props => {
            if (props.isMobile)
              return [];
            if (typeof window === 'undefined')
              return [];
            return [
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
