<template>
    <div class="school-class">
        <el-main class="main-content">
            <el-tabs class="school-tabs" v-model="activeFirst" @tab-click="changeTabs">
                <el-tab-pane label="学校&班级" name="school">
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
                </el-tab-pane>
                <el-tab-pane label="教室统计" name="class">
                    <div class="room-total">
                        <div class="b-radius20 b-shadow30 school-shadow">
                            <div class="grid-content content">幼儿园教室（间）</div>
                            <div class="grid-content color1">{{classTotalData[0]}}</div>
                        </div>
                        <div class="b-radius20 b-shadow30 school-shadow">
                            <div class="grid-content content">小学教室（间）</div>
                            <div class="grid-content color2">{{classTotalData[1]}}</div>
                        </div>
                        <div class="b-radius20 b-shadow30 school-shadow">
                            <div class="grid-content content">初中教室（间）</div>
                            <div class="grid-content color3">{{classTotalData[2]}}</div>
                        </div>
                        <div class="b-radius20 b-shadow30 school-shadow">
                            <div class="grid-content content">高中教室（间）</div>
                            <div class="grid-content color4">{{classTotalData[3]}}</div>
                        </div>
                    </div>
                    <div class="room-echart">
                        <div class="b-radius20 b-shadow30 echart-box">
                            <div class="grid-content">
                                <p class="room-echarts-title ">本区域下学校构成情况</p>
                                <div id="school-room"
                                     style="height:560px;width:100%;min-width:500px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="校舍建筑面积" name="build">
                    <div class="land-total">
                        <div class="b-radius10 b-shadow20 school-shadow"
                             v-for="(item, index) in buildData" :key="index"
                             @click="buildSingle(index, 'mockEvent')"
                             :class="[index == idx ? 'active' : '' ]"
                        >
                            <div class="grid-content content">{{item.name}}</div>
                            <div class="grid-content" :style="item.class">{{item.value}}
                            </div>
                        </div>
                    </div>
                    <div class="land-echart">
                        <div class="b-radius20 b-shadow30 echart-box">
                            <div class="grid-content">
                                <p class="land-echarts-title">校舍建筑面积</p>
                                <div id="build-room"
                                     style="width:100%;height:550px;min-width:500px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="校舍土地面积" name="land">
                    <div class="build-total">
                        <div class="b-radius10 b-shadow20 school-shadow"
                             :class="[landFlag == 0 ? 'active' : '' ]" @click="landOne('land0')">
                            <div id="area-room1" style="width:224px;height:224px;"></div>
                        </div>
                        <div class="b-radius10 b-shadow20 school-shadow"
                             :class="[landFlag == 1 ? 'active' : '' ]" @click="landTwo('land1')">
                            <div id="area-room2" style="width:224px;height:224px;"></div>
                        </div>
                        <div class="b-radius10 b-shadow20 school-shadow"
                             :class="[landFlag == 2 ? 'active' : '' ]" @click="landThree('land2')">
                            <div id="area-room3" style="width:224px;height:224px;"></div>
                        </div>
                        <div class="b-radius10 b-shadow20 school-shadow"
                             :class="[landFlag == 3 ? 'active' : '' ]" @click="landFour('land3')">
                            <div id="area-room4" style="width:224px;height:224px;"></div>
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
                </el-tab-pane>
                <el-tab-pane label="资产统计" class="assets-statistics" name="asset">
                    <el-tabs v-model="activeName" tab-position="left" class="twoTabs"
                             @tab-click="changeTabsTwo">
                        <el-tab-pane label="固定资产" name="one">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">固定资产（万元）</p>
                                <div id="asset1"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="实验室设备资产" name="two">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">实验室设备资产（万元）</p>
                                <div id="asset2"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="教学仪器资产" name="three">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">教学仪器资产（万元）</p>
                                <div id="asset3"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="多媒体教室座位" name="four">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">多媒体教室座位</p>
                                <div id="asset4"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="多媒体教室数" name="five">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">多媒体教室数</p>
                                <div id="asset5"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="语音实验室座位" name="six">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">语音实验室座位</p>
                                <div id="asset6"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="计算机数" name="seven">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">图书收藏</p>
                                <div id="asset7"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="图书收藏" name="eight">
                            <div class="b-shadow30 b-radius20 echartModel">
                                <p class="asset-echarts-title">计算机数</p>
                                <div id="asset8"
                                     style="width:100%;height: 500px;min-width: 500px;"></div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </div>
</template>

<script>
    /**
     * '学校班级'页面.
     * @author dz-lixiaoying-20180428
     */
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzPie from '@/components/DzPieEcharts'

    export default {
        name: 'schoolClass',
        components: {DzFooter, DzPie, DzHeader},
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
                },
                // 建筑面积分类数据
                buildData: [
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
                    }
                ],
                tabPosition: 'top', // tab定位
                tabsShow: true,
                myChartThree: '',
                myChartTwo: '',
                myChartFour1: '',
                myChartFour2: '',
                myChartFour3: '',
                myChartFour4: '',
                myChartFour5: '',
                upDateList: [
                    {
                        data: {
                            list1: [5382, 8348, 5933, 5009, 4550, 2210],
                            list2: [2382, 5848, 1933, 7009, 4800, 5010],
                            list3: [3382, 4834, 5033, 3009, 1500, 3240],
                            list4: [5282, 4838, 8093, 3209, 1500, 5240]
                        }
                    },
                    {
                        data: {
                            list1: [3282, 2834, 5933, 2009, 5500, 1240],
                            list2: [5282, 4838, 8093, 3209, 1500, 5240],
                            list3: [5382, 5848, 7033, 4029, 4500, 8210],
                            list4: [2382, 5848, 1933, 7009, 4800, 5010]
                        }
                    },
                    {
                        data: {
                            list1: [2382, 5838, 4093, 7209, 4450, 9140],
                            list2: [5382, 4848, 2093, 2209, 5550, 4140],
                            list3: [3282, 4838, 6033, 3009, 9500, 5240],
                            list4: [3282, 2834, 5933, 2009, 5500, 5240]
                        }
                    },
                    {
                        data: {
                            list1: [2382, 8348, 6933, 5209, 4550, 8240],
                            list2: [6328, 1348, 5033, 4009, 9550, 7210],
                            list3: [3382, 6348, 2363, 3209, 8500, 5240],
                            list4: [5382, 4848, 7093, 5209, 5550, 4140]
                        }
                    },
                    {
                        data: {
                            list1: [3282, 4848, 5093, 5109, 4500, 4640],
                            list2: [5722, 6348, 7933, 6509, 2300, 2140],
                            list3: [2382, 4348, 3933, 2309, 8900, 8240],
                            list4: [6328, 4348, 5033, 4009, 9550, 7210]
                        }
                    }
                ],
                timer: '', // 最外层定时器
                classTotalData: [3282, 4848, 5093, 5109, 4500],
                timerBuild: '', // 建筑面积定时器
                timerAsset: '', // 资产统计定时器
                timerLand: '', // 土地面积定时器
                idx: '',
                idxAsset: {index: ''}, // 资产统计自动播放入参
                activeName: 'one', // 第二层tabs对应name
                activeFirst: 'school', // 第一层tabs对应name
                firstIndex: {index: ''}, // 第一层tabs自动播放入参
                landFlag: 0, // 土地面积索引
                listenPage: null,
                counter2: 0,
                counter1: 0,
                counter: 0,
                timeOut1: '',
                timeOut2: '',
                timeOut3: '',
                timeOut4: ''
            }
        },
        created () {
            // 设置饼状图高度
            this.pieData.echartStyle.height = 320 + 'px'
        },
        mounted () {
            this.drawBar() // 柱状图方法
            this.autoPlayDo() // 自动播放
        },
        beforeDestroy () {
            this.clearAll()
        },
        methods: {
            getEchartData (val) { // 获取饼状图数据方法
            },
            /**
             * 关闭所有定时器
             */
            clearAll () {
                clearInterval(this.timer)
                clearInterval(this.timerBuild)
                clearInterval(this.timerAsset)
                clearInterval(this.timerLand)
            },
            /**
             * 绘制学校班级的柱状图
             */
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
            },
            /**
             * 一级tab自动轮播，控制其他tabs下的定时器开关
             */
            autoPlayDo () {
                let that = this
                // that.counter2 = 0
                that.timer = setInterval(() => {
                    that.counter2++
                    that.firstIndex.index = (that.counter2 % 5)
                    console.log('一级tab自动轮播' + that.firstIndex.index)
                    if (that.firstIndex.index === 2) {
                        clearInterval(that.timerAsset)
                        clearInterval(that.timerLand)
                    } else if (that.firstIndex.index === 3) {
                        clearInterval(that.timerAsset)
                        clearInterval(that.timerBuild)
                    } else if (that.firstIndex.index === 4) {
                        clearInterval(that.timerBuild)
                        clearInterval(that.timerLand)
                    } else {
                        clearInterval(that.timerBuild)
                        clearInterval(that.timerAsset)
                        clearInterval(that.timerLand)
                    }
                    that.changeTabs(that.firstIndex, null)
                }, 18000)
            },
            /**
             * 建筑面积定时器方法
             */
            scoolBuildTimer () {
                // var counter = 0
                this.timerBuild = setInterval(() => {
                    console.log('建筑面积' + this.counter)
                    this.counter++
                    this.idx = this.counter % 4
                    this.buildSingle(this.idx)
                }, 2000)
            },
            /**
             * 资产统计定时器方法
             */
            scoolAssetTimer () {
                // var counter1 = 0
                this.timerAsset = setInterval(() => {
                   this.counter1++
                    this.idxAsset.index = (this.counter1 % 8)
                    // console.log(that.idxAsset)
                    console.log('changeTabsTwo[setInterval]:' + '资产统计' + this.idxAsset.index)
                    this.changeTabsTwo(this.idxAsset, null)
                }, 2000)
            },
            /**
             * 土地面积定时器方法
             */
            landSingle () {
                let that = this
                that.timerLand = setInterval(function () {
                    that.landFlag++
                    if (that.landFlag > 3) {
                        that.landFlag = 0
                    }
                    if (that.landFlag === 0) {
                        that.landOne()
                    } else if (that.landFlag === 1) {
                        that.landTwo()
                    } else if (that.landFlag === 2) {
                        that.landThree()
                    } else {
                        that.landFour()
                    }
                }, 2000)
            },
            /**
             * 第一层tab点击事件，让图形重新加载
             * @param  {string}  val  第一层tabs对应索引
             */
            changeTabs (val, event) {
                // 教室统计echart
                let that = this
                if (event !== null) {
                    clearTimeout(that.timeOut1)
                    that.clearAll()
                    that.closeAutoPlayMixin()
                    that.timeOut1 = setTimeout(function () {
                        that.autoPlayDo()
                    }, 2000)
                }
                var indexf = parseInt(val.index)
                if (indexf === 0) {
                    that.counter2 = 0
                    that.activeFirst = 'school'
                    that.drawBar()
                } else if (indexf === 1) {
                    that.counter2 = 1
                    that.activeFirst = 'class'
                    // 绘图前一次性定时器的作用是让图形能适应设置的style
                    setTimeout(function () {
                        that.myChartTwo = that.$echarts.init(document.getElementById('school-room'))
                        that.myChartTwo.setOption({
                            legend: {data: ['幼儿园', '小学', '初中', '高中']},
                            tooltip: {},
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: ['2013', '2014', '2015', '2016', '2017', '2018']
                            }],
                            yAxis: [{
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }],
                            series: [{
                                name: '幼儿园',
                                type: 'bar',
                                itemStyle: {
                                    normal: {color: '#fe755f'}
                                },
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                data: [5382, 8348, 5933, 5009, 4550, 2210]
                            }, {
                                name: '小学',
                                type: 'bar',
                                itemStyle: {
                                    normal: {color: '#845ffe'}
                                },
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                data: [2382, 5848, 1933, 7009, 4800, 5010]
                            }, {
                                name: '初中',
                                type: 'bar',
                                itemStyle: {
                                    normal: {color: '#13c0aa'}
                                },
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                data: [5382, 5848, 7033, 4029, 4500, 8210]
                            }, {
                                name: '高中',
                                type: 'bar',
                                itemStyle: {
                                    normal: {color: '#fe68b4'}
                                },
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                data: [5282, 4838, 8093, 3209, 1500, 5240]
                            }]
                        })
                    }, 200)
                } else if (indexf === 2) {
                    that.counter2 = 2
                    that.activeFirst = 'build'
                    // 校舍建筑面积
                    setTimeout(function () {
                        that.myChartThree = that.$echarts.init(document.getElementById('build-room'))
                        that.myChartThree.setOption({
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
                                    data: [1528134, 1633336, 1852708, 1330073, 1098762, 1687961]
                                },
                                {
                                    name: '正在施工',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: [1209735, 1230562, 1680710, 1483635, 1851631, 1462188]
                                },
                                {
                                    name: '废弃',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: [1444359, 1069411, 1678132, 1933998, 1190335, 1368998]
                                }
                            ]
                        })
                    }, 200)
                    that.scoolBuildTimer()
                } else if (indexf === 3) {
                    that.counter2 = 3
                    that.activeFirst = 'land'
                    // 校舍土地面积
                    setTimeout(function () {
                        that.myChartFour1 = that.$echarts.init(document.getElementById('area-room1'))
                        that.myChartFour2 = that.$echarts.init(document.getElementById('area-room2'))
                        that.myChartFour3 = that.$echarts.init(document.getElementById('area-room3'))
                        that.myChartFour4 = that.$echarts.init(document.getElementById('area-room4'))
                        that.myChartFour5 = that.$echarts.init(document.getElementById('area-room5'))
                        // 左边部分占用面积比
                        that.myChartFour1.setOption({
                            color: ['#fe755f', '#5a5959'],
                            tooltip: {
                                show: true, // 悬浮提示
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)'
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: true,
                                    hoverAnimation: true,
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
                                        {value: 4140954, name: '4140954' + '\n' + '幼儿园总面积(㎡)'},
                                        {value: 14391016, name: '其他占用面积'}
                                    ]
                                }
                            ]
                        })
                        that.myChartFour2.setOption({
                            color: ['#845ffe', '#5a5959'],
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
                                        {value: 5298254, name: '5298254' + '\n' + '小学总面积(㎡)'},
                                        {value: 13233716, name: '其他占用面积'}
                                    ]
                                }
                            ]
                        })
                        that.myChartFour3.setOption({
                            color: ['#13c0aa', '#5a5959'],
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
                                        {value: 4166809, name: '4166809' + '\n' + '初中总面积(㎡)'},
                                        {value: 14365161, name: '其他占用面积'}
                                    ]
                                }
                            ]
                        })
                        that.myChartFour4.setOption({
                            color: ['#fe68b4', '#5a5959'],
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
                                        {value: 4925953, name: '4925953' + '\n' + '高中总面积(㎡)'},
                                        {value: 13606017, name: '其他占用面积'}
                                    ]
                                }
                            ]
                        })
                        // 右边部分具体情况
                        that.myChartFour5.setOption({
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
                                    data: [1509092, 1029628, 1227281, 1281966, 1185196, 1706339]
                                },
                                {
                                    name: '绿化用地',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: [1944976, 1461098, 1168206, 1125413, 1659443, 1545094]
                                },
                                {
                                    name: '占用面积',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {}},
                                    data: [1334189, 1816930, 1719781, 1011272, 1346157, 1720338]
                                }
                            ]
                        })
                    }, 200)
                    that.landSingle()
                } else if (indexf === 4) {
                    that.counter2 = 4
                    that.activeFirst = 'asset'
                    // 资产统计---固定资产
                    setTimeout(function () {
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
                    that.scoolAssetTimer()
                }
                console.log('第一层tabs下标' + that.firstIndex.index)
            },
            /**
             * 第二层资产统计左边tab切换，右边对应相应图形数据
             * @param  {string}  val  第二层tabs对应索引
             */
            changeTabsTwo (val, event) {
                let that = this
                if (event !== null) {
                    clearTimeout(that.timeOut2)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    that.timeOut2 = setTimeout(function () {
                        that.autoPlayDo()
                        that.scoolAssetTimer()
                    }, 2000)
                }
                console.log('%c changeTabsTwo --> index:' + val.index, 'background-color: pink')
                console.log(val)
                var index = parseInt(val.index)
                if (index === 0) {
                    that.counter1 = 0
                    that.activeName = 'one'
                    setTimeout(function () {
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
                    that.activeName = 'two'
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
                    that.activeName = 'three'
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
                    that.activeName = 'four'
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
                    that.activeName = 'five'
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
                    that.activeName = 'six'
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
                    that.activeName = 'seven'
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
                    that.activeName = 'eight'
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
             * 校舍建筑面积点击改变图形数据
             * @param  {number}  index  各类校舍对应索引
             */
            buildSingle (index, event) {
                if (typeof event !== 'undefined' && event === 'mockEvent') {
                    clearTimeout(this.timeOut3)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    let that = this
                    this.timeOut3 = setTimeout(function () {
                        that.autoPlayDo()
                        that.scoolBuildTimer()
                    }, 2000)
                    console.log('%c TEST-schoolClass-手动切换', 'background-color: pink')
                }
                if (index === 1) {
                    this.idx = 1
                    this.counter = 1
                    this.myChartThree.setOption({
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
                                data: [152134, 163336, 182708, 133073, 109762, 167961]
                            },
                            {
                                name: '正在施工',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [120735, 123562, 168710, 183635, 185131, 146218]
                            },
                            {
                                name: '废弃',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [144359, 109411, 167832, 193998, 119035, 13688]
                            }
                        ]
                    })
                } else if (index === 2) {
                    this.idx = 2
                    this.counter = 2
                    this.myChartThree.setOption({
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
                                data: [158134, 163336, 185708, 330073, 198762, 187961]
                            },
                            {
                                name: '正在施工',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [120975, 123062, 168010, 148635, 185131, 146188]
                            },
                            {
                                name: '废弃',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [144459, 106941, 167132, 193998, 119335, 16898]
                            }
                        ]
                    })
                } else if (index === 3) {
                    this.idx = 3
                    this.counter = 3
                    this.myChartThree.setOption({
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
                                data: [528134, 633336, 852708, 330073, 109762, 168961]
                            },
                            {
                                name: '正在施工',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [120735, 123562, 160710, 148635, 185131, 146188]
                            },
                            {
                                name: '废弃',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [144359, 109411, 16132, 193998, 11935, 136998]
                            }
                        ]
                    })
                } else {
                    this.idx = 0
                    this.counter = 0
                    this.myChartThree.setOption({
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
                                data: [1528134, 1633336, 1852708, 1330073, 1098762, 1687961]
                            },
                            {
                                name: '正在施工',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [1209735, 1230562, 1680710, 1483635, 1851631, 1462188]
                            },
                            {
                                name: '废弃',
                                type: 'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data: [1444359, 1069411, 1678132, 1933998, 1190335, 1368998]
                            }
                        ]
                    })
                }
            },
            /**
             * 校舍土地面积点击左图改变有图数据 landOne，landTwo，landThree，landFour
             */
            landOne (event) {
                if (typeof event !== 'undefined' && event === 'land0') {
                    clearTimeout(this.timeOut4)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    let that = this
                    that.landFlag = 0
                    this.timeOut4 = setTimeout(function () {
                        that.autoPlayDo()
                        that.landSingle()
                    }, 2000)
                    console.log('%c TEST-schoolClass-手动切换', 'background-color: pink')
                }
                this.myChartFour5.setOption({
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
                            data: [1509092, 1029628, 1227281, 1281966, 1185196, 1706339]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [1944976, 1461098, 1168206, 1125413, 1659443, 1545094]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [1334189, 1816930, 1719781, 1011272, 1346157, 1720338]
                        }
                    ]
                })
            },
            landTwo (event) {
                if (typeof event !== 'undefined' && event === 'land1') {
                    clearTimeout(this.timeOut4)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    let that = this
                    that.landFlag = 1
                    this.timeOut4 = setTimeout(function () {
                        that.autoPlayDo()
                        that.landSingle()
                    }, 2000)
                    console.log('%c TEST-schoolClass-手动切换', 'background-color: pink')
                }
                // 小学土地面积
                this.myChartFour5.setOption({
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
                            data: [150902, 102968, 122781, 128966, 115196, 176339]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [19476, 146198, 116806, 112513, 169443, 145094]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [133189, 181690, 171971, 101272, 134157, 172038]
                        }
                    ]
                })
            },
            landThree (event) {
                if (typeof event !== 'undefined' && event === 'land2') {
                    clearTimeout(this.timeOut4)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    let that = this
                    that.landFlag = 2
                    this.timeOut4 = setTimeout(function () {
                        that.autoPlayDo()
                        that.landSingle()
                    }, 2000)
                    console.log('%c TEST-schoolClass-手动切换', 'background-color: pink')
                }
                // 初中土地面积
                this.myChartFour5.setOption({
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
                            data: [109092, 1029628, 1227281, 1281966, 1185196, 170339]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [194476, 146108, 116806, 112543, 1659443, 1545094]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [1334189, 181930, 171781, 101272, 1346157, 1720338]
                        }
                    ]
                })
            },
            landFour (event) {
                if (typeof event !== 'undefined' && event === 'land3') {
                    clearTimeout(this.timeOut4)
                    this.clearAll()
                    this.closeAutoPlayMixin()
                    let that = this
                    that.landFlag = 3
                    this.timeOut4 = setTimeout(function () {
                        that.autoPlayDo()
                        that.landSingle()
                    }, 2000)
                    console.log('%c TEST-schoolClass-手动切换', 'background-color: pink')
                }
                // 高中土地面积
                this.myChartFour5.setOption({
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
                            data: [150092, 1029628, 1227281, 128166, 118596, 1706339]
                        },
                        {
                            name: '绿化用地',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [194976, 1461098, 116206, 1125413, 159443, 1545094]
                        },
                        {
                            name: '占用面积',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [133189, 186930, 1719781, 1011272, 1346157, 172038]
                        }
                    ]
                })
            }
        }
    }
</script>

<style lang="less">
    .school-class {
        width: 100%;
    }

    .color1 {
        color: #fe755f;
        font: bolder 18px "Microsoft YaHei";
        line-height: 30px;
    }

    .color2 {
        color: #845ffe;
        font: bolder 18px "Microsoft YaHei";
        line-height: 30px;
    }

    .color3 {
        color: #13c0aa;
        font: bolder 18px "Microsoft YaHei";
        line-height: 30px;
    }

    .color4 {
        color: #fe68b4;
        font: bolder 18px "Microsoft YaHei";
        line-height: 30px;
    }

    .active {
        background-color: #e2eeff;
    }

    .school-tabs {
        .el-tabs__header {
            .el-tabs__nav-wrap {
                .el-tabs__nav-scroll {
                    .el-tabs__nav {
                        .el-tabs__active-bar {
                            background: none;
                        }
                        .el-tabs__item {
                            height: 45px;
                            font: bold 18px "Microsoft YaHei";
                        }
                    }
                }
            }
        }
    }

    .school-class {
        .dz-header-wrapper .dz-content-wrapper {
            padding: 52px 0px;
        }
    }

    .main-content {
        //学校班级
        .el-table {
            margin-top: 1rem;
        }
        .school-title {
            /*float: left;*/
            margin-bottom: 1rem;
        }
        .school-total {
            margin-bottom: 1rem;
            .el-col {
                width: 260px;
                height: 115px;
                margin: 20px 20px 40px;
                padding: 25px;
                /*padding-bottom: 25px;*/
                div {
                    font-size: 1rem;
                    font-weight: bold;
                }
            }
        }
        .school-echart {
            .el-col {
                float: left;
                margin-left: 1rem;
                margin-bottom: 1rem;
            }
        }
        // 教室统计
        .room-total {
            margin-bottom: 1rem;
            width: 300px;
            float: left;
            .school-shadow {
                height: 60px;
                margin: 20px 20px 40px;
                padding: 25px;
                .content {
                    font-weight: bold;
                    line-height: 30px;
                    font: bolder 18px "Microsoft YaHei";
                }
            }
        }
        .room-echart {
            width: calc(100% - 300px);
            float: right;
            height: 500px;
            margin: 20px 10px 50px -15px;
            .echart-box {
                margin-left: 1rem;
                margin-bottom: 1rem;
                #school-four {
                    height: 500px;
                    padding: 20px;
                }
                .land-echarts-title {
                    width: 100%;
                    text-align: left;
                    padding: 10px 0px 10px 0px;
                    font: bold 18px "Microsoft YaHei";
                    text-align: center;
                }
            }
            .room-echarts-title {
                width: 100%;
                text-align: left;
                padding: 10px 0px 10px 0px;
                font: bold 18px "Microsoft YaHei";
                text-align: center;
            }
        }
        //学校建筑面积
        .build-total {
            margin-top: 86px;
            margin-bottom: 1rem;
            width: 40%;
            min-width: 300px;
            float: left;
            .school-shadow {
                height: 225px;
                width: 225px;
                float: left;
                margin: 10px;
                .content {
                    font-weight: bold;
                    line-height: 30px;
                    font: bolder 18px "Microsoft YaHei";
                }
                &:hover {
                    background-color: #e2eeff;
                }
            }
        }
        .build-echart {
            width: calc(100% - 40%);
            float: right;
            height: 540px;
            margin: 86px 10px 50px -15px;
            .echart-box {
                margin-left: 1rem;
                margin-bottom: 1rem;
                #school-three {
                    height: 540px;
                    padding: 20px;
                }
                .build-echarts-title {
                    width: 100%;
                    text-align: left;
                    padding: 10px 0px 10px 0px;
                    font: bold 18px "Microsoft YaHei";
                    text-align: center;
                }
            }
        }
        //学校土地面积
        .land-total {
            margin-bottom: 1rem;
            width: 300px;
            float: left;
            .school-shadow {
                height: 60px;
                margin: 20px 20px 40px;
                padding: 25px;
                .content {
                    font-weight: bold;
                    line-height: 30px;
                    font: bolder 18px "Microsoft YaHei";
                }
                &:hover {
                    background-color: #e2eeff;
                }
            }
        }
        .land-echart {
            width: calc(100% - 300px);
            float: right;
            height: 500px;
            margin: 20px 10px 50px -15px;
            .echart-box {
                margin-left: 1rem;
                margin-bottom: 1rem;
                #school-four {
                    height: 500px;
                    padding: 20px;
                }
                .land-echarts-title {
                    width: 100%;
                    text-align: left;
                    padding: 10px 0px 10px 0px;
                    font: bold 18px "Microsoft YaHei";
                    text-align: center;
                }
            }
        }
        // 资产统计
        .twoTabs {
            width: 100%;
            min-width: 500px;
            float: right;
            .el-tabs__header {
                .el-tabs__nav-wrap {
                    .el-tabs__nav-scroll {
                        .el-tabs__nav {
                            .el-tabs__active-bar {
                                background: none;
                            }
                            .el-tabs__item {
                                height: 45px;
                                font: bold 14px "Microsoft YaHei";
                            }
                        }
                    }
                }
            }
            .el-tab-pane {
                padding: 0px 65px 20px 0px;
                .echartModel {
                    width: 100%;
                    height: 550px;
                    margin: 10px 25px 0px 50px;
                }
            }
        }
        .asset-echarts-title {
            width: 100%;
            text-align: left;
            padding: 10px 0px 10px 0px;
            font: bold 18px "Microsoft YaHei";
            text-align: center;
        }
    }
</style>
