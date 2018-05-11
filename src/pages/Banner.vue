<template>
    <div class="banner-box">
       <transition-group name="fade" mode="out-in">
          <img v-for="(imgItem,index) in urls" :src="imgItem" v-show="index==activeIndex" :key="index" @click="handleClick">
      </transition-group>
    </div>
</template>

<script>
/**
 * 全屏banner
 * @author dz-liujingyan 20180506
 */

    export default {
        name: 'Banner',
        data () {
            return {
                // 当前图片index 0开始
                activeIndex: 0,
                urls: [
                    '/static/images/banner0.jpg',
                    '/static/images/banner1.jpg',
                    '/static/images/banner2.jpg'
                ],
                timer: null }
        },
        mounted: function () {
            // 3s切换
            if (this.MIXIN_AUTO_PLAY) {
                this.timer = setInterval(() => {
                    if (this.activeIndex < 2) {
                       this.activeIndex++
                   } else {
                       this.activeIndex = 0
                   }
                }, 3000)
            }
        },
        methods: {
            /**
             * 清除定时器 跳转首页
             */
            handleClick () {
                clearInterval(this.timer)
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .banner-box{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2000;
        img{
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
</style>
