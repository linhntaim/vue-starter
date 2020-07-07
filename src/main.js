import app from '@dsquare-gbu/vue-app'
import App from './views/App'
import AppFailed from './views/AppFailed'
import Vue from 'vue'

Vue.config.productionTip = false

app.create(App, AppFailed)
