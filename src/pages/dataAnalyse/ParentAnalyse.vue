<template lang="html">
    <div class="parent-analyse">
        <el-container>
            <el-main>
                <el-tabs tab-position="left" v-model="tabValue" @tab-click="activeChange">
                    <el-tab-pane :label="item.label" v-for="(item, index) in selectedArr" :key="index" >
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
                            <el-breadcrumb-item>家长分析</el-breadcrumb-item>
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
     * '家长分析'页面.
     * @author dz-liuyang-20180506
     */
    import DzHeader from '@/components/DzHeader/DzHeader'

    // 固定不变的数据--用常量
    const color = ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59', '#13c068', '#61a7fd', '#bec013', '#fe5656', '#f8b551', '#686ffe', '#fe68fc', '#fe68fc', '#f19ec2', '#fff65d', '#397efd', '#688bfe', '#fe687a']

    const ALL_SELECT_TYPES = [
        {
            label: '注册家庭数',
            index: 'registeredFamily',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['幼儿园', '小学', '初中', '高中', '其他'],
            unit: '个',
            data: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ],
            dataBili: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ]
        },
        {
            label: '注册家长',
            index: 'registeredParent',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['幼儿园', '小学', '初中', '高中', '其他'],
            unit: '个',
            data: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ],
            dataBili: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ]
        },
        {
            label: '单亲家庭',
            index: 'singleParentFamilies',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['幼儿园', '小学', '初中', '高中', '其他'],
            unit: '个',
            data: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ],
            dataBili: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ]
        },
        {
            label: '监护人关系',
            index: 'guardianRelation',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['父亲', '母亲', '爷爷', '奶奶', '其他'],
            unit: '个',
            data: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ],
            dataBili: [
                [698, 589, 496, 782, 367],
                [856, 842, 563, 486, 369],
                [236, 693, 478, 369, 589],
                [568, 632, 654, 226, 278],
                [548, 963, 620, 368, 369],
                [789, 555, 456, 785, 258],
                [457, 968, 763, 568, 987]
            ]
        },
        {
            label: '家长学历',
            index: 'parentRecord',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['高中以下', '高中', '专科', '本科', '硕士', '博士'],
            unit: '个',
            data: [
                [698, 589, 496, 782, 367, 564],
                [856, 842, 563, 486, 369, 845],
                [236, 693, 478, 369, 589, 695],
                [568, 632, 654, 226, 278, 365],
                [548, 963, 620, 368, 369, 145],
                [789, 555, 456, 785, 258, 243],
                [457, 968, 763, 568, 987, 215]
            ],
            dataBili: [
                [698, 589, 496, 782, 367, 564],
                [856, 842, 563, 486, 369, 845],
                [236, 693, 478, 369, 589, 695],
                [568, 632, 654, 226, 278, 365],
                [548, 963, 620, 368, 369, 145],
                [789, 555, 456, 785, 258, 243],
                [457, 968, 763, 568, 987, 215]
            ]
        },
        {
            label: '家庭收入',
            index: 'familyIncome',
            legend: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            xData: ['6万以下', '6~10万', '10~15万', '15~20万', '20~25万', '30万以上'],
            unit: '个',
            data: [
                [634, 543, 496, 723, 450, 545],
                [810, 812, 563, 412, 390, 789],
                [257, 630, 478, 356, 500, 666],
                [599, 612, 654, 200, 232, 674],
                [543, 800, 620, 345, 356, 134],
                [723, 534, 456, 702, 270, 212],
                [410, 931, 763, 508, 909, 270]
            ],
            dataBili: [
                [634, 543, 496, 723, 450, 545],
                [810, 812, 563, 412, 390, 789],
                [257, 630, 478, 356, 500, 666],
                [599, 612, 654, 200, 232, 674],
                [543, 800, 620, 345, 356, 134],
                [723, 534, 456, 702, 270, 212],
                [410, 931, 763, 508, 909, 270]
            ]
        }
    ]
    export default {
        name: 'ParentAnalyse',
        data () {
            return {
                selectedArr: ALL_SELECT_TYPES,
                labels: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0].label : '',
                params: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0].index : '',
                objects: ALL_SELECT_TYPES && ALL_SELECT_TYPES.length > 0 ? ALL_SELECT_TYPES[0] : {},
                selectIndex: 0, // 选择菜单Index
                Echarts: {}, // 共用echarts画布对象
                navTime: null, // 周期定时器
                durationOneLevel: 25000, // 一级菜单定时器长
                durationTwoLevel: 10000, // 二级菜单定时器长
                layoutTime: null, // 一次性定时器
                tabValue: '0'
            }
        },
        components: {
            'dz-header': DzHeader
        },
        mounted () {
            let _this = this
            // 初始化 对应 echarts
            setTimeout(function () {
                _this.Echarts = _this.$echarts.init(document.getElementById('registeredFamily-container'))
                _this.cavansEcharts()
            }, 100)
            this.tabsInterVal('init')
        },
        destroyed () {
            // 在离开页面时销毁定时器
            clearInterval(this.navTime)
        },
        methods: {
            /**
             * 定时器 （二级菜单内循环）.
             *
             */
            tabsInterVal (param) {
                let _this = this
                this.navTime = setInterval(() => {
                    if (parseInt(_this.tabValue) < 5) {
                        _this.tabValue = (parseInt(_this.tabValue) + 1).toString()
                    } else {
                        _this.tabValue = '0'
                    }
                    this.params = ALL_SELECT_TYPES[this.tabValue].index
                    this.labels = ALL_SELECT_TYPES[this.tabValue].label
                    this.objects = ALL_SELECT_TYPES[this.tabValue]
                    this.selectIndex = this.tabValue
                    // 当客户在一个自动播放时间内点击二级菜单  开启一级菜单自动播放功能
                    if (!param) {
                        if (!this.getAutoPlayMixin()) this.openAutoPlayMixin()
                    }
                    setTimeout(function () {
                        let _id = _this.params + '-container'
                        if (!document.getElementById(_id)) return
                        // 清除上一次缓存画布
                        _this.Echarts.clear()
                        _this.Echarts = _this.$echarts.init(document.getElementById(_id))
                        _this.cavansEcharts()
                    }, 100)
                }, this.durationTwoLevel)
            },
            /**
             *  切换二级菜单.
             *  @param {abject} 二级菜单Item 对应数据
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
                clearInterval(_this.navTime)
                clearTimeout(this.layoutTime)
                // 当客户点击二级菜单 关闭一级菜单自动播放功能
                if (this.getAutoPlayMixin()) this.closeAutoPlayMixin()
                this.layoutTime = setTimeout(function () {
                    _this.tabsInterVal()
                }, this.durationOneLevel)

                setTimeout(function () {
                    let _id = _this.params + '-container'
                    // 清除上一次缓存画布
                    _this.Echarts.clear()
                    _this.Echarts = _this.$echarts.init(document.getElementById(_id))
                    _this.cavansEcharts()
                }, 100)
            },
            /**
             *  绘制图表.
             */
            cavansEcharts () {
                let dataMap = {}
                let _dataBili = []
                let _datas = []
                let _this = this
                dataMap.dataGirl = ALL_SELECT_TYPES[this.selectIndex].data
                dataMap.dataBili = ALL_SELECT_TYPES[this.selectIndex].dataBili
                dataMap.dataBili.forEach(function (elem, index) {
                    _datas = []
                    ALL_SELECT_TYPES[_this.selectIndex].xData.forEach(function (el, i) {
                        let _objx = {
                            name: el,
                            value: elem[i]
                        }
                        _datas.push(_objx)
                    })
                    let _obj = {
                        title: {text: ALL_SELECT_TYPES[_this.selectIndex].legend[index] + '各阶段在校学生' + ALL_SELECT_TYPES[_this.selectIndex].label},
                        series: [
                            {
                                data: dataMap.dataGirl[index]
                            },
                            {
                                data: _datas
                            }
                        ]
                    }
                    _dataBili.push(_obj)
                })
                let option = {
                    baseOption: {
                        color: color,
                        timeline: {
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 3000,
                            data: [
                                '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01'
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
                            data: [ALL_SELECT_TYPES[_this.selectIndex].label],
                            show: false,
                            selected: {
                                '注册家庭数': true
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
                                'data': ALL_SELECT_TYPES[_this.selectIndex].xData,
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: ALL_SELECT_TYPES[_this.selectIndex].label + '（' + ALL_SELECT_TYPES[_this.selectIndex].unit + '）',
                                max: 1100
                            }
                        ],
                        series: [
                            {
                                name: ALL_SELECT_TYPES[_this.selectIndex].label,
                                type: 'bar',
                                barWidth: 30,
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
                                }
                            },
                            {
                                name: '各层次' + ALL_SELECT_TYPES[_this.selectIndex].label + '数量占比',
                                type: 'pie',
                                center: ['75%', '20%'],
                                radius: '20%'
                            }
                        ]
                    },
                    options: _dataBili
                }
                this.Echarts.setOption(option)
            }
        }
    }
</script>
<style lang="less">
    @bgcolor: #e0e0e0;
    @bgsuccess: #4caf50;
    /* 局部 */
    .parent-analyse{
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
