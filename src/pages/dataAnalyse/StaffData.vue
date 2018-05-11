<template lang="html">
    <div class="staff-data">
        <el-container>
            <el-main>
                <el-tabs tab-position="left" v-model="tabValue" @tab-click="activeChange">
                    <el-tab-pane :label="item.label" v-for="(item, index) in selectedArr" :key="index" >
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>教职工信息</el-breadcrumb-item>
                            <el-breadcrumb-item>{{labels}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="staff-body">
                            <div :id="item.index + '-container'" class="canvas-box"></div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    /**
     * '教职工数据'页面.
     * @author dz-liuyang-20180502
     */
    import DzHeader from '@/components/DzHeader/DzHeader'

    // 固定不变的数据--用常量
    const color = ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59', '#13c068', '#61a7fd', '#bec013', '#fe5656', '#f8b551', '#686ffe', '#fe68fc', '#fe68fc', '#f19ec2', '#fff65d', '#397efd', '#688bfe', '#fe687a']

    const ALL_SELECT_TYPES = [
        {
            label: '教职员工',
            index: 'staffs',
            type: 'stack',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 157, 162, 165, 168, 170, 180]
                },
                {
                    name: '小学',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                            color: 'yellow'
                        }},
                    data: [102, 102, 105, 110, 112, 115, 116]
                },
                {
                    name: '初中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [91, 91, 92, 93, 95, 95, 96]
                },
                {
                    name: '高中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [86, 86, 86, 87, 87, 87, 87]
                }
            ]
        }, {
            label: '行政人员',
            index: 'administrativePersonnel',
            type: 'stack',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [3010, 3142, 3145, 3151, 3154, 3054, 3014]
                },
                {
                    name: '小学',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                            color: 'yellow'
                        }},
                    data: [3604, 3754, 3865, 3914, 4101, 4201, 4310]
                },
                {
                    name: '初中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [2583, 2569, 2894, 2944, 3145, 3321, 3241]
                },
                {
                    name: '高中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [2451, 2561, 2745, 2864, 2945, 2875, 2942]
                }
            ]
        }, {
            label: '工勤人员',
            index: 'logisticsPersonnel',
            type: 'superposition',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [1042, 1125, 1345, 1425, 1375, 1478, 1574]
                },
                {
                    name: '小学',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [1562, 1785, 1425, 1564, 1541, 1646, 1475]
                },
                {
                    name: '初中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [1021, 1091, 951, 1102, 1153, 1186, 1187]
                },
                {
                    name: '高中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [851, 847, 758, 821, 814, 784, 803]
                }
            ]
        }, {
            label: '兼任教师',
            index: 'partTimeTeacher',
            type: 'movements',
            legend: ['小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [{
                name: '小学',
                type: 'line',
                data: [41, 48, 60, 86, 95, 135]
            }, {
                name: '初中',
                type: 'line',
                data: [61, 48, 60, 96, 195, 115]
            }, {
                name: '高中',
                type: 'line',
                data: [11, 68, 160, 186, 195, 235]
            }]
        }, {
            label: '教辅人员',
            index: 'assistantTeacher',
            type: 'superposition',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [620, 302, 321, 134, 330, 430, 120]
                },
                {
                    name: '小学',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [160, 122, 201, 234, 190, 130, 250]
                },
                {
                    name: '初中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [200, 282, 91, 34, 90, 130, 410]
                },
                {
                    name: '高中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [140, 242, 221, 124, 90, 230, 410]
                }
            ]
        }, {
            label: '专任教师',
            index: 'fullTimeTeacher',
            type: 'stack',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [642, 614, 632, 685, 612, 654, 754]
                },
                {
                    name: '小学',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                            color: 'yellow'
                        }},
                    data: [1420, 1521, 1412, 1462, 1325, 1378, 1458]
                },
                {
                    name: '初中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [1562, 1675, 1741, 1702, 1756, 1845, 1795]
                },
                {
                    name: '高中',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [1845, 1758, 1865, 1874, 1867, 1945, 2015]
                }
            ]
        }, {
            label: '代课教师',
            index: 'substituteTeacher',
            type: 'superposition',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [
                {
                    name: '幼儿园',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '小学',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '初中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '高中',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 40, // 柱图宽度
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                }
            ]
        }, {
            label: '教职工性别比例',
            index: 'teacherSexRatio',
            type: 'combination'
        }, {
            label: '教职员工属性',
            index: 'teacherProperty',
            type: 'manyTypeCombination'
        }, {
            label: '教师政治面貌',
            index: 'teacherPoliticalLandscape',
            type: 'circle',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['共青团员', '共产党员', '其他'],
            data: [
                [789, 555, 456],
                [457, 968, 763],
                [623, 682, 569],
                [600, 656, 780]
            ]
        }, {
            label: '专任教师学历',
            index: 'fullTimeTeacherEducation',
            color: color,
            type: 'ManyLaps',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['研究生毕业', '本科毕业', '专科毕业', '高中阶段毕业', '高中阶段及以下'],
            data: [
                [789, 555, 456, 785, 434],
                [457, 968, 763, 568, 98],
                [623, 682, 569, 487, 57],
                [600, 656, 780, 845, 68]
            ]
        }, {
            label: '专任教师年龄',
            index: 'fullTimeTeacherAge',
            type: 'ManyLaps',
            legend: ['幼儿园', '小学', '初中', '高中'],
            xData: ['25以下', '26~30', '31~35', '36~40', '41~45', '46~50', '51~55', '56~60', '61以上'],
            data: [
                [789, 555, 456, 785, 434, 265, 366, 421, 60],
                [457, 968, 763, 568, 98, 366, 355, 212, 158],
                [623, 682, 569, 487, 57, 221, 362, 145, 847],
                [600, 656, 780, 845, 68, 156, 369, 784, 28]
            ]
        }, {
            label: '增减专任教师',
            index: 'addReduceFullTimeTeacher',
            type: 'movements',
            legend: ['小学', '初中', '高中'],
            xData: ['2013', '2014', '2015', '2016', '2017', '2018'],
            data: [{
                name: '小学',
                type: 'line',
                data: [21, 38, 40, 56, 75, 135]
            }, {
                name: '初中',
                type: 'line',
                data: [31, 58, 30, 26, 115, 215]
            }, {
                name: '高中',
                type: 'line',
                data: [21, 65, 120, 186, 145, 135]
            }]
        }
    ]

    export default {
        name: 'StaffData',
        data () {
            return {
                selectedArr: ALL_SELECT_TYPES,
                labels: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0].label : '',
                params: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0].index : '',
                objects: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0] : {},
                // 页面分类
                classification: {
                    stack: ['staffs', 'fullTimeTeacher', 'administrativePersonnel'], // 堆叠
                    superposition: ['assistantTeacher', 'logisticsPersonnel', 'substituteTeacher'], // 叠加
                    movements: ['partTimeTeacher', 'addReduceFullTimeTeacher'], // 走势
                    combination: ['teacherSexRatio'], // 组合图
                    ManyLaps: ['fullTimeTeacherAge', 'fullTimeTeacherEducation', 'teacherPoliticalLandscape'], // 多圈图
                    manyTypeCombination: ['teacherProperty'] // 多类型组合图
                },
                selectIndex: 0, // 选择菜单Index
                navTime: null, // 周期定时器
                layoutTime: null, // 一次性定时器
                durationOneLevel: 25000, // 一级菜单定时器长
                durationTwoLevel: 10000, // 二级菜单定时器长
                tabValue: 0 // 选择菜单Index (双向绑定)
            }
        },
        mounted () {
            let _this = this
            // 初始化 对应 echarts
            setTimeout(function () {
                let _echarts = _this.$echarts.init(document.getElementById('staffs-container'))
                _this.cavansEcharts(_echarts)
            }, 100)
            this.tabsInterVal('init')
        },
        destroyed () {
            // 在离开页面时销毁定时器
            clearInterval(this.navTime)
            clearTimeout(this.layoutTime)
        },
        methods: {
            /**
             * 定时器 （二级菜单内循环）.
             *
             */
            tabsInterVal (param) {
                let _this = this
                this.navTime = setInterval(() => {
                    if (parseInt(_this.tabValue) < 12) {
                        _this.tabValue = (parseInt(_this.tabValue) + 1).toString()
                    } else {
                        _this.tabValue = '0'
                    }
                    // 获取对应的英文参数
                    this.params = ALL_SELECT_TYPES[this.tabValue].index
                    // 获取对应的 label
                    this.labels = ALL_SELECT_TYPES[this.tabValue].label
                    // 获取对应的 整个对象数据
                    this.objects = ALL_SELECT_TYPES[this.tabValue]
                    // 获取对应的 整个对象数据
                    this.selectIndex = this.tabValue
                    // 当客户在一个自动播放时间内点击二级菜单  开启一级菜单自动播放功能
                    if (!param) {
                        if (!this.getAutoPlayMixin()) this.openAutoPlayMixin()
                    }

                    setTimeout(function () {
                        let _id = _this.params + '-container'
                        if (!document.getElementById(_id)) return
                        let _echarts = _this.$echarts.init(document.getElementById(_id))
                        _this.cavansEcharts(_echarts)
                    }, 100)
                }, this.durationTwoLevel)
            },
            /**
             *  切换二级菜单.
             *  @param {Object} 二级菜单Item 对应数据
             */
            activeChange (param) {
                let _this = this
                // 获取对应的英文参数
                this.params = ALL_SELECT_TYPES[param.index].index
                // 获取对应的 label
                this.labels = ALL_SELECT_TYPES[param.index].label
                // 获取对应的 整个对象数据
                this.objects = ALL_SELECT_TYPES[param.index]
                // 二级菜单下标 （用于切换状态）
                this.selectIndex = param.index
                // 二级菜单下标 （用于定时器状态切换）
                this.tabValue = param.index

                // 当客户点击菜单时延长45秒 执行播放功能
                clearInterval(this.navTime)
                clearTimeout(this.layoutTime)
                // 当客户点击二级菜单 关闭一级菜单自动播放功能
                if (this.getAutoPlayMixin()) this.closeAutoPlayMixin()
                this.layoutTime = setTimeout(function () {
                    _this.tabsInterVal()
                }, this.durationOneLevel)
                // 直接渲染页面
                // 获取对应 ID
                setTimeout(function () {
                    let _id = _this.params + '-container'
                    // 初始化 对应 echarts
                    let _echarts = _this.$echarts.init(document.getElementById(_id))
                    // 清除上一次缓存画布
                    _echarts.clear()
                    _this.cavansEcharts(_echarts)
                }, 100)
            },
            /**
             *  绘制图表.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            cavansEcharts (_echarts) {
                // 兼任教师 增减专任教师
                if (IsInArray(this.classification.movements, this.params)) {
                    this.movementsEcharts(_echarts)
                }
                // 教职员工 专任教师 行政人员
                if (IsInArray(this.classification.stack, this.params)) {
                    this.stackEcharts(_echarts)
                }
                // 教辅人员 工勤人员 代课教师
                if (IsInArray(this.classification.superposition, this.params)) {
                    this.superpositionEcharts(_echarts)
                }
                // 教师性别比例
                if (IsInArray(this.classification.combination, this.params)) {
                    this.combinationEcharts(_echarts)
                }
                // 专任教师年龄 专任教师学历 教师政治面貌
                if (IsInArray(this.classification.ManyLaps, this.params)) {
                    this.ManyLapseEcharts(_echarts)
                }
                // 教职员工属性
                if (IsInArray(this.classification.manyTypeCombination, this.params)) {
                    this.manyTypeCombinationEcharts(_echarts)
                }
            },
            /**
             *  绘制兼任教师 增减专任教师.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            movementsEcharts (_echarts) {
                let option = {
                    color: color,
                    title: {
                        text: ALL_SELECT_TYPES[this.selectIndex].label + '（个）'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ALL_SELECT_TYPES[this.selectIndex].legend
                    },
                    toolbox: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: ALL_SELECT_TYPES[this.selectIndex].xData
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: ALL_SELECT_TYPES[this.selectIndex].data
                }
                _echarts.setOption(option, true)
            },
            /**
             *  绘制教职员工 专任教师 行政人员.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            stackEcharts (_echarts) {
                let option = {
                    color: color,
                    title: {
                        text: ALL_SELECT_TYPES[this.selectIndex].label + '（个）'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ALL_SELECT_TYPES[this.selectIndex].legend
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
                            data: ALL_SELECT_TYPES[this.selectIndex].xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: ALL_SELECT_TYPES[this.selectIndex].data
                }
                _echarts.setOption(option)
            },
            /**
             *  绘制教辅人员 工勤人员 代课教师.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            superpositionEcharts (_echarts) {
                let option = {
                    color: color,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: ''
                        }
                    },
                    title: {
                        text: ALL_SELECT_TYPES[this.selectIndex].label + '（个）'
                    },
                    legend: {
                        data: ALL_SELECT_TYPES[this.selectIndex].legend
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ALL_SELECT_TYPES[this.selectIndex].xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: ALL_SELECT_TYPES[this.selectIndex].data
                }
                _echarts.setOption(option)
            },
            /**
             *  绘制教师性别比例.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            combinationEcharts (_echarts) {
                let dataMap = {}
                function dataFormatter (obj) {
                    var pList = ['幼儿园', '小学', '初中', '高中']
                    var temp
                    for (var year = 2010; year <= 2018; year++) {
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
                }

                dataMap.dataGirl = dataFormatter({
                    // max : 60000,
                    2018: [698, 589, 496, 782],
                    2017: [856, 842, 563, 486],
                    2016: [236, 693, 478, 369],
                    2015: [568, 632, 654, 226],
                    2014: [548, 963, 620, 368],
                    2013: [789, 555, 456, 785],
                    2012: [457, 968, 763, 568],
                    2011: [623, 682, 569, 487],
                    2010: [600, 656, 780, 845]
                })
                dataMap.dataBoy = dataFormatter({
                    // max : 60000,
                    2018: [589, 578, 369, 875],
                    2017: [568, 369, 852, 741],
                    2016: [875, 369, 854, 756],
                    2015: [526, 785, 369, 487],
                    2014: [365, 852, 456, 478],
                    2013: [236, 478, 584, 356],
                    2012: [696, 639, 569, 789],
                    2011: [603, 956, 456, 555],
                    2010: [500, 496, 582, 369]
                })
                dataMap.dataBili = [
                    [4000, 4256], [3500, 3656], [4020, 4456], [4130, 4456], [4540, 4286], [4030, 4456], [4031, 4656], [4120, 4656], [4500, 4856]
                ]
                let option = {
                    baseOption: {
                        color: color,
                        timeline: {
                            // y: 0,
                            axisType: 'category',
                            // realtime: false,
                            // loop: false,
                            autoPlay: true,
                            // currentIndex: 2,
                            playInterval: 1000,
                            // controlStyle: {
                            //     position: 'left'
                            // },
                            data: [
                                '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01'
                            ],
                            label: {
                                formatter: function (s) {
                                    return (new Date(s)).getFullYear()
                                }
                            }
                        },
                        title: {
                            subtext: ''
                        },
                        tooltip: {},
                        legend: {
                            x: 'right',
                            data: ['女生', '男生'],
                            selected: {
                                '女生': true, '男生': true
                            }
                        },
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
                                    '幼儿园', '小学', '初中', '高中'
                                ],
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '男-女对比',
                                max: 1100
                            }
                        ],
                        series: [
                            {
                                name: '女生',
                                type: 'bar',
                                barWidth: 30
                            },
                            {
                                name: '男生',
                                type: 'bar',
                                barWidth: 30
                            },
                            {
                                name: '男-女占比',
                                type: 'pie',
                                center: ['75%', '25%'],
                                radius: '20%'
                            }
                        ]
                    },
                    options: [
                        {
                            title: {text: '2010男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2010']},
                                {data: dataMap.dataBoy['2010']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[0][0]},
                                        {name: '男生', value: dataMap.dataBili[0][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2011男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2011']},
                                {data: dataMap.dataBoy['2011']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[1][0]},
                                        {name: '男生', value: dataMap.dataBili[1][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2012男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2012']},
                                {data: dataMap.dataBoy['2012']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[2][0]},
                                        {name: '男生', value: dataMap.dataBili[2][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2013男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2013']},
                                {data: dataMap.dataBoy['2013']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[3][0]},
                                        {name: '男生', value: dataMap.dataBili[3][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2014男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2014']},
                                {data: dataMap.dataBoy['2014']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[4][0]},
                                        {name: '男生', value: dataMap.dataBili[4][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2015男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2015']},
                                {data: dataMap.dataBoy['2015']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[5][0]},
                                        {name: '男生', value: dataMap.dataBili[5][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2016男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2016']},
                                {data: dataMap.dataBoy['2016']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[6][0]},
                                        {name: '男生', value: dataMap.dataBili[6][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2017男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2017']},
                                {data: dataMap.dataBoy['2017']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[7][0]},
                                        {name: '男生', value: dataMap.dataBili[7][1]}
                                    ]}
                            ]
                        },
                        {
                            title: {text: '2018男女人数指标'},
                            series: [
                                {data: dataMap.dataGirl['2017']},
                                {data: dataMap.dataBoy['2017']},
                                {data: [
                                        {name: '女生', value: dataMap.dataBili[8][0]},
                                        {name: '男生', value: dataMap.dataBili[8][1]}
                                    ]}
                            ]
                        }
                    ]
                }
                _echarts.setOption(option)
            },
            /**
             *  绘制专任教师年龄 专任教师学历 教师政治面貌.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            ManyLapseEcharts (_echarts) {
                let _options = []
                let _this = this
                ALL_SELECT_TYPES[this.selectIndex].legend.forEach(function (elem, index) {
                    let _obj = {
                        title: {
                            text: elem + ALL_SELECT_TYPES[_this.selectIndex].label + '情况'
                        },
                        series: [
                            {
                                data: ALL_SELECT_TYPES[_this.selectIndex].data[index]
                            }
                        ]
                    }
                    _options.push(_obj)
                })
                let option = {
                    baseOption: {
                        color: color,
                        timeline: {
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 2000,
                            data: ALL_SELECT_TYPES[this.selectIndex].legend,
                            label: {
                                formatter: function (s) {
                                    return s
                                }
                            }
                        },
                        title: {
                            subtext: ''
                        },
                        legend: {
                            show: false
                        },
                        calculable: true,
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '10%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                'type': 'category',
                                'axisLabel': {'interval': 0},
                                'data': ALL_SELECT_TYPES[this.selectIndex].xData,
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '',
                                max: 1100
                            }
                        ],
                        series: [
                            {
                                name: ALL_SELECT_TYPES[this.selectIndex].label,
                                type: 'bar',
                                barWidth: 30, // 柱图宽度
                                itemStyle: {
                                    normal: {
                                        // 随机显示
                                        // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                                        color: function (params) {
                                            let colorList = color
                                            return colorList[params.dataIndex]
                                        },
                                        barBorderRadius: [15, 15, 15, 15]
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#efefef',
                                        position: 'insideTop'
                                    }
                                }
                            }
                        ]
                    },
                    options: _options
                }
                _echarts.setOption(option)
            },
            /**
             *  绘制教职员工属性.
             *  @param {Object} 根据二级菜单生成 初始化的画布对象
             */
            manyTypeCombinationEcharts (_echarts) {
                let TeacherBuilderJson = {
                    'all': 50000,
                    'primarySchool': {
                        '专任教师': 45008,
                        '行政人员': 4330,
                        '教辅人员': 4123,
                        '工勤人员': 2886,
                        '科研机构人员': 482,
                        '其他附设机构人员': 310,
                        '代课教师': 7974,
                        '兼任教师': 375,
                        '安全保卫人员': 361
                    },
                    'juniorHighSchool': {
                        '专任教师': 45008,
                        '行政人员': 4330,
                        '教辅人员': 4123,
                        '工勤人员': 2886,
                        '科研机构人员': 482,
                        '其他附设机构人员': 310,
                        '代课教师': 7974,
                        '兼任教师': 375,
                        '安全保卫人员': 361
                    },
                    'highSchool': {
                        '专任教师': 45008,
                        '行政人员': 4330,
                        '教辅人员': 4123,
                        '工勤人员': 2886,
                        '科研机构人员': 482,
                        '其他附设机构人员': 310,
                        '代课教师': 7974,
                        '兼任教师': 375,
                        '安全保卫人员': 1361
                    },
                    'ie': 9743
                }

                let primarySchoolTeacher = {
                    '专任教师': 45008,
                    '行政人员': 4330,
                    '教辅人员': 4123,
                    '工勤人员': 2886,
                    '科研机构人员': 482,
                    '其他附设机构人员': 310,
                    '代课教师': 7974,
                    '兼任教师': 375,
                    '安全保卫人员': 361
                }

                let juniorHighSchoolTeacher = {
                    '专任教师': 45008,
                    '行政人员': 4330,
                    '教辅人员': 4123,
                    '工勤人员': 2886,
                    '科研机构人员': 482,
                    '其他附设机构人员': 310,
                    '代课教师': 7974,
                    '兼任教师': 375,
                    '安全保卫人员': 361
                }
                let highSchoolTeacher = {
                    '专任教师': 45008,
                    '行政人员': 4330,
                    '教辅人员': 4123,
                    '工勤人员': 2886,
                    '科研机构人员': 482,
                    '其他附设机构人员': 310,
                    '代课教师': 7974,
                    '兼任教师': 375,
                    '安全保卫人员': 361
                }

                let option = {
                    color: color,
                    tooltip: {

                    },
                    title: [{
                        text: '教职员工属性',
                        subtext: '',
                        x: '25%',
                        textAlign: 'center'
                    }, {
                        text: '小学教职员工属性比例',
                        subtext: '',
                        x: '75%',
                        textAlign: 'center'
                    }, {
                        text: '初中教职员工属性比例',
                        subtext: '',
                        x: '75%',
                        y: '30%',
                        textAlign: 'center'
                    }, {
                        text: '高中教职员工属性比例',
                        subtext: '',
                        x: '75%',
                        y: '60%',
                        textAlign: 'center'
                    }],
                    grid: [{
                        top: 30,
                        width: '50%',
                        bottom: '70%',
                        left: 10,
                        containLabel: true
                    }, {
                        top: '35%',
                        width: '50%',
                        bottom: '40%',
                        left: 10,
                        containLabel: true
                    }, {
                        top: '65%',
                        width: '50%',
                        bottom: '10%',
                        left: 10,
                        containLabel: true
                    }],
                    xAxis: [{
                        type: 'value',
                        max: TeacherBuilderJson.all,
                        splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        max: TeacherBuilderJson.all,
                        gridIndex: 1,
                        splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        max: TeacherBuilderJson.all,
                        gridIndex: 2,
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(TeacherBuilderJson.primarySchool),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }, {
                        gridIndex: 1,
                        type: 'category',
                        data: Object.keys(TeacherBuilderJson.juniorHighSchool),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }, {
                        gridIndex: 2,
                        type: 'category',
                        data: Object.keys(TeacherBuilderJson.juniorHighSchool),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'primarySchool',
                        z: 3,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 5, 5]
                                /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#f7734e'
                                }, {
                                    offset: 1,
                                    color: '#e12945'
                                }]) */
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.primarySchool).map(function (key) {
                            return TeacherBuilderJson.primarySchool[key]
                        })
                    }, {
                        type: 'bar',
                        stack: 'primarySchool',
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.primarySchool).map(function (key) {
                            return TeacherBuilderJson.all - TeacherBuilderJson.primarySchool[key]
                        })
                    }, {
                        type: 'bar',
                        stack: 'juniorHighSchool',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        z: 3,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 5, 5]
                               /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#96d668'
                                }, {
                                    offset: 1,
                                    color: '#01babc'
                                }]) */
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.juniorHighSchool).map(function (key) {
                            return TeacherBuilderJson.juniorHighSchool[key]
                        })
                    }, {
                        type: 'bar',
                        stack: 'juniorHighSchool',
                        silent: true,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.juniorHighSchool).map(function (key) {
                            return TeacherBuilderJson.all - TeacherBuilderJson.juniorHighSchool[key]
                        })
                    }, {
                        type: 'bar',
                        stack: 'highSchool',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        z: 3,
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 5, 5]
                                /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#1a98f8'
                                }, {
                                    offset: 1,
                                    color: '#7049f0'
                                }]) */
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.highSchool).map(function (key) {
                            return TeacherBuilderJson.highSchool[key]
                        })
                    }, {
                        type: 'bar',
                        stack: 'highSchool',
                        silent: true,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(TeacherBuilderJson.highSchool).map(function (key) {
                            return TeacherBuilderJson.all - TeacherBuilderJson.highSchool[key]
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '15%'],
                        center: ['80%', '20%'],
                        data: Object.keys(primarySchoolTeacher).map(function (key) {
                            return {
                                name: key.replace('.js', ''),
                                value: primarySchoolTeacher[key]
                            }
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '15%'],
                        center: ['80%', '50%'],
                        data: Object.keys(juniorHighSchoolTeacher).map(function (key) {
                            return {
                                name: key.replace('.js', ''),
                                value: juniorHighSchoolTeacher[key]
                            }
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '15%'],
                        center: ['80%', '80%'],
                        data: Object.keys(highSchoolTeacher).map(function (key) {
                            return {
                                name: key.replace('.js', ''),
                                value: highSchoolTeacher[key]
                            }
                        })
                    }]
                }
                _echarts.setOption(option)
            }

        },
        components: {
            'dz-header': DzHeader
        }
    }
    function IsInArray (arr, val) {
        var testStr = ',' + arr.join(',') + ','
        return testStr.indexOf(',' + val + ',') !== -1
    }
</script>

<style lang="less">
    @bgcolor: #e0e0e0;
    @bgsuccess: #4caf50;
    /* 局部 */
    .staff-data{
        position: relative;
        width: 100%;
        .el-tabs__content{
            position: relative;
            .el-breadcrumb{
                position: absolute;
                left: 18px;
                top: 0;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #ededed;
                width: calc(100% - 66px);
                /*width: 100%;*/
            }
        }

        .el-container{
            background-color: #f2f5fa;
            .el-main{
                padding: 52px 0 0;
                .staff-header-select{
                    width: 100%;
                    height: auto;
                    border-bottom: 1px solid #ededed;
                    .staff-item{
                        display: block;
                        min-width: 150px;
                        height: 30px;
                        float: left;
                        font-size: 18px;
                        font-weight: 600;
                        padding-left: 10px;
                        padding-right: 10px;
                        text-align: left;
                        cursor: pointer;
                        margin-bottom: 20px;
                    }
                    .active{
                        color: #3c90ff;
                    }
                }
                .staff-body{
                    width: calc(100% - 210px);
                    height: 636px;
                    border: 1px solid #ecf4ff;
                    margin-top: 40px;
                    margin-left: 20px;
                    margin-right: 20px;
                    border-radius: 10px;
                    padding: 50px 70px;
                    margin-top: 70px;
                    margin-bottom: 50px;
                    -moz-box-shadow:1px 1px 13px #eff6ff;
                    -webkit-box-shadow:1px 1px 13px #eff6ff;
                    box-shadow:1px 1px 13px #eff6ff;
                    .canvas-box{
                        width: 100%;
                        height: 100%;

                    }
                }
                .el-tabs--left .el-tabs__item.is-left{
                    text-align: left;
                    height: 60px;
                    line-height: 60px;
                    padding: 0 44px;
                }
                .el-tabs__item.is-active{
                    background-color: #e2eeff;
                    color: #3c90ff;
                }
                .el-tabs__header.is-left{
                    width: 277px;

                }
            }
        }

        .el-header{
            width: 100%;
        }
        .local-paging {
            margin-top: 30px;
        }
        .el-table::before{
            height: 0;
        }
        .button-right{
            text-align: right;
        }
    }
</style>
