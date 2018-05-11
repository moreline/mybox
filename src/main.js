// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import API from './api/mock'
import echarts from 'echarts'
import ElementUI from 'element-ui'

import '@/assets/css/base.css'
import '@/assets/css/tmp-main.less'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.API = API

Vue.use(ElementUI)

Vue.mixin({
    data: function () {
        return {
            MIXIN_AUTO_PLAY: true
        }
    },
    created: function () {
        sessionStorage.setItem('MIXIN_AUTO_PLAY', '1')
    },
    methods: {
        /**
         * 打开自动播放.
         */
        openAutoPlayMixin: function () {
            this.MIXIN_AUTO_PLAY = true
            sessionStorage.setItem('MIXIN_AUTO_PLAY', '1')
        },
        /**
         * 关闭自动播放.
         */
        closeAutoPlayMixin: function () {
            this.MIXIN_AUTO_PLAY = false
            sessionStorage.setItem('MIXIN_AUTO_PLAY', '0')
        },
        /**
         * 获取 '自动播放'标识.
         */
        getAutoPlayMixin: function () {
            // return this.MIXIN_AUTO_PLAY // TODO 全局混入mixin存在缺陷,此变量的值在 定时器中竟然被缓存. 后期再调查原因。
            return parseInt(sessionStorage.getItem('MIXIN_AUTO_PLAY'), 10)
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    created: function () {
        Vue.prototype.$echarts = echarts
    }
})
