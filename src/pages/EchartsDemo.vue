<template lang="html">
  <div class="">
      <p>EchartsDemo</p>
      <div id="firstChart" style="width: 600px;height:400px;"></div>
      <div id="secondChart" style="width: 600px;height:400px;"></div>
      <el-button @click="getClockedRecord">动态获取数据</el-button>
  </div>
</template>

<script>
/**
 * echarts Demo
 * ps: http://echarts.baidu.com/index.html
 */
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入线状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
    name: 'EchartsDemo',
    data () {
        return {
            secondEchartObj: null,
            clockedDataKeys: [],
            clockedDataVals: []
        }
    },
    created: function () {},
    mounted: function () {
        this.initFirstChart()
        this.secondEchartObj = echarts.init(
            document.getElementById('secondChart')
        )
        this.initSecondChart()
    },
    methods: {
        /**
         * 初始化'柱状图' -- bar.
         */
        initFirstChart: function () {
            // 基于准备好的dom，初始化echarts实例
            // 一定要在页面加载后才能 成功执行 document.getElementById。
            var firstChart = echarts.init(
                document.getElementById('firstChart')
            )
            // 绘制图表
            firstChart.setOption({
                title: {
                    text: '页面访问统计'
                },
                tooltip: {},
                xAxis: {
                    data: [
                        '首页',
                        '登陆页',
                        '关于我们',
                        '主界面',
                        '教师详情',
                        '学生列表'
                    ]
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [200, 60, 10, 80, 10, 20]
                    }
                ]
            })
        },
        /**
         * 初始化'线状图' -- line.
         * ps: 动态获取数据.
         */
        initSecondChart: function () {
            // 绘制图表
            this.secondEchartObj.setOption({
                title: {
                    text: '页面访问统计-2'
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [
                    {
                        name: '打卡',
                        type: 'line',
                        data: []
                    }
                ]
            })
        },
        /**
         * 获取打卡数据.
         *
         */
        getClockedRecord: function () {
            // TODO -- mock ajax
            setTimeout(() => {
                this.clockedDataKeys = [
                    '首页',
                    '登陆页',
                    '关于我们',
                    '主界面',
                    '教师详情',
                    '学生列表'
                ]
                this.clockedDataVals = [200, 60, 10, 80, 10, 20]
                this.updateSecondChart()
            }, 1500)
        },
        updateSecondChart: function () {
            this.secondEchartObj.setOption({
                xAxis: {
                    data: this.clockedDataKeys
                },
                series: [
                    {
                        name: '打卡',
                        type: 'line',
                        data: this.clockedDataVals
                    }
                ]
            })
        }
    }
}
</script>

<style lang="css">
</style>
