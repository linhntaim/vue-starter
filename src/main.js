import app from '@dsquare-gbu/vue-app'
import use from './use'
import register from './register'
import App from './views/App'
import AppFailed from './views/AppFailed'
import Vue from 'vue'

Vue.config.productionTip = false

app.register(register).use(use).create(App, AppFailed)
