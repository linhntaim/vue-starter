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
        path: '/limitation',
        name: 'limitation',
        component: () => import('../../views/pages/Limitation'),
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
                path: '/',
                name: 'root',
                component: () => import('../../views/pages/Root'),
            },
            {
                path: 'clear-site-data',
                name: 'clear_site_data',
                component: () => import('../../views/pages/ClearSiteData'),
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
                    {
                        path: '404',
                        name: 'base_auth_not_found',
                        component: () => import('../../views/error/NotFound'),
                    },
                    // TODO:
                    //  Extra Authenticated Routes

                    // TODO
                ],
            },
            {
                path: '*',
                component: () => import('../../views/pages/BaseNotFound'),
            },
        ],
    },
]
