<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- / 导航栏 -->
    <van-cell-group>
        <van-field
            v-model="user.mobile"
            clearable
            left-icon="contact"
            placeholder="请输入手机号"
        />

        <van-field
            v-model="user.code"
            left-icon="contact"
            placeholder="请输入验证码"
        >
        <van-button
          slot="button"
          size="small"
          type="primary"
          round
          >发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- 登录表单 -->
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 3.请求登录
      const res = await request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        // headers: {
        //   'Content-Type': 'application/json'
        // }, // 请求头参数
        // params: {}, // Query 查询参数
        data: user // Body 请求体参数
      })
      console.log(res)
      // 4.根据后端返回结果执行后续业务处理
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background: #6db4fb;
    }
  }
}
</style>