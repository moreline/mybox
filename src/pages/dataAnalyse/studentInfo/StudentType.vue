<template>
    <div class="analysis-student-type">
        <div class="analysis-student-content fn-clear">
            <div class="student-title-table fn-left">
                <div class="tab-list" v-for="(item,index) in tableList" :key="item.id" @click="changeTable(item.id, index)" :class="activeIndex == index?'active':''">{{item.name}}</div>
            </div>
            <div class="student-static-wrapper fn-left">
                <div class="static-breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>学生信息</el-breadcrumb-item>
                        <el-breadcrumb-item>属性维度</el-breadcrumb-item>
                        <el-breadcrumb-item>{{tableList[activeIndex].name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="static-wrapper">
                    <!-- 政治面貌 -->
                    <div id="politicalStatus" v-show="activeIndex==0"></div>
                    <!-- 性别 -->
                    <div class="static-sex-wrapper" v-show="activeIndex==1">
                        <div id="sex"></div>
                        <div id="sex2"></div>
                    </div>
                    <!-- 年龄 -->
                    <div id="age" v-show="activeIndex==2"></div>
                    <!-- 残疾人 -->
                    <div id="disabledPeople" v-show="activeIndex==3"></div>
                    <!-- 随迁数量 -->
                    <div id="relocationNumber" v-show="activeIndex==4"></div>
                    <!-- 留守儿童 -->
                    <div id="leftChildren" v-show="activeIndex==5"></div>
                    <!-- 华侨 -->
                    <div id="overseasChinese" v-show="activeIndex==6"></div>
                    <!-- 港澳台 -->
                    <div id="hongKongMaCaoTaiWan" v-show="activeIndex==7"></div>
                    <!-- 外籍 -->
                    <div id="foreignNationality" v-show="activeIndex==8"></div>
                    <!-- 寄宿生 -->
                    <div id="boarder" v-show="activeIndex==9"></div>
                    <!-- 独生子女 -->
                    <div id="onlyChild" v-show="activeIndex==10"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    /**
     * '学生属性'页面.
     * @author dz-tangpeng-20180505
     */
    import DzHeader from '@/components/DzHeader/DzHeader'
//    import _ from 'lodash/number'
    // 用户点击二级导航栏之后判断是否继续自动播放的秒数
    const ACTIVE_TOTAL_NUMBER = 240
    export default {
        components: {DzHeader},
        name: 'studentTypeStatic',
        data () {
            return {
                tableList: [
                    {name: '政治面貌', id: 1},
                    {name: '性别', id: 2},
                    {name: '年龄', id: 3},
                    {name: '残疾人', id: 4},
                    {name: '随迁数量', id: 5},
                    {name: '留守儿童', id: 6},
                    {name: '华侨', id: 7},
                    {name: '港澳台', id: 8},
                    {name: '外籍', id: 9},
                    {name: '寄宿生', id: 10},
                    {name: '独生子女', id: 11}
                    ],
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
            // 切换二级菜单
            changeTable (id, index) {
                this.activeIndex = index
                this.$router.push({name: 'studentTypeStatic', query: {type: index}})
                this.changeCharts(this.activeIndex)
                // 改变索引时，清除定时器再启动
                clearInterval(this.navTime)
                clearInterval(this.numInterVal)
                this.closeAutoPlayMixin()
                // 用于判断用户点击之后时间
                this.activeNumber = 0
                this.numInterVal = setInterval(() => {
                    this.activeNumber++
                }, 1000)
            },
            // 定时器
            tabsInterVal () {
                this.navTime = setInterval(() => {
                    if (this.activeIndex < 10) {
                        this.activeIndex++
                    } else {
                        this.activeIndex = 0
                    }
                    this.changeCharts(this.activeIndex)
                }, 21000)
            },
            changeCharts (index) {
                setTimeout(() => {
                    switch (parseInt(index)) {
                        case 0:
                            this.politicalStatusChart()
                            break
                        case 1:
                            this.sexChart()
                            this.sex2Chart()
                            break
                        case 2:
                            this.ageChart()
                            break
                        case 3:
                            this.disabledPeopleChar()
                            break
                        case 4:
                            this.relocationNumberChar()
                            break
                        case 5:
                            this.leftChildrenChart()
                            break
                        case 6:
                            this.overseasChineseChart()
                            break
                        case 7:
                            this.hongKongMaCaoTaiWanChart()
                            break
                        case 8:
                            this.foreignNationalityChart()
                            break
                        case 9:
                            this.boarderChart()
                            break
                        case 10:
                            this.onlyChildChart()
                            break
                    }
                }, 300)
            },
            /**
             * 柱形圆形图 用于 残疾人 随迁数量
             * @param {Array} titleArr 两个图的title
             * @param {object} data 图表的数据
             */
            cylindricalCircle (titleArr, data) {
                let option = {
                    color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: [{
                        text: titleArr[0],
                        left: '1%'
                    }, {
                        text: titleArr[1],
                        left: '83%',
                        top: '6%',
                        textAlign: 'center'
                    }],
                    legend: {
                        data: ['幼儿园', '小学', '初中', '高中', '其他'],
                        left: '40%'
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
                        name: '单位(个)'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    series: [
                        {
                            name: '幼儿园',
                            type: 'bar',
                            stack: '总量',
                            color: '#fe755f',
                            data: [270, 270, 243, 249, 252, 233, 249]
                        },
                        {
                            name: '小学',
                            type: 'bar',
                            stack: '总量',
                            color: '#845ffe',
                            data: [586, 583, 597, 610, 622, 612, 629]
                        },
                        {
                            name: '初中',
                            type: 'bar',
                            stack: '总量',
                            color: '#13c0aa',
                            data: [357, 326, 305, 294, 288, 278, 290]
                        },
                        {
                            name: '高中',
                            type: 'bar',
                            stack: '总量',
                            color: '#fe68b4',
                            data: [195, 198, 198, 194, 187, 192, 182]
                        },
                        {
                            name: '其他',
                            type: 'bar',
                            stack: '总量',
                            color: '#fccf59',
                            data: [5, 4, 4, 5, 4, 3, 5]
                        },
                        {
                            type: 'pie',
                            center: ['83%', '53%'],
                            radius: ['25%', '39%'],
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}: {c} ({d}%) '
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
                return option
            },
            /**
             * 圆形折线 用于 留守儿童 华侨 港澳台
             * @param {Array} titleArr 两个图的title
             * @param {object} data 图表的数据
             */
            circularLine (title, data) {
                let option = {
                    color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59'],
                    legend: {
                        left: '40%'
                    },
                    title: {
                        'text': title
                    },
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: data
                    },
                    xAxis: {type: 'category'},
                    yAxis: {gridIndex: 0, name: '单位(万)'},
                    grid: {top: '55%'},
                    series: [
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '30%',
                            center: ['50%', '25%'],
                            label: {
                                formatter: '{b}: {@2012} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012',
                                tooltip: '2012'
                            }
                        }
                    ]
                }
                return option
            },
            /**
             * 动态跟新图的数据处理
             * @param {Array} titleArr 每年分的标题
             * @param {object} data 每年分的数据
             */
            changeDynamicalChart (titleArr, data) {
                let dataMap = {}
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
                                name: '单位(万)'
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
            // 政治面貌图形
            politicalStatusChart () {
                let myChart = this.$echarts.init(document.getElementById('politicalStatus'))
                myChart.setOption({
                    'title': {
                        'text': '2012-2018在校学生政治面貌统计',
                        x: '1%'
                    },
                    'tooltip': {
                        'trigger': 'axis',
                        'axisPointer': {
                            'type': 'shadow',
                            textStyle: {
                                color: '#fff'
                            }

                        }
                    },
                    'grid': {
                        'borderWidth': 0,
                        'top': 110,
                        'bottom': 95,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    'legend': {
                        x: '15%',
                        top: '11%',
                        textStyle: {
                            color: '#90979c'
                        },
                        'data': ['小学(少先队员)', '初中(共青团员)', '高中(共青团员)', '总数']
                    },

                    'calculable': true,
                    'xAxis': [{
                        'type': 'category',
                        'axisLine': {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        'splitLine': {
                            'show': false
                        },
                        'axisTick': {
                            'show': false
                        },
                        'splitArea': {
                            'show': false
                        },
                        'axisLabel': {
                            'interval': 0

                        },
                        'data': ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    }],
                    'yAxis': [{
                        'type': 'value',
                        name: '单位(万)',
                        'splitLine': {
                            'show': false
                        },
                        'axisLine': {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        'axisTick': {
                            'show': false
                        },
                        'axisLabel': {
                            'interval': 0

                        },
                        'splitArea': {
                            'show': false
                        }

                    }],
                    'dataZoom': [{
                        'show': true,
                        'height': 30,
                        'xAxisIndex': [
                            0
                        ],
                        bottom: 30,
                        'start': 0,
                        'end': 100,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'

                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'

                    }, {
                        'type': 'inside',
                        'show': true,
                        'height': 15,
                        'start': 1,
                        'end': 35
                    }],
                    'series': [{
                        'name': '小学(少先队员)',
                        'type': 'bar',
                        'stack': '总量',
                        'barMaxWidth': 35,
                        'barGap': '10%',
                        'itemStyle': {
                            'normal': {
                                'color': '#845ffe',
                                'label': {
                                    'show': true,
                                    'textStyle': {
                                        'color': '#fff'
                                    },
                                    'position': 'insideTop',
                                    formatter: function (p) {
                                        return p.value > 0 ? (p.value) : ''
                                    }
                                }
                            }
                        },
                        'data': [
                            96.97,
                            49.52,
                            87.39,
                            141.09,
                            171.78,
                            42.56,
                            132
                        ]
                    },

                        {
                            'name': '初中(共青团员)',
                            'type': 'bar',
                            'stack': '总量',
                            'barMaxWidth': 35,
                            'barGap': '10%',
                            'itemStyle': {
                                'normal': {
                                    'color': '#13c0aa',
                                    'label': {
                                        'show': true,
                                        'textStyle': {
                                            'color': '#fff'
                                        },
                                        'position': 'insideTop',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [
                                35.96,
                                29.54,
                                81.32,
                                85.70,
                                67.33,
                                58.18,
                                77.3
                            ]
                        }, {
                            'name': '高中(共青团员)',
                            'type': 'bar',
                            'stack': '总量',
                            'itemStyle': {
                                'normal': {
                                    'color': '#fe68b4',
                                    'barBorderRadius': 0,
                                    'label': {
                                        'show': true,
                                        'position': 'top',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [
                                56.23,
                                44.42,
                                0.11,
                                63.79,
                                23.68,
                                36.65,
                                49.5
                            ]
                        }, {
                            'name': '总数',
                            'type': 'line',
                            'stack': '总量',
                            symbolSize: 10,
                            symbol: 'circle',
                            'itemStyle': {
                                'normal': {
                                    'color': '#fccf59',
                                    'barBorderRadius': 0,
                                    'label': {
                                        'show': true,
                                        'position': 'top',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [
                                189.16,
                                123.48,
                                168.82,
                                290.58,
                                262.79,
                                137.39,
                                258.8
                            ]
                        }
                    ]
                })
            },
            // 性别图形
            sexChart () {
                let myChart = this.$echarts.init(document.getElementById('sex'))
                myChart.setOption({
                    'title': {
                        'text': '2012-2018在校学生性别统计',
                        x: '1%'
                    },
                    'tooltip': {
                        'trigger': 'axis',
                        'axisPointer': {
                            'type': 'shadow',
                            textStyle: {
                                color: '#fff'
                            }

                        }
                    },
                    'grid': {
                        'borderWidth': 0,
                        'top': 110,
                        'bottom': 95,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    'legend': {
                        x: '15%',
                        top: '11%',
                        textStyle: {
                            color: '#90979c'
                        },
                        'data': ['男', '女']
                    },
                    'calculable': true,
                    'xAxis': [{
                        'type': 'category',
                        'axisLine': {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        'splitLine': {
                            'show': false
                        },
                        'axisTick': {
                            'show': false
                        },
                        'splitArea': {
                            'show': false
                        },
                        'axisLabel': {
                            'interval': 0

                        },
                        'data': ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
                    }],
                    'yAxis': [{
                        'type': 'value',
                        name: '单位(万)',
                        'splitLine': {
                            'show': false
                        },
                        'axisLine': {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        'axisTick': {
                            'show': false
                        },
                        'axisLabel': {
                            'interval': 0

                        },
                        'splitArea': {
                            'show': false
                        }

                    }],
                    'dataZoom': [{
                        'show': true,
                        'height': 30,
                        'xAxisIndex': [
                            0
                        ],
                        bottom: 30,
                        'start': 0,
                        'end': 100,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'

                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'

                    }, {
                        'type': 'inside',
                        'show': true,
                        'height': 15,
                        'start': 1,
                        'end': 35
                    }],
                    'series': [
                        {
                            'name': '男',
                            'type': 'bar',
                            'stack': '总量',
                            'barMaxWidth': 35,
                            'barGap': '10%',
                            'itemStyle': {
                                'normal': {
                                    'color': '#fe755f',
                                    'label': {
                                        'show': true,
                                        'textStyle': {
                                            'color': '#fff'
                                        },
                                        'position': 'insideTop',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [
                                245.12,
                                238.83,
                                233.38,
                                233.8,
                                247.35,
                                251.02,
                                234.38
                            ]
                        },
                        {
                            'name': '女',
                            'type': 'bar',
                            'stack': '总量',
                            'itemStyle': {
                                'normal': {
                                    'color': '#fe68b4',
                                    'barBorderRadius': 0,
                                    'label': {
                                        'show': true,
                                        'position': 'top',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [
                                226.67,
                                221.6,
                                216.12,
                                216.88,
                                217.03,
                                223.31,
                                217.42
                            ]
                        }
                    ]
                })
            },
            // 性别图形2
            sex2Chart () {
                let myChart = this.$echarts.init(document.getElementById('sex2'))
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['男', '女']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        name: '单位(万)',
                        data: ['幼儿园', '小学', '初中', '高中', '其他']
                    },
                    series: [
                        {
                            name: '男',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            color: '#fe755f',
                            data: [42.33, 109.11, 50.23, 31.86, 14.7]
                        },
                        {
                            name: '女',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            color: '#fe68b4',
                            data: [40.67, 100.71, 46.37, 28.82, 14.5]
                        }
                    ]
                })
            },
            // 年龄图形
            ageChart () {
                let myChart = this.$echarts.init(document.getElementById('age'))
                myChart.setOption({
                        'title': {
                            'text': '2018年学生年龄统计',
                            x: '1%'
                        },
                        'tooltip': {
                            'trigger': 'item'
                        },
                        'grid': {
                            'borderWidth': 0,
                            'top': 110,
                            'bottom': 95
                        },
                        'legend': {
                            x: '4%',
                            top: '11%',
                            'data': ['女', '男', '平均']
                        },

                        'calculable': true,
                        'xAxis': [{
                            'type': 'category',
                            'splitLine': {
                                'show': false
                            },
                            'axisTick': {
                                'show': false
                            },
                            'splitArea': {
                                'show': false
                            },
                            'axisLabel': {
                                'interval': 0

                            },
                            'data': [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                        }],
                        'yAxis': [{
                            'type': 'value',
                            name: '单位(万)',
                            'splitLine': {
                                'show': false
                            },
                            'axisTick': {
                                'show': false
                            },
                            'axisLabel': {
                                'interval': 0

                            },
                            'splitArea': {
                                'show': false
                            }

                        }],
                        'dataZoom': [{
                            'show': true,
                            'height': 30,
                            'xAxisIndex': [
                                0
                            ],
                            bottom: 30,
                            'start': 0,
                            'end': 100,
                            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                            handleSize: '110%',
                            handleStyle: {
                                color: '#d3dee5'

                            },
                            textStyle: {
                                color: '#fff'},
                            borderColor: '#90979c'

                        }, {
                            'type': 'inside',
                            'show': true,
                            'height': 15,
                            'start': 1,
                            'end': 35
                        }],
                        'series': [{
                            'name': '年龄',
                            'type': 'line',
                            'stack': '年龄',
                            symbolSize: 10,
                            symbol: 'circle',
                            'itemStyle': {
                                'normal': {
                                    'color': 'rgba(252,230,48,1)',
                                    'barBorderRadius': 0,
                                    'label': {
                                        'show': true,
                                        'position': 'top',
                                        formatter: function (p) {
                                            return p.value > 0 ? (p.value) : ''
                                        }
                                    }
                                }
                            },
                            'data': [27.39, 27.39, 28.22, 29.37, 30.27, 29.08, 28.78, 30.57, 30.27, 29.08, 30.91, 30.27, 31.88, 19.82, 19.22, 18.81, 10.47]
                        }
                        ]
                    })
            },
            // 残疾人图形
            disabledPeopleChar () {
                let myChart = this.$echarts.init(document.getElementById('disabledPeople'))
                let titleArr = ['2012-2018残疾人数量统计', '2018年残疾人数量占比']
                let Data = [
                    [270, 270, 243, 249, 252, 233, 249],
                    [586, 583, 597, 610, 622, 612, 629],
                    [357, 326, 305, 294, 288, 278, 290],
                    [195, 198, 198, 194, 187, 192, 182],
                    [5, 4, 4, 5, 4, 3, 5]
                ]
                myChart.setOption(this.cylindricalCircle(titleArr, Data))
            },
            // 随迁数量图形
            relocationNumberChar () {
                let myChart = this.$echarts.init(document.getElementById('relocationNumber'))
                let titleArr = ['2012-2018随迁数量统计', '2018年随迁数量占比']
                let Data = [
                    [9.90, 9.90, 8.91, 9.13, 9.24, 9.03, 9.13],
                    [21.50, 21.38, 21.88, 22.38, 22.81, 22.09, 23.08],
                    [13.09, 11.96, 11.19, 10.77, 10.56, 10.99, 10.63],
                    [7.14, 7.26, 7.28, 7.13, 6.86, 6.77, 6.67],
                    [0.18, 0.16, 0.15, 0.17, 0.14, 0.16, 0.19]
                ]
                myChart.setOption(this.cylindricalCircle(titleArr, Data))
            },
            // 留守儿童图形
            leftChildrenChart () {
                let myChart = this.$echarts.init(document.getElementById('leftChildren'))
                let title = '2012-2018在校学生政治面貌统计'
                let data = [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                    ['幼儿园', 9.90, 9.90, 8.91, 9.13, 9.24, 9.13, 6.20],
                    ['小学', 21.50, 21.38, 21.88, 22.38, 22.81, 23.08, 24.02],
                    ['初中', 13.09, 11.96, 11.19, 10.77, 10.56, 10.63, 11.33],
                    ['高中', 7.14, 7.26, 7.28, 7.13, 6.86, 6.67, 7.62],
                    ['其他', 0.18, 0.16, 0.15, 0.17, 0.14, 0.19, 0.16]
                ]
                myChart.setOption(this.circularLine(title, data))
                myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0]
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1
                        myChart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        })
                    }
                })
            },
            // 华侨图形
            overseasChineseChart () {
                let myChart = this.$echarts.init(document.getElementById('overseasChinese'))
                let title = '2012-2018华侨统计'
                let data = [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                    ['幼儿园', 6.30, 6.30, 5.67, 5.81, 5.88, 5.81, 6.01],
                    ['小学', 13.68, 13.60, 13.92, 14.24, 14.51, 14.69, 15.03],
                    ['初中', 8.33, 7.61, 7.12, 6.86, 6.72, 6.76, 6.62],
                    ['高中', 4.54, 4.62, 4.63, 4.54, 4.36, 4.25, 4.82],
                    ['其他', 0.11, 0.10, 0.10, 0.11, 0.09, 0.12, 0.2]
                ]
                myChart.setOption(this.circularLine(title, data))
                myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0]
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1
                        myChart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        })
                    }
                })
            },
            // 港澳台图形
            hongKongMaCaoTaiWanChart () {
                let myChart = this.$echarts.init(document.getElementById('hongKongMaCaoTaiWan'))
                let title = '2012-2018港澳台统计'
                let data = [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                    ['幼儿园', 3.60, 3.60, 3.24, 3.32, 3.36, 3.32, 3.72],
                    ['小学', 7.82, 7.77, 7.96, 8.14, 8.29, 8.39, 8.42],
                    ['初中', 4.76, 4.35, 4.07, 3.92, 3.84, 3.86, 4.20],
                    ['高中', 2.59, 2.64, 2.65, 2.59, 2.49, 2.43, 2.68],
                    ['其他', 0.06, 0.06, 0.06, 0.06, 0.05, 0.07, 0.09]
                ]
                myChart.setOption(this.circularLine(title, data))
                myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0]
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1
                        myChart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        })
                    }
                })
            },
            // 外籍图形
            foreignNationalityChart () {
                let myChart = this.$echarts.init(document.getElementById('foreignNationality'))
                let titleArr = ['2012年外籍学生数量统计', '2013年外籍学生数量统计', '2014年外籍学生数量统计', '2015年外籍学生数量统计', '2016年外籍学生数量统计', '2017年外籍学生数量统计', '2018年外籍学生数量统计']
                let data = {
                    2018: [0.90, 2.21, 1.08, 0.77, 0.03],
                    2017: [0.83, 2.10, 0.97, 0.61, 0.02],
                    2016: [0.84, 2.07, 0.96, 0.62, 0.01],
                    2015: [0.83, 2.03, 0.98, 0.65, 0.02],
                    2014: [0.81, 1.99, 1.02, 0.66, 0.01],
                    2013: [0.90, 1.94, 1.09, 0.66, 0.01],
                    2012: [0.90, 1.95, 1.19, 0.65, 0.02]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data))
            },
            // 寄宿生图形
            boarderChart () {
                let myChart = this.$echarts.init(document.getElementById('boarder'))
                let titleArr = ['2012年寄宿生数量统计', '2013年寄宿生数量统计', '2014年寄宿生数量统计', '2015年寄宿生数量统计', '2016年寄宿生数量统计', '2017年寄宿生数量统计', '2018年寄宿生数量统计']
                let data = {
                    2018: [2.53, 21.13, 49.06, 51.86, 0.06],
                    2017: [2.49, 20.98, 48.30, 47.33, 0.05],
                    2016: [2.52, 20.73, 48.02, 48.61, 0.04],
                    2015: [2.49, 20.34, 48.97, 50.54, 0.05],
                    2014: [2.43, 19.89, 50.88, 51.59, 0.04],
                    2013: [2.70, 19.43, 54.37, 51.46, 0.04],
                    2012: [2.70, 19.55, 59.51, 50.60, 0.05]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data))
            },
            // 独生子女图形
            onlyChildChart () {
                let myChart = this.$echarts.init(document.getElementById('onlyChild'))
                let titleArr = ['2012年独生子女数量统计', '2013年独生子女数量统计', '2014年独生子女数量统计', '2015年独生子女数量统计', '2016年独生子女数量统计', '2017年独生子女数量统计', '2018年独生子女数量统计']
                let data = {
                    2018: [40.20, 95.32, 44.23, 30.03, 0.92],
                    2017: [37.35, 94.42, 43.47, 27.31, 0.77],
                    2016: [37.80, 93.30, 43.22, 28.04, 0.59],
                    2015: [37.35, 91.54, 44.07, 29.16, 0.70],
                    2014: [36.45, 89.51, 45.79, 29.76, 0.63],
                    2013: [40.50, 87.44, 48.93, 29.69, 0.63],
                    2012: [40.50, 87.97, 53.56, 29.19, 0.72]
                }
                myChart.setOption(this.changeDynamicalChart(titleArr, data))
            }
        },
        beforeDestroy: function () {
            clearInterval(this.timerShort)
            clearInterval(this.navTime)
        }
    }
</script>

<style lang="less">
    .analysis-student-type{
        width: 100%;
        background-color: #fff;
        .dz-header-wrapper  .dz-content-wrapper{
            padding: 0;
        }
        .analysis-student-content{
            padding:35px 0 50px;
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
                    border-right:2px solid #ededed;
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
                    .static-sex-wrapper{
                        width: 100%;
                        #sex, #sex2{
                            display: inline-block;
                            width: 49%;
                            height: 550px;
                        }
                    }
                }
            }
        }
    }
</style>
