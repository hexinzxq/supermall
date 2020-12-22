<template>
<div id="detail">
   <detail-nav-bar class="detail-nav"></detail-nav-bar>
   <scroll class="content">
       <detail-swiper :top-images="topImages"></detail-swiper> 
       <!-- <detail-goods-info :detail-info="detailInfo"></detail-goods-info> -->
   </scroll>
</div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
// import DetailGoodsInfo from './childComponents/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll'
import {getDetail,Goods} from 'network/detail'

export default {
  name: "Detail",
  components:{
      DetailNavBar,
      DetailSwiper,
      Scroll,
    //   DetailGoodsInfo
  },
  data() {
      return {
          iid:null,
          topImages:[],
          goods:{},
          detailInfo:{}
      }
  },
  created(){
    //   1.保存传入的iid
      this.iid=this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //   1.获取顶部轮播图数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)    

        // 3.保存商品详情数据
        this.detailInfo = data.detailInfo

      })
  }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}

.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}

.content{
    height: calc(100% - 44px);
}
</style>
