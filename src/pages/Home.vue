<template lang="html">
    <el-main class="overview">
        <!--简要数据-->
        <div class="short-data">
            <div class="data-line short-line"
                 v-for="(lineItemVal, lineItemKey) in pageShortData"
                 :key="lineItemKey">
                <div class="item b-radius20 b-shadow30"
                     v-for="(shortItem, idx) in lineItemVal" :key="idx">
                    <p class="title">{{shortItem.lbl}}</p>
                    <p class="val" :class="shortItem.class"><span
                        class="num">{{shortItem.val}}</span>/<span>{{shortItem.unitTxt}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!--图形数据-->
        <div class="chart-data">
            <div class="data-line chart-line">
                <div class="item b-radius20 b-shadow30" v-for="n in 3" :id="'first_chart_'+n"
                     :key="'first_chart_'+n">{{'first_chart_'+n}}
                </div>
            </div>
            <div class="data-line chart-line">
                <div class="item b-radius20 b-shadow30" v-for="n in 3" :id="'second_chart_'+n"
                     :key="'second_chart_'+n">{{'second_chart_'+n}}
                </div>
            </div>
            <div class="data-line chart-line">
                <div class="item b-radius20 b-shadow30" v-for="n in 3" :id="'third_chart_'+n"
                     :key="'third_chart_'+n">{{'third_chart_'+n}}
                </div>
            </div>
        </div>
    </el-main>
</template>

<script>
/**
 * 首页-概览.
 *
 * @author dz-gonglong-20180505
 */
import DzHeader from '@/components/DzTempHeader/DzHeader'
import _ from 'lodash/number'
import langObj from 'lodash/lang'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入线状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

const COLOR_LIST = {
    colorKindergarten: '#f79aab', // 幼儿园
    colorPrimary: '#ffc107', // 小学
    colorMid: '#00d491', // 初中
    colorHighMid: '#2196f3', // 高中
    colorAbsence: '#f44336' // 缺勤
}

// 单位转换
const UNIT_LBL = {
    S: '所',
    R: '人',
    C: '次',
    F: '分'
}
// 模拟数据
const MOCK_DATA = {
    shortData: {
        first: [
            {
                lbl: '学校数量',
                unit: 'S',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_blue'
            },
            {
                lbl: '教师人数',
                unit: 'R',
                val: 0,
                min: 1000,
                max: 5000,
                class: 'c_blue'
            },
            {
                lbl: '学生人数',
                unit: 'R',
                val: 0,
                min: 10000,
                max: 50000,
                class: 'c_blue'
            },
            {
                lbl: '考试次数',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_blue'
            }
        ],
        second: [
            {
                lbl: '教师早退',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_purple'
            },
            {
                lbl: '教师迟到',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_warn'
            },
            {
                lbl: '教师请假',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_pink'
            },
            {
                lbl: '教师缺勤',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_green'
            }
        ],
        third: [
            {
                lbl: '学生早退',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_purple'
            },
            {
                lbl: '学生迟到',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_warn'
            },
            {
                lbl: '学生请假',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_pink'
            },
            {
                lbl: '学生缺勤',
                unit: 'C',
                val: 0,
                min: 100,
                max: 500,
                class: 'c_green'
            }
        ],
        fource: [
            {
                lbl: '纪律得分',
                unit: 'F',
                val: 0,
                min: 1,
                max: 10,
                class: 'c_blue'
            },
            {
                lbl: '卫生得分',
                unit: 'F',
                val: 0,
                min: 1,
                max: 10,
                class: 'c_blue'
            },
            {
                lbl: '集体得分',
                unit: 'F',
                val: 0,
                min: 1,
                max: 10,
                class: 'c_blue'
            },
            {
                lbl: '课堂纪律',
                unit: 'F',
                val: 0,
                min: 1,
                max: 10,
                class: 'c_blue'
            },
            {
                lbl: '入校情况',
                unit: 'F',
                val: 0,
                min: 1,
                max: 10,
                class: 'c_blue'
            }
        ]
    },
    chartData: {
        first: [
            {
                title: {
                    text: '学校数量'
                },
                series: [
                    {
                        data: [5248, 4810, 4728, 4586, 4170, 2979]
                    },
                    {
                        data: [2248, 2810, 3728, 3586, 3170, 3979]
                    },
                    {
                        data: [1248, 1810, 1728, 1586, 1170, 1979]
                    }
                ]
            },
            {
                title: {
                    text: '教师人数'
                },
                series: [
                    {
                        data: [524, 481, 472, 458, 1000, 300]
                    },
                    {
                        data: [2248, 2810, 3728, 3586, 3170, 3979]
                    },
                    {
                        data: [1248, 1810, 1728, 1586, 1170, 1979]
                    }
                ]
            },
            {
                title: {
                    text: '学生人数'
                },
                series: [
                    {
                        data: [5248, 4810, 4728, 4586, 4170, 2979]
                    },
                    {
                        data: [2248, 2810, 3728, 3586, 3170, 3979]
                    },
                    {
                        data: [1248, 1810, 1728, 1586, 1170, 1979]
                    }
                ]
            }
        ],
        second: [
            {
                title: {
                    text: '全区小学考试次数'
                },
                series: [
                    {
                        data: [5248, 4810, 4728, 4586, 4170, 2979]
                    }
                ]
            },
            {
                title: {
                    text: '全区初中考试次数'
                },
                series: [
                    {
                        data: [3248, 4810, 4728, 4586, 4170, 2979]
                    }
                ]
            },
            {
                title: {
                    text: '全区高中考试次数'
                },
                series: [
                    {
                        data: [1248, 4810, 4728, 4586, 4170, 2979]
                    }
                ]
            }
        ],
        thrid: [
            {
                title: {
                    text: '全区教师考勤数据'
                },
                series: {
                    late: [100, 110, 120, 130, 140, 150, 160],
                    leaveEarly: [50, 60, 70, 80, 90, 30, 50],
                    leaveLegal: [10, 50, 60, 90, 80, 90, 70],
                    absence: [10, 50, 60, 90, 80, 90, 70]
                }
            },
            {
                title: {
                    text: '全区学生考勤数据'
                },
                series: {
                    late: [100, 110, 120, 130, 140, 150, 160],
                    leaveEarly: [50, 60, 70, 80, 90, 30, 50],
                    leaveLegal: [10, 50, 60, 90, 80, 90, 70],
                    absence: [10, 50, 60, 90, 80, 90, 70]
                }
            },
            {
                title: {
                    text: '全区学生德育数据'
                },
                series: [
                    {
                        data: [1248, 4810, 4728, 4586, 4170, 2979]
                    }
                ]
            }
        ]
    }
}

export default {
    name: 'Home',
    data () {
        return {
            shortData: null,
            timerShort: null,
            chartDataFirst: null
        }
    },
    created: function () {
        this.shortData = MOCK_DATA.shortData
        // 准备 '简要数据'
        this.updateShortDate()
    },
    mounted: function () {
        // if (this.MIXIN_AUTO_PLAY) {
        //     this.timerShort = setInterval(() => {
        //         this.updateShortDate()
        //     }, 3000)
        // }
        // 学校数量, 教师人数, 学生人数
        this.genarateFirstLineChart()
        // 全区考试次数数据(小学, 初中, 高中)
        this.genarateSecondLineChart()
        // 全区考勤数据(教师, 学生) 和 全区学生德育.
        this.genarateThirdLineChart()
    },
    beforeDestroy: function () {
        // clearInterval(this.timerShort)
    },
    methods: {
        /**
         * 更新 简要数据.
         */
        updateShortDate: function () {
            let tempLine = null
            let tempItem = null
            let lineKey = ''
            for (lineKey in this.shortData) {
                tempLine = this.shortData[lineKey]
                for (let i = 0, len = tempLine.length; i < len; i++) {
                    tempItem = tempLine[i]
                    tempItem.val = _.random(tempItem.min, tempItem.max)
                }
            }
        },
        /**
         * 生成 echart(第一行) 图像,(学校数量, 教师人数, 学生人数).
         *
         */
        genarateFirstLineChart: function () {
            let colorPrimary = COLOR_LIST.colorPrimary // 小学
            let colorMid = COLOR_LIST.colorMid // 初中
            let colorHighMid = COLOR_LIST.colorHighMid // 高中
            let chartFirstLine = MOCK_DATA.chartData.first

            let dataOpt = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    boundaryGap: false,
                    data: ['2012', '2013', '2014', '2015', '2016', '2017']
                },
                legend: {
                    right: 10,
                    data: ['小学', '初中', '高中']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {},
                series: [
                    {
                        name: '小学',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'liner',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.6,
                                colorStops: [
                                    { offset: 0, color: colorPrimary },
                                    { offset: 1, color: '#ffffff' }
                                ]
                            },
                            origin: 'start',
                            shadowBlue: 20,
                            opacity: 0.5
                        },
                        lineStyle: {
                            color: colorPrimary
                        },
                        itemStyle: {
                            color: colorPrimary,
                            borderWidth: 2
                        },
                        smooth: true
                    },
                    {
                        name: '初中',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'liner',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.6,
                                colorStops: [
                                    { offset: 0, color: colorMid },
                                    { offset: 1, color: '#ffffff' }
                                ]
                            },
                            origin: 'start',
                            shadowBlue: 20,
                            opacity: 0.5
                        },
                        lineStyle: {
                            color: colorMid
                        },
                        itemStyle: {
                            color: colorMid,
                            borderWidth: 2
                        },
                        smooth: true
                    },
                    {
                        name: '高中',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'liner',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.6,
                                colorStops: [
                                    { offset: 0, color: colorHighMid },
                                    { offset: 1, color: '#ffffff' }
                                ]
                            },
                            origin: 'start',
                            shadowBlue: 20,
                            opacity: 0.5
                        },
                        lineStyle: {
                            color: colorHighMid
                        },
                        itemStyle: {
                            color: colorHighMid,
                            borderWidth: 2
                        },
                        smooth: true
                    }
                ]
            }

            let tmpDataAry = []
            let tempSingleChart = null
            for (let i = 0, len = chartFirstLine.length; i < len; i++) {
                tempSingleChart = chartFirstLine[i]
                let tempSingleLineData = dataOpt
                tempSingleLineData.title.text = tempSingleChart.title.text
                for (
                    let j = 0, jlen = tempSingleChart.series.length;
                    j < jlen;
                    j++
                ) {
                    tempSingleLineData.series[j].data =
                        tempSingleChart.series[j].data
                }
                // console.log('dataOpt --1:\n' + JSON.stringify(dataOpt))
                // console.log('tempSingleLineData --2:\n' + JSON.stringify(tempSingleLineData))
                tmpDataAry.push(langObj.cloneDeep(tempSingleLineData))
            }
            echarts
                .init(document.getElementById('first_chart_1'))
                .setOption(tmpDataAry[0])
            echarts
                .init(document.getElementById('first_chart_2'))
                .setOption(tmpDataAry[1])
            echarts
                .init(document.getElementById('first_chart_3'))
                .setOption(tmpDataAry[2])
        },
        /**
         * 生成 echart(第二行) 图像,(全区考试次数数据(小学, 初中, 高中)).
         *
         */
        genarateSecondLineChart: function () {
            let colorPrimary = COLOR_LIST.colorPrimary // 小学
            let colorMid = COLOR_LIST.colorMid // 初中
            let colorHighMid = COLOR_LIST.colorHighMid // 高中
            let chartSecondLine = MOCK_DATA.chartData.second

            let dataOpt = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    boundaryGap: false,
                    data: ['2012', '2013', '2014', '2015', '2016', '2017']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {},
                series: [
                    {
                        type: 'line',
                        areaStyle: {
                            color: '',
                            origin: 'start',
                            shadowBlue: 20,
                            opacity: 0.5
                        },
                        lineStyle: {
                            color: ''
                        },
                        itemStyle: {
                            color: '',
                            borderWidth: 2
                        },
                        smooth: false
                    }
                ]
            }

            let tmpDataAry = []
            let tempSingleChart = null
            let tempSingleData = null
            let tmpColorAry = [colorPrimary, colorMid, colorHighMid]
            for (let i = 0, len = chartSecondLine.length; i < len; i++) {
                tempSingleChart = chartSecondLine[i]
                let tempSingleLineData = dataOpt
                tempSingleLineData.title.text = tempSingleChart.title.text
                for (
                    let j = 0, jlen = tempSingleChart.series.length;
                    j < jlen;
                    j++
                ) {
                    tempSingleData = tempSingleLineData.series[j]
                    tempSingleData.data = tempSingleChart.series[j].data
                    tempSingleData.areaStyle.color = {type: 'liner', x: 0, y: 1, x2: 1, y2: 0, colorStops: []}
                    tempSingleData.areaStyle.color.colorStops.push({offset: 0, color: tmpColorAry[i]})
                    tempSingleData.areaStyle.color.colorStops.push({offset: 1, color: '#ffffff'})
                    // tempSingleData.areaStyle.color = tmpColorAry[i]

                    tempSingleData.lineStyle.color = tmpColorAry[i]
                    tempSingleData.itemStyle.color = tmpColorAry[i]
                }
                tmpDataAry.push(langObj.cloneDeep(tempSingleLineData))
            }
            echarts
                .init(document.getElementById('second_chart_1'))
                .setOption(tmpDataAry[0])
            echarts
                .init(document.getElementById('second_chart_2'))
                .setOption(tmpDataAry[1])
            echarts
                .init(document.getElementById('second_chart_3'))
                .setOption(tmpDataAry[2])
        },
        /**
         * 生成 echart(第三行) 图像, 全区考勤数据(教师, 学生) 和 全区学生德育.
         *
         */
        genarateThirdLineChart: function () {
            // let colorPrimary = COLOR_LIST.colorPrimary // 小学
            // let colorMid = COLOR_LIST.colorMid // 初中
            // let colorHighMid = COLOR_LIST.colorHighMid // 高中

            let chartThridLine = MOCK_DATA.chartData.thrid

            let barData = this.getDataChartBar(chartThridLine)
            echarts.init(document.getElementById('third_chart_1')).setOption(barData[0])
            echarts.init(document.getElementById('third_chart_2')).setOption(barData[1])

            let radarData = this.getDataChartRadar(chartThridLine)
            echarts.init(document.getElementById('third_chart_3')).setOption(radarData)
        },
        /**
         * 获取 柱形图(bar)数据.
         *
         * @param {array} dataSource 数据源, 注: 前俩元素为bar可用.
         *
         * @return {array} barData
         */
        getDataChartBar: function (dataSource) {
            let colorLate = COLOR_LIST.colorPrimary // 小学
            let colorLeaveEarly = COLOR_LIST.colorMid // 初中
            let colorLeaveLegal = COLOR_LIST.colorHighMid // 高中
            let colorAbsence = COLOR_LIST.colorAbsence // 高中

            let TEMP_KEY_COVER = {
                0: 'late',
                1: 'leaveEarly',
                2: 'leaveLegal',
                3: 'absence'
            }
            let barData = []
            let dataOpt = {
                color: [
                    colorLate,
                    colorLeaveEarly,
                    colorLeaveLegal,
                    colorAbsence
                ],
                grid: {
                    bottom: '10%'
                },
                title: {
                    text: ''
                },
                legend: {
                    itemWidth: 15,
                    right: 10,
                    data: ['迟到', '早退', '请假', '缺勤']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '迟到',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '早退',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '请假',
                        type: 'bar',
                        data: []
                    },
                    {
                        name: '缺勤',
                        type: 'bar',
                        data: []
                    }
                ]
            }

            let tempData = {}
            let tempSourceItem = null
            tempData = { ...dataOpt }
            // 前俩元素为bar可用.
            for (let i = 0, len = 2; i < len; i++) {
                tempData = { ...dataOpt }
                tempSourceItem = dataSource[i]
                tempData.title.text = tempSourceItem.title.text
                for (let j = 0, jlen = 4; j < jlen; j++) {
                    // 维度: 迟到, 早退, 请假, 缺勤
                    // tempData.series[j].data = tempSourceItem.series['late']
                    tempData.series[j].data =
                        tempSourceItem.series[TEMP_KEY_COVER[j]]
                }
                barData.push(langObj.cloneDeep(tempData))
            }
            return barData
        },
        /**
         * 获取 雷达(bar)数据.
         *
         * @return {array} radarData
         */
        getDataChartRadar: function (dataSource) {
            let colorPrimary = COLOR_LIST.colorPrimary // 小学
            let colorMid = COLOR_LIST.colorMid // 初中
            let colorHighMid = COLOR_LIST.colorHighMid // 高中

            let tempData = dataSource[2]
            let radarData = null
            let dataOpt = {
                color: [
                    colorPrimary,
                    colorMid,
                    colorHighMid
                ],
                grid: {
                    bottom: 10
                },
                title: {
                    text: tempData.title.text
                },
                tooltip: {},
                legend: {
                    itemWidth: 15,
                    top: '5%',
                    right: 10,
                    data: ['小学', '初中', '高中']
                },
                radar: {
                    name: {
                        textStyle: {
                            color: '#333333'
                        }
                    },
                    indicator: [
                        { name: '考勤', max: 100 },
                        { name: '卫生', max: 100 },
                        { name: '集队', max: 100 },
                        { name: '入校情况', max: 100 },
                        { name: '课间纪律', max: 100 }
                    ]
                },
                series: [
                    {
                        name: '',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [
                                    90,
                                    80,
                                    70,
                                    60,
                                    80
                                ],
                                name: '小学'
                            },
                            {
                                value: [
                                    80,
                                    60,
                                    90,
                                    70,
                                    60
                                ],
                                name: '初中'
                            },
                            {
                                value: [
                                    60,
                                    70,
                                    80,
                                    60,
                                    80
                                ],
                                name: '高中'
                            }
                        ]
                    }
                ]
            }

            radarData = dataOpt
            return radarData
            // echarts.init(document.getElementById('third_chart_3')).setOption(dataOpt)
        }
    },
    components: {
        'dz-header': DzHeader
    },
    computed: {
        pageShortData: function () {
            // 过滤数据--单位转换, 如: R -> 人, C -> 次;
            // {{UNIT_LBL[shortItem.unit]}}
            let tempLine = null
            let tempItem = null
            let lineKey = ''
            for (lineKey in this.shortData) {
                tempLine = this.shortData[lineKey]
                for (let i = 0, len = tempLine.length; i < len; i++) {
                    tempItem = tempLine[i]
                    tempItem['unitTxt'] = UNIT_LBL[tempItem.unit]
                }
            }
            return this.shortData
        }
    }
}
</script>

<style lang="less">
.overview {
    position: relative;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;

    .data-line {
        position: relative;
        width: 100%;
        height: 100px;
        margin-bottom: 20px;
        box-sizing: border-box;

        &:last-child {
            margin-bottom: 0px;
        }
    }
    .short-line {
        height: 100px;
        .item {
            position: relative;
            float: left;
            width: 24%;
            height: 100%;
            margin-right: 1%;
            box-sizing: border-box;
            overflow: hidden;
            background-color: #ffffff;
            cursor: pointer;
            /*border: 1px solid #000000;*/
            p {
                height: 50px;
                line-height: 50px;
            }
            .val {
                line-height: 30px;
                font-size: 10px;
            }
            .num {
                font-size: 25px;
            }
            &:last-child {
                margin-right: 0px;
            }
            &:hover {
                /*background-color: lightblue;*/
                /*transition: background-color 1s;*/
                font-weight: 800;
            }
        }

        &:nth-child(4) {
            .item {
                width: 18%;
                margin-right: 2%;
            }
        }

        .c_blue {
            color: #2196f3;
        }
        .c_green {
            color: #00d491;
        }
        .c_pink {
            color: #f79aab;
        }
        .c_warn {
            color: #ffc107;
        }
        .c_purple {
            color: #c630e0;
        }
    }

    .chart-data {
        margin-top: 30px;
    }

    .chart-line {
        height: 220px;
        .item {
            position: relative;
            float: left;
            width: 30%;
            height: 100%;
            margin-right: 4%;
            box-sizing: border-box;
            overflow: hidden;
            background-color: #ffffff;

            &:last-child {
                margin-right: 0px;
            }
        }
    }
}
</style>
