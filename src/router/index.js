import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('views/home/Home.vue')
const Category = ()=>import('views/category/Category.vue')
const Profile = ()=>import('views/profile/Profile.vue')
const Shopcart = ()=>import('views/shopcart/Shopcart.vue')

// // 1.安装插件
Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/category',
        component:Category
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/shopcart',
        component:Shopcart
      }
]

//2.创建router
const router = new VueRouter({
    routes,
    mode : 'history'
})

//3.导出
export default router