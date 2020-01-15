<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- / 导航栏 -->
    <!-- 表单验证
    1、使用 ValidationObserver 把需要校验的整个表单包起来

    2、使用 ValidationProvider 把需要校验的具体表单元素包起来，例如 input

    3、通过 ValidationProvider 配置具体的校验规则

    name 配置验证字段的名称

    rules 验证规则

    rules="requried" 单个验证规则
    rules="required|length:4" 多个验证规则使用 | 分隔
    v-slot="{ errors }" 获取错误消息，使用 errors[0] 绑定展示错误消息

          内置的规则：https://logaretm.github.io/vee-validate/guide/rules.html#rules
          自定义规则：
          单个验证规则：rules="required"
          多个验证规则：rules="required|length:4"
         v-slot="{ errors }" 获取校验失败的错误提示消息
          errors[0] 获取错误消息
    -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile" immediate>
        <van-field
          v-model="user.mobile"
          clearable
          placeholder="请输入手机号"
        >
          <i class="icon icon-shouji" slot="left-icon"></i>
        </van-field>
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required|code" immediate>
        <van-field
          v-model="user.code"
          placeholder="请输入验证码"
        >
          <i class="icon icon-mima" slot="left-icon"></i>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode"
          >发送验证码</van-button>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <div class="login-btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>
        <!-- 倒计时 -->
    </div>
    <!-- 登录表单 -->
  </div>
</template>

<script>

import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
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
      const success = await this.$refs.form.validate()

      if (!success) {
        console.log('表单验证失败')
        // 注意：如果你需要在 JS 验证中能马上获取到错误消息
        // 必须给每一个 ValidationProvider 配置 immediate 初始验证
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            // 找到第1个有错误的消息，给出提示，停止遍历
            return
          }
        }
        // 获取验证失败的错误消息，轻提示
        return
      }

      // 开启登陆中 loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 3.请求登录
      try {
        const { data } = await login(this.user)
        // 将登录成功获取到的用户 token 相关的数据存储到 Vuex 容器
        // res.data.data => { token: 'xxx', refresh_token: 'xxx' }
        this.$store.commit('setUser', data.data)

        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登陆成功')

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toact.fail('登陆失败,手机号或验证码不正确')
      }

      // 4.根据后端返回结果执行后续业务处理
    },

    async onSendSmsCode () {
      // 1. 获取手机号
      const { mobile } = this.user
      // 2. 校验手机号是否有效
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 3. 发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
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
  .form-item {
    height: 45px;
    align-items: center;
  }
}
</style>
