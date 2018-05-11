<template>
    <div class="analysis-student-info">
        <div class="analysis-student-content fn-clear">
            <div class="student-title-table fn-left">
                <div class="tab-list" v-for="(item,index) in tableList" :key="item.id" @click="changeTable(item.id, index)" :class="activeIndex == index?'active':''">{{item.name}}</div>
            </div>
            <div class="student-static-wrapper fn-left">
                <div class="static-breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>学生信息</el-breadcrumb-item>
                        <el-breadcrumb-item>统计维度</el-breadcrumb-item>
                        <el-breadcrumb-item>{{tableList[activeIndex].name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="static-wrapper">
                    <!-- 班级数量 -->
                    <div id="classNumber" v-show="activeIndex==0"></div>
                    <!-- 在校人数 -->
                    <div id="studentNumber" v-show="activeIndex==1"></div>
                    <!-- 入校人数 -->
                    <div id="enterNumber" v-show="activeIndex==2"></div>
                    <!-- 毕业人数 -->
                    <div id="graduatesNumber" v-show="activeIndex==3"></div>
                    <!-- 新增学生数 -->
                    <div id="newStudent" v-show="activeIndex==4"></div>
                    <!-- 退学人数 -->
                    <div id="dropoutsNumber" v-show="activeIndex==5"></div>
                    <!-- 招生人数 -->
                    <div id="enrollment" v-show="activeIndex==6"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * '学生信息'页面.
     * @author dz-tangpeng-20180505
     */
    import DzHeader from '@/components/DzHeader/DzHeader'
//    import _ from 'lodash/number'
    // 用户点击二级导航栏之后判断是否继续自动播放的秒数
    const ACTIVE_TOTAL_NUMBER = 240
    export default {
        components: {DzHeader},
        name: 'studentInfoStatic',
        data () {
            return {
                tableList: [{name: '班级数量', id: 1}, {name: '在校人数', id: 2}, {name: '入校人数', id: 3}, {name: '毕业人数', id: 4}, {name: '新增学生数', id: 5}, {name: '退休学人数', id: 6}, {name: '招生人数', id: 7}],
                activeIndex: 0,
                timerShort: null,
                navTime: null,
                activeNumber: 0,
                numInterVal: null
            }
        },
        created () {
            this.activeIndex = this.$route.query.type || 0
            this.changeCharts(this.activeIndex)
        },
        mounted () {
            this.tabsInterVal()
        },
        watch: {
            // 监听用户点击之后多少秒
            activeNumber (newVal) {
                if (newVal === ACTIVE_TOTAL_NUMBER) {
                    clearInterval(this.numInterVal)
                    this.tabsInterVal()
                    this.openAutoPlayMixin()
                }
            }
        },
        methods: {
            // 改变索引
            changeTable (id, index) {
                this.activeIndex = index
                this.$router.push({name: 'studentInfoStatic', query: {type: index}})
                this.changeCharts(index)
                // 清除定时器
                clearInterval(this.navTime)
                clearInterval(this.numInterVal)
                this.closeAutoPlayMixin()
                // 用于判断用户在点击多久
                this.activeNumber = 0
                 this.numInterVal = setInterval(() => {
                    this.activeNumber++
                }, 1000)
            },
            // 定时器
            tabsInterVal () {
                this.navTime = setInterval(() => {
                    if (this.activeIndex < 6) {
                        this.activeIndex++
                    } else {
                        this.activeIndex = 0
                    }
                    this.changeCharts(this.activeIndex)
                }, 21000)
            },
            // 根据索引来切换图形引入
            changeCharts (index) {
                setTimeout(() => {
                    switch (parseInt(index)) {
                        case 0:
                            this.classNumberChart()
                            break
                        case 1:
                            this.studentNumberChart()
                            break
                        case 2:
                            this.enterNumberChart()
                            break
                        case 3:
                            this.graduatesNumberChart()
                            break
                        case 4:
                            this.newStudentChart()
                            break
                        case 5:
                            this.dropoutsNumberChart()
                            break
                        case 6:
                            this.enrollmentChart()
                            break
                    }
                }, 300)
            },
            // 处理动态渲染数据
            dataFormatter (obj) {
                var pList = ['幼儿园', '小学', '初中', '高中']
                var temp
                for (var year = 2012; year <= 2018; year++) {
                    var max = 0
                    var sum = 0
                    temp = obj[year]
                    for (var i = 0, l = temp.length; i < l; i++) {
                        max = Math.max(max, temp[i])
                        sum += temp[i]
                        obj[year][i] = {
                            name: pList[i],
                            value: temp[i]
                        }
                    }
                    obj[year + 'max'] = Math.floor(max / 100) * 100
                    obj[year + 'sum'] = sum
                }
                return obj
            },
            /**
             * 动态跟新图的数据处理
             * @param {Array} titleArr 每年分的标题
             * @param {object} data 每年分的数据
             * @param {String} str 判断是否需要Y轴显示单位为（个）
             */
            changeDynamicalChart (titleArr, data, str) {
                let dataMap = {}
                let unit = '单位(万)'
                if (str === 'ge') {
                    unit = '单位(个)'
                }
                dataMap.dataList = this.dataFormatter(data)
                let option = {
                    baseOption: {
                        timeline: {
                            // y: 0,
                            axisType: 'category',
                            // realtime: false,
                            // loop: false,
                            autoPlay: true,
                            // currentIndex: 2,
                            playInterval: 3000,
                            // controlStyle: {
                            //     position: 'left'
                            // },
                            data: [
                                '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01'
                            ],
                            label: {
                                formatter: function (s) {
                                    return (new Date(s)).getFullYear()
                                }
                            }
                        },
                        tooltip: {},
                        calculable: true,
                        grid: {
                            top: 80,
                            bottom: 100
                        },
                        xAxis: [
                            {
                                'type': 'category',
                                'axisLabel': {'interval': 0},
                                'data': [
                                    '幼儿园', '小学', '初中', '高中', '其他'
                                ],
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: unit
                            }
                        ],
                        series: [
                            {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            var colorList = ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59']
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            },
                            {
                                type: 'pie',
                                center: ['75%', '27%'],
                                radius: '28%'
                            }
                        ]
                    },
                    options: [
                        {
                            title: {text: titleArr[0]},
                            series: [
                                {data: dataMap.dataList['2012']},
                                {
                                    color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59'],
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: '{b} : {c} ({d}%)'
                                    },
                                    data: [
                                        {name: '幼儿园', value: dataMap.dataList['2012'][0].value},
                                        {name: '小学', value: dataMap.dataList['2012'][1].value},
                                        {name: '初中', value: dataMap.dataList['2012'][2].value},
                                        {name: '高中', value: dataMap.dataList['2012'][3].value},
                                        {name: '其他', value: dataMap.dataList['2012'][4].value}
                                    ]}
                            ]
                        },
                        {
                            title: {text: titleArr[1]},
                            series: [
                                {data: dataMap.dataList['2013']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2013'][0].value},
                                    {name: '小学', value: dataMap.dataList['2013'][1].value},
                                    {name: '初中', value: dataMap.dataList['2013'][2].value},
                                    {name: '高中', value: dataMap.dataList['2013'][3].value},
                                    {name: '其他', value: dataMap.dataList['2013'][4].value}
                                ]}
                            ]
                        },
                        {
                            title: {text: titleArr[2]},
                            series: [
                                {data: dataMap.dataList['2014']},
                                // {data: dataMap.dataBoy['2012']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2014'][0].value},
                                    {name: '小学', value: dataMap.dataList['2014'][1].value},
                                    {name: '初中', value: dataMap.dataList['2014'][2].value},
                                    {name: '高中', value: dataMap.dataList['2014'][3].value},
                                    {name: '其他', value: dataMap.dataList['2014'][4].value}
                                ]}
                            ]
                        },
                        {
                            title: {text: titleArr[3]},
                            series: [
                                {data: dataMap.dataList['2015']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2015'][0].value},
                                    {name: '小学', value: dataMap.dataList['2015'][1].value},
                                    {name: '初中', value: dataMap.dataList['2015'][2].value},
                                    {name: '高中', value: dataMap.dataList['2015'][3].value},
                                    {name: '其他', value: dataMap.dataList['2015'][4].value}
                                ]}
                            ]
                        },
                        {
                            title: {text: titleArr[4]},
                            series: [
                                {data: dataMap.dataList['2016']},
                                // {data: dataMap.dataBoy['2014']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2016'][0].value},
                                    {name: '小学', value: dataMap.dataList['2016'][1].value},
                                    {name: '初中', value: dataMap.dataList['2016'][2].value},
                                    {name: '高中', value: dataMap.dataList['2016'][3].value},
                                    {name: '其他', value: dataMap.dataList['2016'][4].value}
                                ]}
                            ]
                        },
                        {
                            title: {text: titleArr[5]},
                            series: [
                                {data: dataMap.dataList['2017']},
                                // {data: dataMap.dataBoy['2015']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2017'][0].value},
                                    {name: '小学', value: dataMap.dataList['2017'][1].value},
                                    {name: '初中', value: dataMap.dataList['2017'][2].value},
                                    {name: '高中', value: dataMap.dataList['2017'][3].value},
                                    {name: '其他', value: dataMap.dataList['2017'][4].value}
                                ]}
                            ]
                        },
                        {
                            title: {text: titleArr[6]},
                            series: [
                                {data: dataMap.dataList['2018']},
                                // {data: dataMap.dataBoy['2015']},
                                {data: [
                                    {name: '幼儿园', value: dataMap.dataList['2018'][0].value},
                                    {name: '小学', value: dataMap.dataList['2018'][1].value},
                                    {name: '初中', value: dataMap.dataList['2018'][2].value},
                                    {name: '高中', value: dataMap.dataList['2018'][3].value},
                                    {name: '其他', value: dataMap.dataList['2018'][4].value}
                                ]}
                            ]
                        }
                    ]
                }
                return option
            },
            /**
             * 毕业人数 新增 退休学 折线圆形图
             * @param {Array} data 每年的数据
             */
            polylineChart (data) {
                let options = {
                    color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59'],
                    title: [{
                        text: '2012-2018毕业人数统计',
                        left: '1%'
                    }, {
                        text: '2018年毕业人数占比',
                        left: '83%',
                        top: '6%',
                        textAlign: 'center'
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 150,
                        top: '7%',
                        data: ['幼儿园', '小学', '初中', '高中', '其他']
                    },
                    grid: {
                        left: '1%',
                        right: '35%',
                        top: '16%',
                        bottom: '6%',
                        containLabel: true
                    },
                    toolbox: {
                        'show': false,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        'axisTick': {
                            'show': false
                        },
                        boundaryGap: false,
                        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    yAxis: {
                        splitLine: {
                            show: true
                        },
                        'axisTick': {
                            'show': false
                        },
                        type: 'value',
                        name: '单位(万)'
                    },
                    series: [{
                        name: '幼儿园',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#fe755f',
                        data: data[0]
                    }, {
                        name: '小学',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#845ffe',
                        data: data[1]
                    }, {
                        name: '初中',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#13c0aa',
                        data: data[2]
                    }, {
                        name: '高中',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#fe68b4',
                        data: data[3]
                    }, {
                        name: '其他',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        color: '#fccf59',
                        data: data[4]
                    },
                        {
                            type: 'pie',
                            center: ['83%', '33%'],
                            radius: ['25%', '30%'],
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}: {c} ({d}%)'
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: data[0][6], name: '幼儿园'},
                                {value: data[1][6], name: '小学'},
                                {value: data[2][6], name: '初中'},
                                {value: data[3][6], name: '高中'},
                                {value: data[4][6], name: '其他'}
                            ]
                        }

                    ]
                }
                return options
            },
            // 班级数量图形
            classNumberChart () {
                let myChart = this.$echarts.init(document.getElementById('classNumber'))
                let titleArr = ['2012年班级数量统计', '2013年班级数量统计', '2014年班级数量统计', '2015年班级数量统计', '2016年班级数量统计', '2017年班级数量统计', '2018年班级数量统计']
                let data = {
                    2018: [33054, 44593, 25468, 14296, 392],
                    2017: [28333, 46627, 21467, 13484, 378],
                    2016: [32667, 46073, 21342, 13849, 291],
                    2015: [30333, 45204, 21764, 14398, 347],
                    2014: [27333, 44202, 22613, 14698, 309],
                    2013: [29333, 43182, 24162, 14660, 313],
                    2012: [32000, 43440, 26449, 14416, 358]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data, 'ge'))
            },
            // 在校人数图形
            studentNumberChart () {
                let myChart = this.$echarts.init(document.getElementById('studentNumber'))
                let titleArr = ['2012年在校学生数量统计', '2013年在校学生数量统计', '2014年在校学生数量统计', '2015年在校学生数量统计', '2016年在校学生数量统计', '2017年在校学生数量统计', '2018年在校学生数量统计']
                let data = {
                    2018: [90, 210.33, 100.1, 69.64, 1.8],
                    2017: [85, 209.82, 96.6, 60.68, 1.7],
                    2016: [98, 207.33, 96.04, 62.32, 1.31],
                    2015: [91, 203.42, 97.94, 64.79, 1.56],
                    2014: [82, 198.91, 101.76, 66.14, 1.39],
                    2013: [88, 194.32, 108.73, 65.97, 1.41],
                    2012: [96, 195.48, 119.02, 64.87, 1.61]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data))
            },
            // 入校人数图形
            enterNumberChart () {
                let myChart = this.$echarts.init(document.getElementById('enterNumber'))
                let titleArr = ['2012年入校学生数量统计', '2013年入校学生数量统计', '2014年入校学生数量统计', '2015年入校学生数量统计', '2016年入校学生数量统计', '2017年入校学生数量统计', '2018年入校学生数量统计']
                let data = {
                    2018: [41, 33.60, 32.30, 20.02, 0.26],
                    2017: [42, 33.46, 33.0700, 19.96, 0.25],
                    2016: [43, 33.45, 31.51, 19.85, 0.28],
                    2015: [42, 33.45, 32.38, 19.85, 0.28],
                    2014: [40, 33.45, 32.92, 19.85, 0.28],
                    2013: [42, 33.45, 33.93, 19.85, 0.28],
                    2012: [43, 33.45, 37.11, 19.85, 0.28]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data))
            },
            // 毕业人数图形
            graduatesNumberChart () {
                let myChart = this.$echarts.init(document.getElementById('graduatesNumber'))
                let data = [
                    [24.0, 22.0, 20.5, 22.8, 24.5, 21.3, 22.4],
                    [32.6, 32.4, 33.2, 33.9, 30.7, 32.2, 32.6],
                    [42.9, 40.3, 37.8, 34.8, 32.0, 32.2, 32.7],
                    [19.85, 19.85, 19.85, 19.85, 19.85, 19.96, 20.02],
                    [0.28, 0.28, 0.28, 0.28, 0.28, 0.25, 0.31]
                ]
                myChart.setOption(this.polylineChart(data))
            },
            // 新增学生数图形
            newStudentChart () {
                let myChart = this.$echarts.init(document.getElementById('newStudent'))
                let data = [
                    [0, 8, 6, -9, -7, 13, 16],
                    [0, 1.16, -4.59, -4.51, -3.91, 2.49, 4.2],
                    [0, 10.29, 6.97, 3.82, 1.9, 0.56, 3.2],
                    [0, -1.1, -0.17, 1.35, 2.47, 1.64, 3.2],
                    [0, 0.2, 0.02, -0.17, 0.25, 0.39, 0.2]
                ]
                myChart.setOption(this.polylineChart(data))
            },
            // 退休学人数图形
            dropoutsNumberChart () {
                let myChart = this.$echarts.init(document.getElementById('dropoutsNumber'))
                let data = [
                    [0.29, 0.26, 0.25, 0.27, 0.29, 0.26, 0.3],
                    [0.59, 0.58, 0.60, 0.61, 0.62, 0.63, 0.65],
                    [0.36, 0.33, 0.31, 0.29, 0.29, 0.29, 0.33],
                    [0.19, 0.20, 0.20, 0.19, 0.19, 0.18, 0.23],
                    [0.00, 0.00, 0.00, 0.00, 0.00, 0.01, 0.02]
                ]
                myChart.setOption(this.polylineChart(data))
            },
            // 招生人数图形
            enrollmentChart () {
                let myChart = this.$echarts.init(document.getElementById('enrollment'))
                myChart.setOption({
                    color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: [{
                        text: '2012-2018招生人数统计',
                        left: '1%'
                    }, {
                        text: '2018招生学生数占比',
                        left: '83%',
                        top: '6%',
                        textAlign: 'center'
                    }],
                    legend: {
                        data: ['幼儿园', '小学', '初中', '高中', '其他']
                    },
                    grid: {
                        left: '1%',
                        right: '35%',
                        top: '16%',
                        bottom: '6%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        name: '单位(万)'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    series: [{
                        name: '幼儿园',
                        type: 'bar',
                        stack: '总量',
                        color: '#fe755f',
                        data: [43.25, 38.75, 49.25, 40.75, 37.50, 38.50, 40.2]
                    },
                        {
                            name: '小学',
                            type: 'bar',
                            stack: '总量',
                            color: '#845ffe',
                            data: [33.87, 35.21, 37.57, 36.07, 33.45, 33.46, 36.32]
                        },
                        {
                            name: '初中',
                            type: 'bar',
                            stack: '总量',
                            color: '#13c0aa',
                            data: [37.21, 34.03, 33.02, 32.48, 31.61, 33.17, 35.69]
                        },
                        {
                            name: '高中',
                            type: 'bar',
                            stack: '总量',
                            color: '#fe68b4',
                            data: [22.67, 22.51, 22.1, 20.96, 19.86, 19.97, 23.21]
                        },
                        {
                            name: '其他',
                            type: 'bar',
                            stack: '总量',
                            color: '#fccf59',
                            data: [0.35, 0.21, 0.33, 0.26, 0.25, 0.29, 0.41]
                        },
                        {
                            type: 'pie',
                            center: ['83%', '53%'],
                            radius: ['25%', '39%'],
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}: {c} ({d}%)'
                            },
                            data: [{
                                value: 40.2,
                                name: '幼儿园'
                            },
                                {
                                    value: 36.32,
                                    name: '小学'
                                },
                                {
                                    value: 35.69,
                                    name: '初中'
                                },
                                {
                                    value: 23.21,
                                    name: '高中'
                                },
                                {
                                    value: 0.41,
                                    name: '其他'
                                }
                            ]
                        }
                    ]
                })
            }
        },
        beforeDestroy: function () {
            clearInterval(this.timerShort)
            clearInterval(this.navTime)
        }
    }
</script>

<style lang="less">
    .analysis-student-info{
        width: 100%;
        background-color: #fff;
        .dz-header-wrapper  .dz-content-wrapper{
            padding: 0;
        }
        .analysis-student-content{
            padding:35px 0 100px;
            .student-title-table{
                width: 275px;
                .tab-list{
                    width: 100%;
                    height:57px;
                    line-height: 57px;
                    text-align: left;
                    font-size: 16px;
                    color: #2b2d30;
                    cursor: pointer;
                    padding-left: 40px;
                    box-sizing: border-box;
                    border-right: 2px solid #ededed;
                    &:hover{
                        color: #3c90ff;
                    }
                    &.active{
                        color: #3c90ff;
                        background-color:#e2eeff ;
                        border-color: #3c90ff;
                        transition: all .3s;
                    }
                }
            }
            .student-static-wrapper{
                width:calc(100% - 275px);
                box-sizing: border-box;
                padding: 0 50px;
                .static-breadcrumb{
                    border-bottom: 1px solid #ededed;
                    .el-breadcrumb{
                        height: 50px;
                        line-height: 50px;
                    }
                }
                .static-wrapper{
                    margin-top: 20px;
                    width: 100%;
                    height: 600px;
                    box-shadow:  0 0 10px rgba(0,0,0,.1);
                    padding: 50px;
                    box-sizing: border-box;
                    &>div{
                        width:100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
