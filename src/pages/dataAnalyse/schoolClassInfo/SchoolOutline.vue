<template lang="html">
    <div class="">
        <el-row :gutter="24" class="school-total">
            <el-col :span="6" class="b-radius20 b-shadow30 school-shadow">
                <div class="grid-content">学校统计（所）</div>
                <div class="grid-content color1">11199</div>
            </el-col>
            <el-col :span="6" class="b-radius20 b-shadow30 school-shadow">
                <div class="grid-content">教师统计（人）</div>
                <div class="grid-content color2">504876</div>
            </el-col>
            <el-col :span="6" class="b-radius20 b-shadow30 school-shadow">
                <div class="grid-content">学生统计（人）</div>
                <div class="grid-content color3">8007863</div>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="school-echart">
            <el-col style="width: 40%;min-width:300px;"
                    class="b-radius20 b-shadow30 school-shadow">
                <p class="asset-echarts-title">本区域下学校构成情况</p>
                <div class="grid-content" id="school-one">
                    <dz-pie
                        :echartStyle="pieData.echartStyle"
                        :titleText="pieData.title"
                        :tooltipFormatter="pieData.tooltipFormatter"
                        :opinion="pieData.opinion"
                        :opinionData="pieData.opinionData"
                        v-on:currentEchartData="getEchartData"
                    ></dz-pie>
                </div>
            </el-col>
            <el-col style="width: 56%;min-width:500px;"
                    class="b-radius20 b-shadow30 school-shadow">
                <p class="asset-echarts-title">班级数量</p>
                <div id="class-one1" style="width:100%;height:320px">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import DzPie from '@/components/DzPieEcharts'
    export default {
        name: 'SchoolOutline',
        components: {DzPie},
        data () {
            return {
                pieData: { // 学校班级数据
                    title: '',
                    tooltipFormatter: '学校数量',
                    opinion: ['幼儿园', '小学', '初中', '高中', '其他'],
                    opinionData: [
                        {value: 5019, name: '幼儿园'},
                        {value: 2979, name: '小学'},
                        {value: 1984, name: '初中'},
                        {value: 1120, name: '高中'},
                        {value: 97, name: '其他'}
                    ],
                    echartStyle: { // 饼状图高度
                        height: ''
                    }
                }
            }
        },
        created () {
            // 设置饼状图高度
            this.pieData.echartStyle.height = 320 + 'px'
        },
        mounted () {
            this.drawBar() // 柱状图方法
        },
        beforeDestroy () {
        },
        methods: {
            getEchartData (val) { // 获取饼状图数据方法
            },
            drawBar () {
                // 学校班级echart
                let that = this
                setTimeout(function () {
                    let myChart = that.$echarts.init(document.getElementById('class-one1'))
                    myChart.setOption({
                        color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4'],
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [
                                ['product', '幼儿园', '小学', '初中', '高中'],
                                ['2013', 4114, 5248, 2048, 1259],
                                ['2014', 4401, 4810, 1948, 1231],
                                ['2015', 4547, 4728, 1847, 1200],
                                ['2016', 4669, 4586, 1987, 1179],
                                ['2017', 4816, 4170, 1887, 1167],
                                ['2018', 5109, 2979, 1984, 1120]
                            ]
                        },
                        xAxis: {type: 'category'},
                        yAxis: {},
                        series: [
                            {type: 'bar'},
                            {type: 'bar'},
                            {type: 'bar'},
                            {type: 'bar'}
                        ]
                    })
                }, 200)
            }
        }
    }
</script>

<style lang="less">

</style>
