<template>
    <div class="dz-comm-body" ref="dzBodyH">
        <slot name="content"></slot>
        <!--el-container-->
    </div>
</template>

<script>
    /**
     * body组件.
     * 根据浏览器'窗口的文档显示区的高度'，设置body高度，合理调整页面布局.
     *
     * @author dz-gonglong-20180503
     */
    export default {
        name: 'DzBody',
        mounted: function () {
            // this.$refs.contentHeight.style.minHeight = window.innerHeight - 175 + 'px'
            // window.screen.height , TODO -- 考虑用 screen.height 替换.
            this.$refs.dzBodyH.style.minHeight = window.innerHeight - 175 + 'px'
        },
        methods: {}
    }
</script>

<style lang="less">
    .dz-comm-body {
        padding: 50px 93px 45px;
        box-sizing: border-box;
    }
</style>
