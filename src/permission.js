import router from './router'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isExternal } from './utils/validate'
import { useUserInfo, useToken } from '@/store/useUserInfo' // 用户信息相关store
/**
 * 配置进度条，不需要小圈圈
 */
NProgress.configure({ showSpinner: false })
/**
 * 白名单
 */
const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()
  // token存在
  if (getToken()) {
    next()
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

/**
 * 进度条完成
 */
router.afterEach(() => {
  NProgress.done()
})
