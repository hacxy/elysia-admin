import type { MiddlewareFunction, RouteObject } from 'react-router';
import { SmileFilled, UserOutlined } from '@ant-design/icons';
import { createBrowserRouter, redirect } from 'react-router';
import App from '../App';
import Login from '../pages/login';
import User from '../pages/user';
import Welcome from '../pages/welcome';

const loggingMiddleware: MiddlewareFunction = async ({ request }, next) => {
  const url = new URL(request.url);
  // 获取search
  const search = url.search;
  const searchParams = new URLSearchParams(search);
  const login = searchParams.get('login');
  if (login) {
    throw redirect('/login');
  }
  await next();
};

type RouteObjectWithChildren = RouteObject & {
  children?: RouteObject['children'] & {
    name?: string
    exact?: boolean
    emoji?: string
    icon?: React.ReactNode
    children?: RouteObjectWithChildren['children']
    hideInMenu?: boolean
  }[]

};
export const menuRoute: RouteObjectWithChildren = {
  path: '/',
  Component: App,
  middleware: [loggingMiddleware],
  children: [
    {
      index: true,
      loader: () => redirect('/welcome'),
    },
    {
      name: 'Welcome',
      path: '/welcome',
      Component: Welcome,
      icon: <SmileFilled />
    },
    {
      name: 'User',
      path: '/user',
      Component: User,
      icon: <UserOutlined />
    },

  ]
};

export const router = createBrowserRouter([menuRoute,
  {
    path: '/login',
    Component: Login,
  }
]);
