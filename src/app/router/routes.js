/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {all, error} from './middleware'

export const routes = [
    {
        path: '/maintenance',
        name: 'maintenance',
        component: () => import('../../views/pages/Maintenance'),
        meta: {
            middleware: error,
        },
    },
    {
        path: '/error',
        component: () => import('../../views/master/Error'),
        meta: {
            middleware: error,
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
                path: '500',
                name: 'internal_server_error',
                component: () => import('../../views/error/InternalServerError'),
            },
            {
                path: '503',
                name: 'service_unavailable',
                component: () => import('../../views/error/ServiceUnavailable'),
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
                path: 'logout',
                name: 'logout',
                meta: {
                    requireAuth: true,
                },
                component: () => import('../../views/pages/auth/Logout'),
            },
            // TODO:
            //  Extra Auth Routes
            {
                path: 'forgot-password',
                name: 'forgot_password',
                meta: {
                    requireNotAuth: true,
                },
                component: () => import('../../views/pages/auth/ForgotPassword'),
            },
            {
                path: 'reset-password',
                name: 'reset_password',
            },
            {
                path: 'reset-password/:token',
                name: 'reset_password_complete',
                meta: {
                    requireNotAuth: true,
                },
                component: () => import('../../views/pages/auth/ResetPassword'),
            },
            // TODO
            // TODO:

            // TODO
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
        },
        children: [
            {
                path: '',
                name: 'root',
                component: () => import('../../views/pages/Root'),
            },
            // TODO:
            //  Extra Not-Authenticated Routes

            // TODO
            {
                path: '',
                component: () => import('../../views/master/BaseAuth'),
                meta: {
                    requireAuth: true,
                },
                children: [
                    // TODO:
                    //  Extra Authenticated Routes
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
                    // TODO
                    // TODO:

                    // TODO
                ],
            },
            {
                path: '*',
                component: () => import('../../views/pages/NotFoundAll'),
            },
        ],
    },
]
