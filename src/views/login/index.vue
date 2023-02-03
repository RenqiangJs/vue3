<template>
  <section class="login-main" @keyup.enter="submit">
    <div class="content">
      <section class="left-box"></section>
      <section class="right-box">
        <div class="login-box">
          <h1 class="title">{{ '蒽蒽' }}</h1>
          <p class="input-box user">
            <input
              class="input"
              v-model="form.username"
              type="text"
              :maxlength="10"
              placeholder="请输入用户名"
            />
          </p>
          <p class="input-box password">
            <input
              class="input"
              type="password"
              v-model="form.password"
              :maxlength="16"
              placeholder="请输入密码"
            />
          </p>
          <a-button type="primary" block @click="submit" :loading="loading"
            >登 录</a-button
          >
        </div>
      </section>
    </div>
    <div id="slid-box"></div>
  </section>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { login } from '@/api'
import { useToken } from '@/store/useUserInfo'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

let countdown = ref(0)
let codeTimer = ref(null)
const form = ref({
  username: '',
  password: '',
})

const loading = ref(false)

const submit = function () {
  if (!form.value.username) {
    message.error('请输入手机号码')
    return
  }
  if (!form.value.password) {
    message.error('请输入验证码')
    return
  }
  login(form.value).then((res) => {
    // 做一些登录后的操作 保存token 重定向至上一个页面或者首页
    const tokenStore = useToken()
    tokenStore.setToken(res.token)
    const redirectPath = route.query && route.query.redirect
    router.push({ path: redirectPath })
  })
}
</script>

<style lang="less" scoped>
.login-main {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-size: 100% 100%;
  display: flex;
  .content {
    min-width: 1270px;
    height: 540px;
    transition: all ease 1s;
    background: #fff;
    display: flex;
    margin: auto;
    box-shadow: 0 0 25px rgba(116, 214, 255, 0.33);
    .left-box {
      width: 52%;
      height: 100%;
      box-shadow: 8px 0px 10px rgba(116, 214, 255, 0.33);
    }
    .right-box {
      width: 48%;
      display: flex;
      .login-box {
        width: 420px;
        margin: auto;
        text-align: center;
        .title {
          transition: all ease 1s;
          font-size: 36px;
          font-weight: 500;
          line-height: 36px;
          margin-bottom: 72px;
          text-align: center;
        }
        .input-box {
          position: relative;
          margin-bottom: 0;
          .input {
            width: 360px;
            height: 50px;
            padding: 14px 14px 14px 48px;
            margin-bottom: 32px;
            background: none;
            border: solid 1px #d1d6e2;
            outline: none;
          }
          &:before {
            content: '';
            z-index: 1;
            top: 14px;
            left: 43px;
            position: absolute;
            display: inline-block;
            width: 20px;
            height: 24px;
          }
          &.user {
            &:before {
              background-size: 100%;
            }
          }
          &.password {
            position: relative;
            &:before {
              background-size: 100%;
            }
            .codeBtn {
              cursor: pointer;
              font-size: 12px;
              position: absolute;
              top: 10px;
              right: 40px;
              width: 140px;
              height: 30px;
              color: #59bcfe;
              background-color: rgba(89, 188, 254, 0.22);
              border: 1px solid #59bcfe;
              border-radius: 4px;
              &.disabled {
                color: rgba(0, 0, 0, 0.25);
                background-color: #f5f5f5;
                border-color: #d9d9d9;
              }
            }
          }
        }
        .ant-btn {
          width: 360px;
          height: 52px;
          border: none;
          font-size: 18px;
          letter-spacing: 20px;
          background: -webkit-linear-gradient(
            270deg,
            rgba(113, 233, 254, 1) 0%,
            rgba(88, 187, 254, 1) 100%
          ); /*for safari5.1-6.0*/
          background: -o-linear-gradient(
            270deg,
            rgba(113, 233, 254, 1) 0%,
            rgba(88, 187, 254, 1) 100%
          ); /*Opera 11.1-12.0*/
          background: -moz-linear-gradient(
            270deg,
            rgba(113, 233, 254, 1) 0%,
            rgba(88, 187, 254, 1) 100%
          ); /*firefox 3.6-15*/
          background: linear-gradient(
            270deg,
            rgba(113, 233, 254, 1) 0%,
            rgba(88, 187, 254, 1) 100%
          ); /*标准语法*/
        }
      }
    }
  }
}
</style>
