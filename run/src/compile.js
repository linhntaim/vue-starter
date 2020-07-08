import {parseEnv} from 'dotenv-packed'
import CssBuilder from './classes/css-builder'

parseEnv()

new CssBuilder().build([
    'style',
], [
    './public/css/sb-admin-2.min.css',
])
