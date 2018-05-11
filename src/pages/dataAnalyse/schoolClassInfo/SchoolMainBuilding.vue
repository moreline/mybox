<template lang="html">
    <div class="">
        <div class="land-total">
            <div class="b-radius10 b-shadow20 school-shadow"
                 v-for="(item, index) in buildData" :key="index"
                 @click="changeDetail(index, '1')"
                 :class="[index == selectedIdx ? 'active' : '' ]">
                <div class="grid-content content">{{item.name}}</div>
                <div class="grid-content" :style="item.class">{{item.value}}</div>
            </div>
        </div>
        <div class="land-echart">
            <div class="b-radius20 b-shadow30 echart-box">
                <div class="grid-content">
                    <p class="land-echarts-title">校舍建筑面积</p>
                    <div id="build_room"
                         style="width:100%;height:550px;min-width:500px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 校舍建筑面积.
 * 参考 lixiaoyin 代码, 重构.
 * @author dz-gonglong-20180509
 */
import numberObj from 'lodash/number'
 // 引入 ECharts 主模块
 var echarts = require('echarts/lib/echarts')
 // 引入柱状图
 // require('echarts/lib/chart/bar')
 // 引入线状图
 require('echarts/lib/chart/line')
 // 引入提示框和标题组件
 require('echarts/lib/component/tooltip')
 require('echarts/lib/component/title')

const MOCK_BUILD_DATA = [
    {
        name: '幼儿园总面积（/m²）',
        value: 5086630,
        class: {
            'color': '#fe755f',
            'font': 'bolder 18px "Microsoft YaHei"',
            'line-height': '30px'
        }
    },
    {
        name: '小学总面积（/m²）',
        value: 4314460,
        class: {
            'color': '#845ffe',
            'font': 'bolder 18px "Microsoft YaHei"',
            'line-height': '30px'
        }
    },
    {
        name: '初中总面积（/m²）',
        value: 4824057,
        class: {
            'color': '#13c0aa',
            'font': 'bolder 18px "Microsoft YaHei"',
            'line-height': '30px'
        }
    },
    {
        name: '高中总面积（/m²）',
        value: 4893704,
        class: {
            'color': '#fe68b4',
            'font': 'bolder 18px "Microsoft YaHei"',
            'line-height': '30px'
        }
    }]

const MOCK_CHART_DATA = [
    {
        data: {
            one: [], // 正在使用
            two: [], // 正在施工
            three: [] // 废弃
        }
    },
    {
        data: {
            one: [],
            two: [],
            three: []
        }
    },
    {
        data: {
            one: [],
            two: [],
            three: []
        }
    },
    {
        data: {
            one: [],
            two: [],
            three: []
        }
    }
]

export default {
    name: 'SchoolMainBuilding',
    data () {
        return {
            selectedIdx: 0,
            buildData: [],
            chartObj: null,
            chartData: [],
            buildAutoPlayTimer: null,
            // 重置 定时器: 用以恢复自动播放定时器;
            resetTimer: null,
            timerCount: 0,
            // 自动播放-时间间隔(毫秒).
            duration: 2000
        }
    },
    created: function () {
        this.buildData = MOCK_BUILD_DATA
        this.chartData = MOCK_CHART_DATA
        // console.log('MOCK_CHART_DATA:' + MOCK_CHART_DATA)
        // TODO -- gonglong --MOCK_CHART_DATA, lodash
    },
    mounted: function () {
        this.chartObj = echarts.init(document.getElementById('build_room'))
        this.getChartMockData()
        this.changeDetail(0)
        this.openBuildAutoPlayTimer()
    },
    beforeDestroy: function () {
        this.closeAllTimer()
    },
    methods: {
        /**
         * 获取 chart 模拟数据.
         *
         */
        getChartMockData: function () {
            let tempChartData = this.chartData
            let tempItem = null
            for (let i = 0, len = tempChartData.length; i < len; i++) {
                tempItem = tempChartData[i].data
                for (let j = 0, jlen = 6; j < jlen; j++) {
                    tempItem.one.push(numberObj.random(1000000, 2000000)) // 正在使用
                    tempItem.two.push(numberObj.random(1000000, 2000000)) // 正在施工
                    tempItem.three.push(numberObj.random(1000000, 2000000)) // 废弃
                }
            }
        },
        /**
         * 切换详情数据
         * @param {number} 导航下标.
         */
        changeDetail: function (idx, event) {
            this.selectedIdx = idx
            this.timerCount = idx
            // console.log('%c build-changeDetail:' + JSON.stringify({idx: idx, sec: new Date().getSeconds(), event: event}), 'background-color: yellow')
            if (typeof event !== 'undefined' && event === '1') {
                // 手动操作. 关闭自动播放
                this.closeBuildAutoPlayTimer()
                // 打开 重置定时器
                this.openResetTimer()
                this.closeAutoPlayMixin()
            }
            let tempChartData = this.chartData
            let opts = {
                color: ['#528df9', '#fe7560', '#fd61a1'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['正在使用', '正在施工', '废弃']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2013', '2014', '2015', '2016', '2017', '2018']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '正在使用',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: tempChartData[idx].data.one
                    },
                    {
                        name: '正在施工',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: tempChartData[idx].data.two
                    },
                    {
                        name: '废弃',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: tempChartData[idx].data.three
                    }
                ]
            }
            this.chartObj.setOption(opts)
        },
        /**
         * 打开自动播放.
         */
        openBuildAutoPlayTimer: function () {
            // console.log('%c build- 打开自动播放！', 'background-color: lightgreen')
            this.buildAutoPlayTimer = setInterval(() => {
                console.log('%c build- 执行自动播放:' + '学校建筑' + new Date().getTime())
                let idx1 = this.timerCount % 4
                this.changeDetail(idx1)
                this.timerCount++
            }, this.duration)
        },
        /**
         * 关闭自动播放.
         */
        closeBuildAutoPlayTimer: function () {
            clearInterval(this.buildAutoPlayTimer)
            this.buildAutoPlayTimer = null
        },
        /**
         * 打开 重置定时器..
         */
        openResetTimer: function () {
            // 关闭上次的 定时器
            this.closeResetTimer()
            this.resetTimer = setTimeout(() => {
                // console.log('%c build- 重置定时器: ' + new Date().getTime(), 'background-color: pink')
                this.openBuildAutoPlayTimer()
            }, this.duration * 2)
        },
        /**
         * 关闭 重置定时器..
         */
        closeResetTimer: function () {
            clearTimeout(this.resetTimer)
            this.resetTimer = null
        },
        /**
         * 关闭 所有定时器..
         */
        closeAllTimer: function () {
            // console.log('%c build- 关闭 所有定时器！', 'background-color: grey')
            this.closeBuildAutoPlayTimer()
            this.closeResetTimer()
        }
    }
}
</script>

<style lang="less">
</style>
