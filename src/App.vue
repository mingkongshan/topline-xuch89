<template>
  <div id="app">
     <!-- 根陆由出口 -->
     <router-view></router-view>
      <van-button type="info">默认按钮</van-button>
      <van-button type="info">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="info">警告按钮</van-button>
      <van-button type="info">危险按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
