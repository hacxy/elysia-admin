import type { MiddlewareFunction } from 'react-router';
import { createBrowserRouter, redirect } from 'react-router';
import App from '../App';
import Login from '../pages/login';
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

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    middleware: [loggingMiddleware],
    children: [
      {
        index: true,
        loader: () => redirect('/welcome'),
      },
      {
        path: '/welcome',
        Component: Welcome,
      },
      {
        Component: Login,
        path: '/login'
      }
    ]
  }
]);
