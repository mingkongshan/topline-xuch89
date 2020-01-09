<template>
  <div id="app">
     <!-- 根陆由出口 -->
      <router-view />

      <i class="iconfont icon-Apple"></i>

      <van-icon name="fire-o" />

      <van-icon name="fire-o" />

      <van-icon class-prefix="icon" name="Apple" />

      <div class="box">hello</div>

      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>

      <van-cell-group>
        <van-cell title="单元格" value="内容"></van-cell>
        <van-cell title="单元格" value="内容" label="描述信息"></van-cell>
      </van-cell-group>
  </div>
</template>

<script>
// @ 是 src 目录的别名

export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
// 注意:在 style 中使用 @ 别名, 需要在前面加 ~
// @ 之后必须有之
// 如果你加载的资源就是相对当前目录,建议还是./
@import url("~@/styles/variables.less");
.box{
  color: @color-primary;
}
</style>
