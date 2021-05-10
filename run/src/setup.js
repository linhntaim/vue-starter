/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {parseEnv} from 'dotenv-packed'
import {AssetCopier} from './classes/asset-copier'

parseEnv()

new AssetCopier().add(...[
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
    {
        src: 'node_modules/startbootstrap-sb-admin-2/css',
        dst: 'public/vendors/startbootstrap-sb-admin-2/css',
    },
    {
        src: 'node_modules/startbootstrap-sb-admin-2/js',
        dst: 'public/vendors/startbootstrap-sb-admin-2/js',
    },
    {
        src: 'node_modules/startbootstrap-sb-admin-2/vendor',
        dst: 'public/vendors/startbootstrap-sb-admin-2/vendor',
    },
    {
        src: 'node_modules/select2/dist',
        dst: 'public/vendors/select2',
    },
    {
        src: 'node_modules/@ttskch/select2-bootstrap4-theme/dist',
        dst: 'public/vendors/select2-bootstrap4-theme',
    },
    {
        src: 'node_modules/tempusdominus-bootstrap-4/build',
        dst: 'public/vendors/bootstrap-datetimepicker',
    },
    {
        src: 'node_modules/moment/min',
        dst: 'public/vendors/moment',
    },
    {
        src: 'node_modules/moment/locale',
        dst: 'public/vendors/moment/locale',
    },
    // TODO
    // TODO:

    // TODO
]).copy()
