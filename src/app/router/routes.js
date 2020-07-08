import {all} from './middleware'

export const routes = [
    {
        path: '/maintenance',
        name: 'maintenance',
        component: () => import('../../views/pages/Maintenance'),
        meta: {
            middleware: all,
        },
    },
    {
        path: '/error',
        component: () => import('../../views/master/Error'),
        meta: {
            middleware: all,
        },
        children: [
            {
                path: '400',
                name: 'bad_request',
                component: () => import('../../views/error/BadRequest'),
            },
            {
                path: '401',
                name: 'unauthenticated',
                component: () => import('../../views/error/Unauthenticated'),
            },
            {
                path: '403',
                name: 'unauthorized',
                component: () => import('../../views/error/Unauthorized'),
            },
            {
                path: '404',
                name: 'not_found',
                component: () => import('../../views/error/NotFound'),
            },
            {
                path: '*',
                component: () => import('../../views/error/NotFound'),
            },
        ],
    },
    {
        path: '/auth',
        component: () => import('../../views/master/Auth'),
        meta: {
            middleware: all,
        },
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {
                    requireNotAuth: true,
                },
                component: () => import('../../views/pages/auth/Login'),
            },
            {
                path: 'forgot-password',
                name: 'forgot_password',
                meta: {
                    requireNotAuth: true,
                },
                component: () => import('../../views/pages/auth/ForgotPassword'),
            },
            {
                path: 'logout',
                name: 'logout',
                meta: {
                    requireAuth: true,
                },
                component: () => import('../../views/pages/auth/Logout'),
            },
            {
                path: '*',
                component: () => import('../../views/error/NotFound'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('../../views/master/Base'),
        meta: {
            middleware: all,
            requireAuth: true,
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../../views/pages/Home'),
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../../views/pages/dashboard/Dashboard'),
            },
            {
                path: 'role',
                component: () => import('../../views/pages/role/Base'),
                children: [
                    {
                        path: '',
                        name: 'role_index',
                        component: () => import('../../views/pages/role/Index'),
                    },
                    {
                        path: 'create',
                        name: 'role_create',
                        component: () => import('../../views/pages/role/Create'),
                    },
                    {
                        path: ':id/edit',
                        name: 'role___edit',
                        component: () => import('../../views/pages/role/Edit'),
                    },
                ],
            },
            {
                path: 'me',
                component: () => import('../../views/pages/me/Base'),
                children: [
                    {
                        path: '',
                        name: 'account',
                        component: () => import('../../views/pages/me/Account'),
                    },
                ],
            },
            {
                path: '*',
                component: () => import('../../views/error/NotFound'),
            },
        ],
    },
    {
        path: '*',
        component: () => import('../../views/error/NotFound'),
    },
]
