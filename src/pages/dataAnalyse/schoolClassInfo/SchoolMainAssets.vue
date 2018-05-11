<template lang="html">
    <div class="">
        <el-tabs v-model="activeName" tab-position="left" class="twoTabs"
                 @tab-click="changeTabsTwo">
            <el-tab-pane v-for="(item, index) in twoTabsData" :key="index" :label=item.lbl
                         :name=item.name>
                <div class="b-shadow30 b-radius20 echartModel">
                    <p class="asset-echarts-title">{{item.nameT}}</p>
                    <div :id="'asset' + item.index"
                         style="width:100%;height: 500px;min-width: 500px;"></div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    const MOCK_ASEETE_DATA = [
        {
            nameT: '固定资产（万元）',
            name: 'one',
            lbl: '固定资产',
            data: [],
            index: 1
        },
        {
            nameT: '实验室设备资产（万元）',
            name: 'two',
            lbl: '实验室设备资产',
            data: [],
            index: 2
        },
        {
            nameT: '教学仪器资产（万元）',
            name: 'three',
            lbl: '教学仪器资产',
            data: [],
            index: 3
        },
        {
            nameT: '多媒体教室座位（个）',
            name: 'four',
            lbl: '多媒体教室座位',
            data: [],
            index: 4
        },
        {
            nameT: '多媒体教室教室数（间）',
            name: 'five',
            lbl: '多媒体教室教室数',
            data: [],
            index: 5
        },
        {
            nameT: '语音实验室座位（个）',
            name: 'six',
            lbl: '语音实验室座位',
            data: [],
            index: 6
        },
        {
            nameT: '图书收藏（万本）',
            name: 'seven',
            lbl: '固定资产',
            data: [],
            index: 7
        },
        {
            nameT: '计算机数（台）',
            name: 'eight',
            lbl: '计算机数',
            data: [],
            index: 8
        }
    ]
    export default {
        name: 'SchoolMainAssets',
        data () {
            return {
                twoTabsData: MOCK_ASEETE_DATA,
                activeName: 'one',
                assetAutoPlayTimer: null,
                // 重置 定时器: 用以恢复自动播放定时器;
                resetTimer: null,
                timerCount: 0,
                // 自动播放-时间间隔(毫秒).
                duration: 2000,
                counter1: 0,
                idxAsset: {index: ''} // 资产统计自动播放入参
            }
        },
        mounted: function () {
            this.assetFirst()
            this.openAssetAutoPlayTimer()
        },
        beforeDestroy: function () {
            this.closeAllTimer()
        },
        methods: {
            /**
             * 初始化
             */
            assetFirst () {
                let that = this
                setTimeout(function () {
                    that.counter1 = 0
                    let myChartAsset1 = that.$echarts.init(document.getElementById('asset1'))
                    myChartAsset1.setOption({
                        color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4'],
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [
                                ['product', '幼儿园', '小学', '初中', '高中'],
                                ['2013', 11169, 9969, 19297, 18337],
                                ['2014', 6532, 5228, 13680, 16959],
                                ['2015', 18702, 7234, 15662, 13742],
                                ['2016', 6783, 9344, 12431, 17519],
                                ['2017', 17313, 1415, 12570, 9035],
                                ['2018', 3472, 14600, 12915, 7823]
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
            },
            /**
             * 第二层资产统计左边tab切换，右边对应相应图形数据
             * @param  {string}  val  第二层tabs对应索引
             */
            changeTabsTwo (val, event) {
                console.log(event)
                if (event !== null) {
                    // 手动操作， 关闭自动轮播
                    this.closeAssetAutoPlayTimer()
                    // 打开 重置定时器
                    this.openResetTimer()
                    this.closeAutoPlayMixin()
                }
                console.log('%c changeTabsTwo --> index:' + val.index, 'background-color: pink')
                var index = parseInt(val.index)
                this.activeName = this.twoTabsData[index].name
                let that = this
                if (index === 0) {
                    setTimeout(function () {
                        that.counter1 = 0
                        let myChartAsset1 = that.$echarts.init(document.getElementById('asset1'))
                        myChartAsset1.setOption({
                            color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4'],
                            legend: {},
                            tooltip: {},
                            dataset: {
                                source: [
                                    ['product', '幼儿园', '小学', '初中', '高中'],
                                    ['2013', 11169, 9969, 19297, 18337],
                                    ['2014', 6532, 5228, 13680, 16959],
                                    ['2015', 18702, 7234, 15662, 13742],
                                    ['2016', 6783, 9344, 12431, 17519],
                                    ['2017', 17313, 1415, 12570, 9035],
                                    ['2018', 3472, 14600, 12915, 7823]
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
                } else if (index === 1) {
                    that.counter1 = 1
                    // 资产统计---实验室设备资产
                    setTimeout(function () {
                        let myChartAsset2 = that.$echarts.init(document.getElementById('asset2'))
                        myChartAsset2.setOption({
                            color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4'],
                            legend: {},
                            tooltip: {},
                            dataset: {
                                source: [
                                    ['product', '幼儿园', '小学', '初中', '高中'],
                                    ['2013', 15209, 14287, 9458, 5775],
                                    ['2014', 18306, 18312, 2146, 6033],
                                    ['2015', 11316, 10053, 13719, 1057],
                                    ['2016', 3186, 19822, 19202, 7273],
                                    ['2017', 6904, 13679, 8911, 14017],
                                    ['2018', 2495, 18503, 14396, 1255]
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
                } else if (index === 2) {
                    that.counter1 = 2
                    // 资产统计---教学仪器资产
                    setTimeout(function () {
                        let myChartAsset3 = that.$echarts.init(document.getElementById('asset3'))
                        myChartAsset3.setOption({
                            color: ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4'],
                            legend: {},
                            tooltip: {},
                            dataset: {
                                source: [
                                    ['product', '幼儿园', '小学', '初中', '高中'],
                                    ['2013', 6554, 14405, 19248, 7950],
                                    ['2014', 11988, 7930, 5275, 17917],
                                    ['2015', 11445, 16984, 13991, 14519],
                                    ['2016', 6700, 17587, 4184, 5881],
                                    ['2017', 19653, 19952, 19970, 10712],
                                    ['2018', 13601, 14148, 11534, 12231]
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
                } else if (index === 3) {
                    that.counter1 = 3
                    // 资产统计---多媒体教室座位
                    setTimeout(function () {
                        let myChartAsset4 = that.$echarts.init(document.getElementById('asset4'))
                        myChartAsset4.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            },
                            legend: {
                                icon: 'rect',
                                itemWidth: 14,
                                itemHeight: 5,
                                itemGap: 13,
                                data: ['幼儿园', '小学', '初中', '高中'],
                                right: '4%',
                                textStyle: {
                                    fontSize: 12,
                                    color: 'black'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                data: ['2013', '2014', '2015', '2016', '2017', '2018']
                            }, {
                                axisPointer: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },

                                position: 'bottom',
                                offset: 20
                            }],
                            yAxis: [{
                                type: 'value',
                                name: '单位（个）',
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisLabel: {
                                    margin: 10,
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            }],
                            series: [{
                                name: '幼儿园',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(254, 117, 95, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(254, 117, 95, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(254, 117, 95)',
                                        borderColor: 'rgba(254, 117, 95,0.27)',
                                        borderWidth: 12

                                    }
                                },
                                data: [4360806, 1139529, 4394000, 988111, 2831211, 876107]
                            }, {
                                name: '小学',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(132, 95, 254, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(132, 95, 254, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(132, 95, 254)',
                                        borderColor: 'rgba(132, 95, 254,0.2)',
                                        borderWidth: 12

                                    }
                                },
                                data: [3281284, 4744027, 2615913, 789226, 1907337, 737116]
                            }, {
                                name: '初中',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(19, 192, 170, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(19, 192, 170, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {

                                        color: 'rgb(19, 192, 170)',
                                        borderColor: 'rgba(19, 192, 170)',
                                        borderWidth: 12
                                    }
                                },
                                data: [4115830, 528979, 2054717, 2807913, 565500, 1385536]
                            },
                                {
                                    name: '高中',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    showSymbol: false,
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(254, 104, 180, 0.3)'
                                            }, {
                                                offset: 0.8,
                                                color: 'rgba(254, 104, 180, 0)'
                                            }], false),
                                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                                            shadowBlur: 10
                                        }
                                    },
                                    itemStyle: {
                                        normal: {

                                            color: 'rgb(254, 104, 180)',
                                            borderColor: 'rgba(254, 104, 180,0.2)',
                                            borderWidth: 12
                                        }
                                    },
                                    data: [604311, 3595780, 3988330, 2652456, 3591436, 4862097]
                                }
                            ]
                        })
                    }, 200)
                } else if (index === 4) {
                    that.counter1 = 4
                    // 资产统计---多媒体教室数
                    setTimeout(function () {
                        let myChartAsset5 = that.$echarts.init(document.getElementById('asset5'))
                        myChartAsset5.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            },
                            legend: {
                                icon: 'rect',
                                itemWidth: 14,
                                itemHeight: 5,
                                itemGap: 13,
                                data: ['幼儿园', '小学', '初中', '高中'],
                                right: '4%',
                                textStyle: {
                                    fontSize: 12,
                                    color: 'black'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                data: ['2013', '2014', '2015', '2016', '2017', '2018']
                            }, {
                                axisPointer: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },

                                position: 'bottom',
                                offset: 20
                            }],
                            yAxis: [{
                                type: 'value',
                                name: '单位（间）',
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisLabel: {
                                    margin: 10,
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            }],
                            series: [{
                                name: '幼儿园',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(254, 117, 95, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(254, 117, 95, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(254, 117, 95)',
                                        borderColor: 'rgba(254, 117, 95,0.27)',
                                        borderWidth: 12

                                    }
                                },
                                data: [82674, 50864, 51449, 34119, 87911, 21667]
                            }, {
                                name: '小学',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(132, 95, 254, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(132, 95, 254, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(132, 95, 254)',
                                        borderColor: 'rgba(132, 95, 254,0.2)',
                                        borderWidth: 12

                                    }
                                },
                                data: [92131, 90163, 14788, 55014, 56840, 95229]
                            }, {
                                name: '初中',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(19, 192, 170, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(19, 192, 170, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {

                                        color: 'rgb(19, 192, 170)',
                                        borderColor: 'rgba(19, 192, 170,0.2)',
                                        borderWidth: 12
                                    }
                                },
                                data: [68216, 58313, 34435, 54292, 55371, 15139]
                            },
                                {
                                    name: '高中',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    showSymbol: false,
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(254, 104, 180, 0.3)'
                                            }, {
                                                offset: 0.8,
                                                color: 'rgba(254, 104, 180, 0)'
                                            }], false),
                                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                                            shadowBlur: 10
                                        }
                                    },
                                    itemStyle: {
                                        normal: {

                                            color: 'rgb(254, 104, 180)',
                                            borderColor: 'rgba(254, 104, 180,0.2)',
                                            borderWidth: 12
                                        }
                                    },
                                    data: [86433, 29820, 26206, 55647, 85691, 63573]
                                }
                            ]
                        })
                    }, 200)
                } else if (index === 5) {
                    that.counter1 = 5
                    // 资产统计---语音实验室座位
                    setTimeout(function () {
                        let myChartAsset6 = that.$echarts.init(document.getElementById('asset6'))
                        myChartAsset6.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            },
                            legend: {
                                icon: 'rect',
                                itemWidth: 14,
                                itemHeight: 5,
                                itemGap: 13,
                                data: ['幼儿园', '小学', '初中', '高中'],
                                right: '4%',
                                textStyle: {
                                    fontSize: 12,
                                    color: 'black'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                data: ['2013', '2014', '2015', '2016', '2017', '2018']
                            }, {
                                axisPointer: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },

                                position: 'bottom',
                                offset: 20
                            }],
                            yAxis: [{
                                type: 'value',
                                name: '单位（个）',
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisLabel: {
                                    margin: 10,
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            }],
                            series: [{
                                name: '幼儿园',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(254, 117, 95, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(254, 117, 95, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(254, 117, 95)',
                                        borderColor: 'rgba(254, 117, 95,0.27)',
                                        borderWidth: 12

                                    }
                                },
                                data: [2813770, 1548910, 2007089, 3680110, 2351639, 2989054]
                            }, {
                                name: '小学',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(132, 95, 254, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(132, 95, 254, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(132, 95, 254)',
                                        borderColor: 'rgba(132, 95, 254,0.2)',
                                        borderWidth: 12

                                    }
                                },
                                data: [4425223, 4041337, 2961697, 3539596, 4861937, 1821981]
                            }, {
                                name: '初中',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(19, 192, 170, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(19, 192, 170, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {

                                        color: 'rgb(19, 192, 170)',
                                        borderColor: 'rgba(19, 192, 170,0.2)',
                                        borderWidth: 12
                                    }
                                },
                                data: [4931766, 2505524, 3564018, 4310585, 964162, 4226258]
                            },
                                {
                                    name: '高中',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    showSymbol: false,
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(254, 104, 180, 0.3)'
                                            }, {
                                                offset: 0.8,
                                                color: 'rgba(254, 104, 180, 0)'
                                            }], false),
                                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                                            shadowBlur: 10
                                        }
                                    },
                                    itemStyle: {
                                        normal: {

                                            color: 'rgb(254, 104, 180)',
                                            borderColor: 'rgba(254, 104, 180,0.2)',
                                            borderWidth: 12
                                        }
                                    },
                                    data: [2170140, 4007106, 4292046, 2875754, 3670664, 3389032]
                                }
                            ]
                        })
                    }, 200)
                } else if (index === 6) {
                    that.counter1 = 6
                    // 资产统计---图书收藏
                    setTimeout(function () {
                        let myChartAsset7 = that.$echarts.init(document.getElementById('asset7'))
                        myChartAsset7.setOption({
                            legend: {
                                top: 50,
                                left: 30,
                                textStyle: {
                                    color: '#000000'
                                },
                                data: ['幼儿园', '小学', '初中', '高中']
                            },
                            grid: {
                                left: '3%',
                                right: '20%',
                                top: 75,
                                bottom: '1%',
                                containLabel: true
                            },
                            tooltip: {
                                show: 'true',
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            xAxis: {
                                type: 'value',
                                axisTick: {
                                    show: true
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#000'
                                    }
                                },
                                splitLine: {
                                    show: true
                                }
                            },
                            yAxis: [{
                                type: 'category',
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#000000'
                                    }
                                },
                                data: ['1月', '2月', '3月', '4月', '5月', '6月']
                            },
                                {
                                    type: 'category',
                                    axisLine: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    splitArea: {
                                        show: false
                                    },
                                    splitLine: {
                                        show: false
                                    }
                                }
                            ],
                            series: [{
                                name: '幼儿园',
                                type: 'bar',
                                barWidth: 7,
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color: '#fe755f',
                                        barBorderRadius: 50,
                                        borderWidth: 0,
                                        borderColor: '#333'
                                    }
                                },
                                barGap: '0%',
                                barCategoryGap: '50%',
                                data: [362257, 450435, 178454, 150156, 261075, 330339]
                            }, {
                                name: '小学',
                                type: 'bar',
                                barWidth: 7,
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color: '#845ffe',
                                        barBorderRadius: 50,
                                        borderWidth: 0,
                                        borderColor: '#333'
                                    }
                                },
                                barGap: '0%',
                                barCategoryGap: '50%',
                                data: [487563, 151249, 61661, 354918, 273107, 246090]
                            }, {
                                name: '初中',
                                type: 'bar',
                                barWidth: 7,
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color: '#13c0aa',
                                        barBorderRadius: 50,
                                        borderWidth: 0,
                                        borderColor: '#333'
                                    }
                                },
                                barGap: '0%',
                                barCategoryGap: '50%',
                                data: [386664, 228738, 255260, 108201, 383526, 343074]
                            }, {
                                name: '高中',
                                type: 'bar',
                                barWidth: 7,
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color: '#fe68b4',
                                        barBorderRadius: 50,
                                        borderWidth: 0,
                                        borderColor: '#333'
                                    }
                                },
                                barGap: '0%',
                                barCategoryGap: '50%',
                                data: [325582, 229210, 277601, 188880, 224788, 169049]
                            }]
                        })
                    }, 200)
                } else if (index === 7) {
                    that.counter1 = 7
                    // 资产统计---计算机数
                    setTimeout(function () {
                        let myChartAsset8 = that.$echarts.init(document.getElementById('asset8'))
                        myChartAsset8.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            },
                            legend: {
                                icon: 'rect',
                                itemWidth: 14,
                                itemHeight: 5,
                                itemGap: 13,
                                data: ['幼儿园', '小学', '初中', '高中'],
                                right: '4%',
                                textStyle: {
                                    fontSize: 12,
                                    color: 'black'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                data: ['2013', '2014', '2015', '2016', '2017', '2018']
                            }, {
                                axisPointer: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },

                                position: 'bottom',
                                offset: 20
                            }],
                            yAxis: [{
                                type: 'value',
                                name: '单位（台）',
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                },
                                axisLabel: {
                                    margin: 10,
                                    textStyle: {
                                        fontSize: 14
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#57617B'
                                    }
                                }
                            }],
                            series: [{
                                name: '幼儿园',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(254, 117, 95, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(254, 117, 95, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(254, 117, 95)',
                                        borderColor: 'rgba(254, 117, 95,0.27)',
                                        borderWidth: 12

                                    }
                                },
                                data: [3280284, 2988828, 4280963, 1647608, 4413684, 2928958]
                            }, {
                                name: '小学',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(132, 95, 254, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(132, 95, 254, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgb(132, 95, 254)',
                                        borderColor: 'rgba(132, 95, 254,0.2)',
                                        borderWidth: 12

                                    }
                                },
                                data: [1813314, 4041337, 2416136, 4593259, 2100319, 3796633]
                            }, {
                                name: '初中',
                                type: 'line',
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        width: 1
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(19, 192, 170, 0.3)'
                                        }, {
                                            offset: 0.8,
                                            color: 'rgba(19, 192, 170, 0)'
                                        }], false),
                                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    normal: {

                                        color: 'rgb(19, 192, 170)',
                                        borderColor: 'rgba(19, 192, 170,0.2)',
                                        borderWidth: 12
                                    }
                                },
                                data: [4685914, 1579599, 1655211, 4875498, 2549609, 4009420]
                            },
                                {
                                    name: '高中',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 5,
                                    showSymbol: false,
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(254, 104, 180, 0.3)'
                                            }, {
                                                offset: 0.8,
                                                color: 'rgba(254, 104, 180, 0)'
                                            }], false),
                                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                                            shadowBlur: 10
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: 'rgb(254, 104, 180)',
                                            borderColor: 'rgba(254, 104, 180,0.2)',
                                            borderWidth: 12
                                        }
                                    },
                                    data: [3830705, 1701848, 1031170, 2963153, 1415784, 2545205]
                                }
                            ]
                        })
                    }, 200)
                }
            },
            /**
             * 打开自动播放.
             */
            openAssetAutoPlayTimer: function () {
                this.assetAutoPlayTimer = setInterval(() => {
                    this.counter1++
                    this.idxAsset.index = (this.counter1 % 8)
                    console.log('changeTabsTwo[setInterval]:' + '资产统计' + this.idxAsset.index)
                    this.changeTabsTwo(this.idxAsset, null)
                    // this.counter1++
                }, this.duration)
            },
            /**
             * 关闭自动播放.
             */
            closeAssetAutoPlayTimer: function () {
                clearInterval(this.assetAutoPlayTimer)
                this.assetAutoPlayTimer = null
            },
            /**
             * 打开 重置定时器..
             */
            openResetTimer: function () {
                // 关闭上次的 定时器
                this.closeResetTimer()
                this.resetTimer = setTimeout(() => {
                    // console.log('%c build- 重置定时器: ' + new Date().getTime(), 'background-color: pink')
                    this.openAssetAutoPlayTimer()
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
                this.closeAssetAutoPlayTimer()
                this.closeResetTimer()
            }
        }
    }
</script>

<style lang="less">
</style>
