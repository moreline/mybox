<template>
   <el-footer class="dz-footer">
       <div class="dz-copyright">
           <p class="copyright-text">
               版权所有：世纪海航 备案编号：闽ICP备15498468号-1
           </p>
       </div>
   </el-footer>
</template>

<script>
    export default {
        name: 'DzFooter'
    }
</script>

<style lang="less">
    .dz-footer{
        background-color:#fff;
        height: 38px !important;
        .dz-copyright{
            width:100%;
            line-height: 38px;
            box-sizing: border-box;
            padding-right: 40px;
            .copyright-text{
                text-align: right;
                color: #48576a;
            }
        }
    }
</style>
