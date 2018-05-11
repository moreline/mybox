<template>
    <div id="app">
        <el-container>
            <dz-header></dz-header>
            <el-container class="dz-comm-body" :style="pageMinH">
                <router-view/>
            </el-container>
            <!--<el-footer>AAA</el-footer>-->
            <el-footer class="dz-comm-footer">版权所有：世纪海航 备案编号：闽ICP备15498468号-1</el-footer>
        </el-container>
    </div>
</template>

<script>
    import DzHeader from '@/components/DzTempHeader/DzHeader'
    // import DzFooter from '@/components/DzFooter'

    export default {
        name: 'App',
        data () {
            return {
                minH: 600
            }
        },
        created: function () {
            this.minH = window.screen.height - 200
        },
        components: {
            'dz-header': DzHeader
        },
        computed: {
            pageMinH: function () {
                return {'min-height': this.minH + 'px'}
            }
        }
    }
</script>

<style lang="less">
    html {
        height: 100%;
        overflow-y: scroll;
    }

    #app {
        /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-align: center;
          color: #2c3e50;
          margin-top: 60px; */
        min-width: 1200px;
        background-color: #f2f5fa;
    }

    .el-header,
    .el-footer {
        /*background-color: #b3c0d1;*/
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        border-right: 1px solid #e6e6e6;
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        overflow: hidden;
        background-color: #ffffff;
        color: #333;
        text-align: center;
    }

    /* TODO -- temp */
    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    /*  local common css */
    .local-top-btns {
        border-bottom: 1px solid #e6e6e6;
        .el-button--text {
            color: #606266;
            &:hover {
                color: #96989a;
            }
        }
    }

    .el-loading-mask {
        z-index: 900;
    }
</style>
