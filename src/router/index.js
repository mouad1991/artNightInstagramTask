import Vue from 'vue'
import Router from 'vue-router'
import Feed from '../components/Feed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { name: 'feed', path: '/feed/:username', component: Feed },
    { path: '/', redirect: '/feed/artnightevents' }
  ]
})
