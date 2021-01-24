import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import VueTextareaAutosize from 'vue-textarea-autosize'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import VueI18n from 'vue-i18n'
import message from "@/i18n/message";

Vue.use(VueRouter)
Vue.use(VueTextareaAutosize)
Vue.use(VueI18n)

import routes from "@/router";
const router = new VueRouter({
    routes
})

const i18n = new VueI18n({
    locale: store.state.language,
    messages: message
})

Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app')
