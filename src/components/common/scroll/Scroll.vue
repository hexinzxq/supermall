<template>
<!-- ref属性一般绑定给子组件   -->
<div class="wrapper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false 
      }
  },
  data() {
      return {
          scroll:null
      }
  },
  mounted() {
    //   1.创建better-scroll对象
      this.scroll= new BScroll('.wrapper',{
          click:true,
          probeType:this.probeType,
          PullUpLoad:this.pullUpLoad
      })
    //   2.监听滚动位置
    this.scroll.on('scroll',position=>{
        // console.log(position);
        this.$emit('scroll',position)
    })
    // // 3.监听上拉加载事件
    // this.scroll.on('pullingUp',()=>{
    //     // console.log("上拉加载更多");
    //     this.$emit('pullingUp')
    // })
    // 3.监听scroll滚动到底部
    if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
            // console.log(111);
             this.$emit('pullingUp')
        })
    }

  },
  methods: {
      scrollTo(x,y,time=1000){
          this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
          this.scroll.finishPullUp()
      }
  },
}
</script>

<style>
</style>
