import Vue from 'vue'
import Router from 'vue-router'
import { state } from '../store'
import Landing from '../views/Landing.vue'
import Splash from '../views/Splash.vue'
import {
  beginNavigation,
  completeNavigation,
  coverBeforeCommit,
  navigation,
} from '../utils/navigation'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '/', component: Splash },
    { path: '/welcome', component: Landing },
    { path: '*', redirect: '/welcome' }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.workspace) && !state.session)
    next({ path: '/login', query: { redirect: to.fullPath } })
  else {
    beginNavigation(to, from)
    next()
  }
})
router.beforeResolve(async (to, from, next) => {
  const current = await coverBeforeCommit(navigation.revision)
  if (current) next()
  else next(false)
})
router.afterEach((to) => {
  document.title = `${to.meta.title || 'AI 学习空间'} · 知序`
  completeNavigation(to)
})
// 模块加载失败已在 lazyPage 中显示可重试提示，避免额外弹出无操作入口的错误。
router.onError(() => {})
export default router
