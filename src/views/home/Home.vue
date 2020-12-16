<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childrenComponents/HomeSwiper'
import RecommendView from './childrenComponents/RecommendView'
//用大括号导入的原因是因为模块导入不是default导出的★
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components : {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners : [],
      recommends : []
    }
  },
  created() {
    // 请求多个数据
    getHomeMultidata().then(res=>{
      // this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
}
</script>

<style>
.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>
