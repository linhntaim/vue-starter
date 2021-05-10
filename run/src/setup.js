/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {parseEnv} from 'dotenv-packed'
import {AssetCopier} from './classes/asset-copier'

parseEnv()

new AssetCopier().add(...[
    {
        src: 'node_modules/jquery/dist',
        dst: 'public/vendors/jquery',
    },
    {
        src: 'node_modules/bootstrap/dist',
        dst: 'public/vendors/bootstrap',
    },
    {
        src: 'node_modules/jquery.easing',
        dst: 'public/vendors/jquery.easing',
        notRecursive: true,
    },
    {
        src: 'node_modules/@fortawesome/fontawesome-free',
        dst: 'public/vendors/fontawesome-free',
    },
    {
        src: 'node_modules/animate.css',
        dst: 'public/vendors/animate.css',
    },
    {
        src: 'node_modules/flag-icon-css/css',
        dst: 'public/vendors/flag-icon-css/css',
    },
    {
        src: 'node_modules/flag-icon-css/flags',
        dst: 'public/vendors/flag-icon-css/flags',
    },
    {
        src: 'node_modules/blueimp-canvas-to-blob/js',
        dst: 'public/vendors/blueimp-canvas-to-blob',
    },
    // TODO: Extra Assets

    // TODO
]).copy()
