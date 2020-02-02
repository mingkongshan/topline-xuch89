<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      tab 组件
        v-model="active" 控制被激活的标签
        title 标签标题
     -->
    <van-tabs v-model="active">
       <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
      >
      <article-list :channel="channel" />
      </van-tab>

    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      position="botton"
      :style="{ height: '100%' }"
      round
      closeable
      close-icon-position="top-left"
    >
      <channel-edit />
    </van-popup>
      <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: .8;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
