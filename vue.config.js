/* 自己写的配置会自动与公共的配置合并 */
module.exports = {
    /* 配置别名,一般项目都要配置 */
    configureWebpack:{
        resolve : {
            extensions:[],
            alias:{
                // '@' : 'src' 内部默认配置的别名
                'assets' : '@/assets',
                'common' : '@/common',
                'components' : '@/components',
                'network' : '@/network',
                'views' : '@/views', 
                'vuejs-datatable': 'vuejs-datatable/dist/vuejs-datatable.esm.js',
            }
        }
    }
}