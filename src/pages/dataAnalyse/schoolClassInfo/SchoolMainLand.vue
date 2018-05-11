<template lang="html">
    <div class="">
        <div class="build-total">
            <div class="b-radius10 b-shadow20 school-shadow" v-for="(item, index) in  landData"
                 :key="index"
                 :class="[landFlag == item.index ? 'active' : '' ]" @click="landClick(index, '2')">
                <div :id=item.id style="width:224px;height:224px;"></div>
            </div>
        </div>
        <div class="build-echart">
            <div class="b-radius20 b-shadow30 echart-box">
                <div class="grid-content">
                    <p class="build-echarts-title">校舍土地面积</p>
                    <div id="area-room5"
                         style="width:100%;height: 500px;min-width:500px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const MOCK_LAND_DATA = [
        {
            data: [
                [1509092, 1029628, 1227281, 1281966, 1185196, 1706339],
                [1944976, 1461098, 1168206, 1125413, 1659443, 1545094],
                [1334189, 1816930, 1719781, 1011272, 1346157, 1720338]
            ],
            index: 0,
            id: 'area-room1'
        },
        {
            data: [
                [150902, 102968, 122781, 128966, 115196, 176339],
                [19476, 146198, 116806, 112513, 169443, 145094],
                [133189, 181690, 171971, 101272, 134157, 172038]
            ],
            index: 1,
            id: 'area-room2'
        },
        {
            data: [
                [109092, 1029628, 1227281, 1281966, 1185196, 170339],
                [194476, 146108, 116806, 112543, 1659443, 1545094],
                [1334189, 181930, 171781, 101272, 1346157, 1720338]
            ],
            index: 2,
            id: 'area-room3'
        },
        {
            data: [
                [150092, 1029628, 1227281, 128166, 118596, 1706339],
                [194976, 1461098, 116206, 1125413, 159443, 1545094],
                [133189, 186930, 1719781, 1011272, 1346157, 172038]
            ],
            index: 3,
            id: 'area-room4'
        }
    ]
    export default {
        name: 'SchoolMainLand',
        data () {
            return {
                landData: MOCK_LAND_DATA,
                landFlag: 0,
                landAutoPlayTimer: null,
                // 重置 定时器: 用以恢复自动播放定时器;
                resetTimer: null,
                timerCount: 0,
                // 自动播放-时间间隔(毫秒).
                duration: 2000
            }
        },
        mounted: function () {
            this.drowPies()
            this.drowBar()
            this.openLandAutoPlayTimer()
        },
        beforeDestroy: function () {
            this.closeAllTimer()
        },
        methods: {
            /**
             * 饼状图
             */
            drowPies () {
                // this.drawSinglePie()
                var tmpData = [
                    {
                    color: ['#fe755f', '#5a5959'],
                    val_1: 4140954,
                    val_2: 14391016,
                    lbl: '幼儿园总面积(㎡)'
                }, {
                    color: ['#845ffe', '#5a5959'],
                    val_1: 5298254,
                    val_2: 13233716,
                    lbl: '小学总面积(㎡)'
                }, {
                    color: ['#13c0aa', '#5a5959'],
                    val_1: 4166809,
                    val_2: 14365161,
                    lbl: '初中总面积(㎡)'
                }, {
                    color: ['#fe68b4', '#5a5959'],
                    val_1: 5298254,
                    val_2: 13606017,
                    lbl: '高中总面积(㎡)'
                }]
                for (let i = 0; i < this.landData.length; i++) {
                    let _id = this.landData[i].id
                    this.$echarts.init(document.getElementById(_id)).setOption({
                        color: tmpData[i].color,
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: true,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: [
                                    {value: tmpData[i].val_1, name: tmpData[i].val_1 + '\n' + tmpData[i].lbl},
                                    {value: tmpData[i].val_2, name: '其他占用面积'}
                                ]
                            }
                        ]
                    })
                }
            },
            /**
             * 初始化柱状图
             */
            drowBar () {
                this.$echarts.init(document.getElementById('area-room5')).setOption({
                    color: ['#528df9', '#fe7560', '#fd61a1'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['运动面积', '绿化用地', '占用面积']
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
                            name: '运动面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[0].data[0]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[0].data[1]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[0].data[2]
                        }
                    ]
                })
            },
            /**
             * 切换详情数据
             * @param {number} 导航下标.
             */
            landClick (idx, event) {
                if (typeof event !== 'undefined' && event === '2') {
                    // 手动操作. 关闭自动播放
                    this.closeLandAutoPlayTimer()
                    // 打开 充值定时器
                    this.openResetTimer()
                    this.closeAutoPlayMixin()
                }
                this.landFlag = idx
                this.timerCount = idx
                this.$echarts.init(document.getElementById('area-room5')).setOption({
                    color: ['#528df9', '#fe7560', '#fd61a1'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['运动面积', '绿化用地', '占用面积']
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
                            name: '运动面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[idx].data[0]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[idx].data[1]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: this.landData[idx].data[2]
                        }
                    ]
                })
            },
            /**
             * 打开自动播放
             */
            openLandAutoPlayTimer: function () {
                this.landAutoPlayTimer = setInterval(() => {
                    console.log('%c build- 执行自动播放:' + '校舍土地面积' + new Date().getTime())
                    let idx1 = this.timerCount % 4
                    this.landClick(idx1)
                    this.timerCount++
                }, this.duration)
            },
            /**
             * 关闭自动播放.
             */
            closeLandAutoPlayTimer: function () {
                clearInterval(this.landAutoPlayTimer)
                this.landAutoPlayTimer = null
            },
            /**
             * 打开 重置定时器..
             */
            openResetTimer: function () {
                // 关闭上次的 定时器
                this.closeResetTimer()
                this.resetTimer = setTimeout(() => {
                    // console.log('%c build- 重置定时器: ' + new Date().getTime(), 'background-color: pink')
                    this.openLandAutoPlayTimer()
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
                this.closeLandAutoPlayTimer()
                this.closeResetTimer()
            }
        }
    }
</script>

<style lang="less">
</style>
