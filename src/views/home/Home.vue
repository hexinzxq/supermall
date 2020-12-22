<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control
        class="tab-control"   
        :titles="['流行', '新款', '精选']"
        ref="tabControl1"
        v-show="isTabFixed"
      ></tab-control>

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"   
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods['pop'].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from "./childrenComponents/HomeSwiper";
import RecommendView from "./childrenComponents/RecommendView";
import FeatureView from "./childrenComponents/FeatureView";



//用大括号导入的原因是因为模块导入不是default导出的★
import { getHomeMultidata, getHomeGoods } from "network/home";
// import Scroll from '../../components/common/scroll/Scroll.vue';

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      isShowBackTop:false,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      tabOffSetTop:0,
      isTabFixed:false
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //3.赋值,获取tabControl的offSetTop
    this.tabOffSetTop = this.$refs.tabControl.$el.offSetTop
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp
      });
    },
    backClick(){
      // console.log(111);
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y)>1000 
    },
    loadMore(){
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    }
  },
  activated(){
    this.$refs.scroll.refresh()
  },
};
</script>

/* 加的scoped保证是在该组件作用域 */
<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  /* z-index: 9; */
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  position: relative;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
height: calc(100% - 44px);
overflow:hidden;
/* position: absolute; */
/* margin-top: 44px; */
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
}
</style>
