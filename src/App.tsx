import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { menuRoute } from './config/router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <ProConfigProvider>
      <ConfigProvider>
        <ProLayout
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
          location={{
            pathname: location.pathname
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
