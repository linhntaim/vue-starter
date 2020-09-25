import {parseEnv} from 'dotenv-packed'
import AssetCopier from './classes/asset-copier'

parseEnv()

new AssetCopier().add(...[
    {
        src: 'node_modules/jquery/dist',
        dst: 'public/vendor/jquery',
    },
    {
        src: 'node_modules/bootstrap/dist',
        dst: 'public/vendor/bootstrap',
    },
    {
        src: 'node_modules/jquery.easing',
        dst: 'public/vendor/jquery.easing',
        notRecursive: true,
    },
    {
        src: 'node_modules/@fortawesome/fontawesome-free',
        dst: 'public/vendor/fontawesome-free',
    },
    {
        src: 'node_modules/animate.css',
        dst: 'public/vendor/animate.css',
    },
    {
        src: 'node_modules/flag-icon-css/css',
        dst: 'public/vendor/flag-icon-css/css',
    },
    {
        src: 'node_modules/flag-icon-css/flags',
        dst: 'public/vendor/flag-icon-css/flags',
    },
    {
        src: 'node_modules/blueimp-canvas-to-blob/js',
        dst: 'public/vendor/blueimp-canvas-to-blob',
    },
    // TODO: Extra Assets
]).copy()
