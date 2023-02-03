import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { isEmpty } from '@/utils/index'
export const useUserInfo = defineStore('userInfoStore', () => {
  let userInfo = reactive({})
  let userMenus = reactive({})
})
export const useToken = defineStore('tokenStore', () => {
  let token = ref('')

  const setToken = function (tokenData: string) {
    token.value = tokenData
  }

  const getToken = function (): string {
    return token.value
  }

  const clearToken = function () {
    token.value = ''
  }

  return {
    token,
    setToken,
    getToken,
    clearToken,
  }
})
