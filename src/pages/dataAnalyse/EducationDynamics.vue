<template>
    <div class="education-dynamics" style="width:100%;">
        <div slot="content">
            <div class="exam-content" style="width:100%">
                <el-container class="midterm-exam-content">
                    <el-aside width="289px">
                        <div class="search-tree-box">
                            <el-input
                                class="dynamics-search"
                                placeholder="请输入学校或年级"
                                v-model="searchText">
                                <i slot="suffix" class="search-icon"></i>
                            </el-input>
                            <p class="area">{{area}}</p>
                            <el-tree
                                :data="schoolTreeData"
                                node-key="id"
                                ref="school-tree"
                                highlight-current
                                default-expand-all
                                class="dynamics-tree"
                                :props="defaultProps">
                            </el-tree>
                        </div>
                    </el-aside>
                    <el-main class="education-dynamics-main">
                        <el-tabs class="education-dynamics-tabs"  @tab-click="handleTabClick" v-model="activeTabName">
                            <el-tab-pane label="教职工出勤分析" name="teacher-attendence-anal">
                                <div class="attendence-card-box fn-clear">
                                    <div class="attendence-card-item" v-for="(value,key) in teacherAttendence[activeType]" v-if="key!='total'" :key="key">
                                        <p class="label">{{(schoolTypeName[activeType]?(schoolTypeName[activeType]+'教师'):'') + attendenceTypeName[key]}}</p>
                                        <p class="times" :class="key"><span class="num">{{value}}</span>次</p>
                                    </div>
                                </div>
                                <div class="nav-box" v-if="isSchoolTypeNormal">
                                    <el-button v-for="(item,index) in schoolType" :class="item.isActive?'active':''" class="nav-button" @click="handleSchoolType(item.type)" :key="index">
                                        {{schoolTypeName[item.type]}}
                                    </el-button>
                                </div>
                                <div class="pie-box">
                                    <div class="pie-item" id="teacher-attendence-pie">幼儿园出勤分析</div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="学生出勤分析" name="student-attendence-anal">
                                <div class="attendence-card-box fn-clear">
                                    <div class="attendence-card-item" v-for="(value,key) in studentAttendence[activeType]" v-if="key!='total'" :key="key">
                                        <p class="label">{{(schoolTypeName[activeType]?(schoolTypeName[activeType]+'学生'):'') + attendenceTypeName[key]}}</p>
                                        <p class="times" :class="key"><span class="num">{{value}}</span>次</p>
                                    </div>
                                </div>
                                <div class="nav-box" v-if="isSchoolTypeNormal">
                                    <el-button v-for="(item,index) in schoolType" :class="item.isActive?'active':''"  @click="handleSchoolType(item.type)" class="nav-button" :key="index">
                                        {{schoolTypeName[item.type]}}
                                    </el-button>
                                </div>
                                <div class="pie-box">
                                    <div class="pie-item" id="student-attendence-pie"></div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="学生期中考试通过率" name="midterm-pass-rate" class="midterm-pass-rate">
                                <div class="pass-rate-left">
                                    <div class="passing-the-exam-item" v-for="(midItem,key) in midExam" :key="key">
                                        <p class="passing-the-exam-title">{{schoolTypeName[key]}}考试通过</p>
                                        <p class="passing-the-exam-times" :class="schoolTypeNameEn[key]">{{midItem.num}}人</p>
                                    </div>
                                </div>
                                <div class="midterm-pass-rate-echarts">
                                    <div class="pass-rate-echarts" id="mid-bar"></div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="学生期末考试通过率" name="ending-pass-rate" class="ending-pass-rate">
                                <div class="pass-rate-left">
                                    <div class="passing-the-exam-item" v-for="(midItem,key) in finalExam" :key="key">
                                        <p class="passing-the-exam-title">{{schoolTypeName[key]}}考试通过</p>
                                        <p class="passing-the-exam-times" :class="schoolTypeNameEn[key]">{{midItem.num}}人</p>
                                    </div>
                                </div>
                                <div class="ending-pass-rate-echarts">
                                    <div class="pass-rate-echarts" id="final-bar"></div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 教育动态页面
 * @author dz-Drbeo dz-liujingyan 20180503
 */
import DzSearchData from '@/components/DzSearchData'
import DzPager from '@/components/DzPager'
import DzHeader from '@/components/DzHeader/DzHeader'
import DzFooter from '@/components/DzFooter'
import DzDialog from '@/components/DzDialog'
import dz from '@/functions/common'
import echarts from 'echarts'
// import liquidfill from 'echarts-liquidfill'
require('echarts-liquidfill')

const schoolTypeName = {
    '1': '幼儿园',
    '2': '小学',
    '3': '初中',
    '4': '高中'
}

const schoolTypeNameEn = {
    '1': 'kindergarten',
    '2': 'primary-school',
    '3': 'junior-school',
    '4': 'high-school'
}

const attendenceTypeName = {
    late: '迟到',
    early: '早退',
    absence: '缺勤',
    leave: '请假'
}

const imageUrls = [
    'image:///static/images/leave.png',
    'image:///static/images/absence.png',
    'image:///static/images/early.png',
    'image:///static/images/late.png'
]

export default {
    components: { DzSearchData, DzPager, DzHeader, DzFooter, DzDialog },
    name: 'studentsMidtermExamPassRate',
    data () {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            activeTabName: 'teacher-attendence-anal',
            // 搜索参数
            searchText: '',
            area: '重庆市各区县学校概览',
            schoolTreeData: [],
            // 学校类型名称
            schoolTypeName: schoolTypeName,
            schoolTypeNameEn: schoolTypeNameEn,
            // 当前学校类型
            schoolType: [
                {
                    type: 1,
                    isActive: true
                },
                {
                    type: 2,
                    isActive: false
                },
                {
                    type: 3,
                    isActive: false
                },
                {
                    type: 4,
                    isActive: false
                }
            ],
            // 当前
            activeType: 1,
            // 学校类型是否属于1234
            isSchoolTypeNormal: true,
            attendenceTypeName: attendenceTypeName,
            teacherAttendence: {
                '0': {
                    late: '5',
                    early: '1',
                    absence: '2',
                    leave: '1',
                    total: '50'
                },
                '1': {
                    late: '11',
                    early: '83',
                    absence: '142',
                    leave: '189',
                    total: '3000'
                },
                '2': {
                    late: '13',
                    early: '24',
                    absence: '30',
                    leave: '51',
                    total: '3000'
                },
                '3': {
                    late: '92',
                    early: '11',
                    absence: '24',
                    leave: '56',
                    total: '3000'
                },
                '4': {
                    late: '63',
                    early: '75',
                    absence: '81',
                    leave: '33',
                    total: '3000'
                }
            },
            studentAttendence: {
                '0': {
                    late: '5',
                    early: '1',
                    absence: '2',
                    leave: '1',
                    total: '50'
                },
                '1': {
                    late: '99',
                    early: '13',
                    absence: '40',
                    leave: '78',
                    total: '3000'
                },
                '2': {
                    late: '37',
                    early: '53',
                    absence: '80',
                    leave: '75',
                    total: '3000'
                },
                '3': {
                    late: '19',
                    early: '34',
                    absence: '81',
                    leave: '96',
                    total: '3000'
                },
                '4': {
                    late: '36',
                    early: '51',
                    absence: '31',
                    leave: '49',
                    total: '3000'
                }
            },
            midExam: {
                '1': {
                    num: 602319,
                    rate: '100%'
                },
                '2': {
                    num: 345126,
                    rate: '95%'
                },
                '3': {
                    num: 427561,
                    rate: '95%'
                },
                '4': {
                    num: 458961,
                    rate: '85%'
                }
            },
            finalExam: {
                '1': {
                    num: 591201,
                    rate: '99%'
                },
                '2': {
                    num: 351202,
                    rate: '94%'
                },
                '3': {
                    num: 452316,
                    rate: '96%'
                },
                '4': {
                    num: 446752,
                    rate: '83%'
                }
            },
            // 教师配置参数
            option: {
                title: {
                    text: '教师考勤分析',
                    left: 'center',
                    y: '10',
                    textStyle: {
                        color: '#000'
                    }
                },
                backgroundColor: '#fff',
                grid: {
                    left: '10%',
                    top: '10%',
                    bottom: 10
                },
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: '{b0}:{c0}'
                },
                xAxis: {
                    max: 3000,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: false,
                        data: ['请假', '缺勤', '早退', '迟到'],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: -4,
                            textStyle: {
                                color: '#000',
                                fontSize: 16.25
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'pictorialBar',
                        symbolRepeat: 'false',
                        symbolMargin: '20%',
                        symbolClip: true,
                        symbolSize: [10, 24],
                        symbolPosition: 'start',
                        symbolOffset: [20, 0],
                        symbolBoundingData: 3000,
                        data: [
                            {
                                value: 81,
                                symbol: imageUrls[0]
                            },
                            {
                                value: 67,
                                symbol: imageUrls[1]
                            },
                            {
                                value: 42,
                                symbol: imageUrls[2]
                            },
                            {
                                value: 13,
                                symbol: imageUrls[3]
                            }
                        ],
                        z: 10
                    },
                    {
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                opacity: 0.3
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        animationDuration: 0,
                        symbolRepeat: 'fixed',
                        symbolMargin: '20%',
                        symbolSize: [10, 24],
                        symbolBoundingData: 3000,
                        symbolPosition: 'start',
                        symbolOffset: [20, 0],
                        data: [
                            {
                                value: 81,
                                symbol: imageUrls[0]
                            },
                            {
                                value: 67,
                                symbol: imageUrls[1]
                            },
                            {
                                value: 42,
                                symbol: imageUrls[2]
                            },
                            {
                                value: 13,
                                symbol: imageUrls[3]
                            }
                        ],
                        z: 5
                    }
                ]
            },
            // 学生配置参数
            option2: {
                title: {
                    text: '学生考勤分析',
                    left: 'center',
                    y: '10',
                    textStyle: {
                        color: '#000'
                    }
                },
                backgroundColor: '#fff',
                grid: {
                    left: '10%',
                    top: '10%',
                    bottom: 10
                },
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: '{b0}:{c0}'
                },
                xAxis: {
                    max: 3000,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: false,
                        data: ['请假', '缺勤', '早退', '迟到'],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: -4,
                            textStyle: {
                                color: '#000',
                                fontSize: 16.25
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'pictorialBar',
                        symbolRepeat: 'false',
                        symbolMargin: '20%',
                        symbolClip: true,
                        symbolSize: [10, 24],
                        symbolPosition: 'start',
                        symbolOffset: [20, 0],
                        symbolBoundingData: 3000,
                        data: [
                            {
                                value: 81,
                                symbol: imageUrls[0]
                            },
                            {
                                value: 67,
                                symbol: imageUrls[1]
                            },
                            {
                                value: 42,
                                symbol: imageUrls[2]
                            },
                            {
                                value: 13,
                                symbol: imageUrls[3]
                            }
                        ],
                        z: 10
                    },
                    {
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                opacity: 0.3
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        animationDuration: 0,
                        symbolRepeat: 'fixed',
                        symbolMargin: '20%',
                        symbolSize: [10, 24],
                        symbolBoundingData: 3000,
                        symbolPosition: 'start',
                        symbolOffset: [20, 0],
                        data: [
                            {
                                value: 81,
                                symbol: imageUrls[0]
                            },
                            {
                                value: 67,
                                symbol: imageUrls[1]
                            },
                            {
                                value: 42,
                                symbol: imageUrls[2]
                            },
                            {
                                value: 13,
                                symbol: imageUrls[3]
                            }
                        ],
                        z: 5
                    }
                ]
            },
            // 期中配置参数
            option3: {
                series: [
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.9,
                            itemStyle: {opacity: 0.1}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['25%', '25%'],
                        color: ['#fe755f', '#fe755f', '#fe755f', '#fe755f'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#fe755f',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '幼儿园' + '\n' + param.value * 100 + '%'
                            }
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.8,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['75%', '25%'],
                        color: ['#845ffe', '#845ffe', '#845ffe', '#845ffe'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'

                        },
                        label: {
                            color: '#845ffe',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '小学' + '\n' + param.value * 100 + '%'
                            }
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.8,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        radius: '45%',
                        shape: 'circle',
                        center: ['25%', '75%'],
                        color: ['#21cfac', '#21cfac', '#21cfac', '#21cfac'],
                        outline: {
                            show: false
                        },
                        itemStyle: {
                            shadowBlur: 0
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#21cfac',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '中学' + '\n' + param.value * 100 + '%'
                            },
                            lineHeight: 40
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.97,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['75%', '75%'],
                        color: ['#fe68b4', '#fe68b4', '#fe68b4', '#fe68b4'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#fe68b4',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '高中' + '\n' + param.value * 100 + '%'
                            }
                        }
                    }
                ]
            },
            // 期末配置参数
            option4: {
                series: [
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.95,
                            itemStyle: {opacity: 0.1}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['25%', '25%'],
                        color: ['#fe755f', '#fe755f', '#fe755f', '#fe755f'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#fe755f',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '幼儿园' + '\n' + param.value * 100 + '%'
                            }
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.89,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['75%', '25%'],
                        color: ['#845ffe', '#845ffe', '#845ffe', '#845ffe'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'

                        },
                        label: {
                            color: '#845ffe',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '小学' + '\n' + param.value * 100 + '%'
                            }
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.93,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        radius: '45%',
                        shape: 'circle',
                        center: ['25%', '75%'],
                        color: ['#21cfac', '#21cfac', '#21cfac', '#21cfac'],
                        outline: {
                            show: false
                        },
                        itemStyle: {
                            shadowBlur: 0
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#21cfac',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '中学' + '\n' + param.value * 100 + '%'
                            },
                            lineHeight: 40
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: 0.95,
                            itemStyle: {opacity: 0.2}
                        }, {
                            value: 0.7,
                            itemStyle: {opacity: 0.4}
                        }, {
                            value: 0.5,
                            itemStyle: {opacity: 0.6}
                        }, {
                            value: 0.3,
                            itemStyle: {opacity: 0.8}
                        }],
                        itemStyle: {
                            shadowBlur: 0
                        },
                        radius: '45%',
                        shape: 'circle',
                        center: ['75%', '76%'],
                        color: ['#fe68b4', '#fe68b4', '#fe68b4', '#fe68b4'],
                        outline: {
                            show: false
                        },
                        backgroundStyle: {
                            color: '#fff'
                        },
                        label: {
                            color: '#fe68b4',
                            fontSize: 36,
                            fontWeight: '400',
                            formatter: function (param) {
                                return '高中' + '\n' + param.value * 100 + '%'
                            }
                        }
                    }
                ]
            },
            teacherAttChart: {},
            studentAttChart: {},
            minExamChart: {},
            finalExamChart: {},
            timer1: null, // 定时器 用于生成数据
            activeTabNum: '0',
            timeOut: null,
            timeOut1: null,
            tabInterval: 8000, // tab切换间隔时间
            schoolInterval: 2000, // 学校类型切换间隔时间
            timeOutInterval: 5000 // 用户点击恢复轮播间隔时间
        }
    },
    methods: {
        /**
         * 用户点击切换tab 渲染图表
         * @param  {Object} tab   tab组件
         */
        handleTabClick (tab) {
            clearInterval(this.timer)
            clearInterval(this.timer1)
            this.timer1 = null
            this.timer = null
            this.closeAutoPlayMixin()
            this.activeTabNum = tab.index

            // 清除setTimeout 重新开启
            clearTimeout(this.timeOut1)
            this.timeOut1 = null
            this.timeOut1Fun()

            switch (tab.index) {
                case '0':
                    clearInterval(this.timer1)
                    this.timer1 = setInterval(this.timer1Fun, this.schoolInterval)
                    this.$nextTick(function () {
                        echarts.init(this.teacherAttChart).setOption(this.option)
                    })
                    break
                case '1':
                    clearInterval(this.timer1)
                    this.timer1 = setInterval(this.timer1Fun, this.tabInterval)
                    this.$nextTick(function () {
                        echarts.init(this.studentAttChart).setOption(this.option2)
                    })
                    break
                case '2':
                    clearInterval(this.timer1)
                    this.timer1 = null
                    this.$nextTick(function () {
                        let midChart = echarts.init(this.minExamChart)
                        midChart.clear()
                        midChart.setOption(this.option3)
                    })
                    break
                case '3':
                    clearInterval(this.timer1)
                    this.timer1 = null
                    this.$nextTick(function () {
                        let finalChart = echarts.init(this.finalExamChart)
                        finalChart.clear()
                        finalChart.setOption(this.option4)
                    })
                    break
            }
        },
        /**
         * 切换学校类型
         * @param  {Number} type 用点击的学校类型
         */
        handleSchoolType (type) {
            clearInterval(this.timer1)
            clearInterval(this.timer)
            this.timer1 = null
            this.timer = null
            this.closeAutoPlayMixin()
            // 清除setTimeout 重新开启
            clearTimeout(this.timeOut)
            this.timeOut = null
            this.timeOutFun()

            this.activeType = type
            dz.foreach(this.schoolType, (key, item) => {
                if (item.type !== type) {
                    item.isActive = false
                } else {
                    item.isActive = true
                }
            })

            function filterArr (Arr) {
                let newArr = []
                let n = 0
                dz.foreach(Arr, (key, val) => {
                    if (key !== 'total') {
                        newArr.push({
                            value: val,
                            symbol: imageUrls[n]
                        })
                        n++
                    }
                })
                return newArr
            }

            if (this.activeTabNum === '0') {
                this.option.series[0].data = filterArr(this.teacherAttendence[String(type)]).reverse()
                this.option.series[1].data = filterArr(this.teacherAttendence[String(type)]).reverse()

                this.$nextTick(() => {
                    echarts.init(this.teacherAttChart).setOption(this.option)
                })
            }
            if (this.activeTabNum === '1') {
                this.option2.series[0].data = filterArr(this.studentAttendence[String(type)]).reverse()
                this.option2.series[1].data = filterArr(this.studentAttendence[String(type)]).reverse()
                 this.$nextTick(() => {
                    echarts.init(this.studentAttChart).setOption(this.option2)
                })
            }
        },
        /**
         *
         */
        handleSchoolTypeTimer (type) {
            this.activeType = type
            dz.foreach(this.schoolType, (key, item) => {
                if (item.type !== type) {
                    item.isActive = false
                } else {
                    item.isActive = true
                }
            })
        },
        /**
         * 选择学校类型 搜索/选择年级班级时重置考勤数据
         */
        resetAttOption () {

        },
        /**
         * 设置vue中随机数
         * @param  {Array} Arr  随机有四个数的数组
         * @param  {Number} type 幼儿园-高中 1-4 其他0
         * @param  {String} who  教师teacher 学生student
         */
        setVueAttData (Arr, type, who) {
            if (who === 'teacher') {
                this.teacherAttendence[type].late = Arr[0]
                this.teacherAttendence[type].early = Arr[1]
                this.teacherAttendence[type].absence = Arr[2]
                this.teacherAttendence[type].leave = Arr[3]
            } else {
                this.studentAttendence[type].late = Arr[0]
                this.studentAttendence[type].early = Arr[1]
                this.studentAttendence[type].absence = Arr[2]
                this.studentAttendence[type].leave = Arr[3]
            }
        },
        setImage (Arr) {
            let newArr = []
            dz.foreach(Arr, (index, item) => {
                (function (n) {
                     if (index !== 'total') {
                        newArr.push({
                            value: item,
                            symbol: imageUrls[n]
                        })
                     }
                })(index)
            })
            return newArr
        },
        timer1Fun () {
             // 生成随机数
            let MaxData = 300
            function random () {
                return (Math.random() * MaxData).toFixed(0)
            }
            let dynamicData = [random(), random(), random(), random()]
            let dynamicData2 = [random(), random(), random(), random()]
            let dynamicData3 = [random(), random(), random(), random()]
            let dynamicData4 = [random(), random(), random(), random()]
            let dynamicData5 = [random(), random(), random(), random()]
            let dynamicData6 = [random(), random(), random(), random()]
            let dynamicData7 = [random(), random(), random(), random()]
            let dynamicData8 = [random(), random(), random(), random()]
            let allData = [dynamicData, dynamicData2, dynamicData3, dynamicData4, dynamicData5, dynamicData6, dynamicData7, dynamicData8]

            for (let i = 0; i < 4; i++) {
                (() => {
                    let eleKey = String(i + 1)
                    this.setVueAttData(allData[i], eleKey, 'teacher')
                    this.setVueAttData(allData[i + 4], eleKey, 'student')
                })(i)
            }

            if (this.activeType < 4) {
                ++this.activeType
            } else {
                this.activeType = 1
            }

            this.handleSchoolTypeTimer(this.activeType)

            this.option.series[0].data = this.setImage(allData[this.activeType - 1]).reverse()
            this.option.series[1].data = this.setImage(allData[this.activeType - 1]).reverse()
            this.option2.series[0].data = this.setImage(allData[this.activeType + 3]).reverse()
            this.option2.series[1].data = this.setImage(allData[this.activeType + 3]).reverse()

            switch (this.activeTabNum) {
                case '0':
                    echarts.init(this.teacherAttChart).setOption(this.option)
                    break
                case '1':
                    echarts.init(this.studentAttChart).setOption(this.option2)
                    break
               /* case '2':
                    echarts.init(this.minExamChart).setOption(this.option3)
                case '3':
                    echarts.init(this.finalExamChart).setOption(this.option4) */
            }
        },
        timerFun () {
            let tempNum = Number(this.activeTabNum)
            if (tempNum < 3) {
                tempNum++
            } else {
                tempNum = 0
            }

            this.activeTabNum = String(tempNum)

            const allTabName = ['teacher-attendence-anal', 'student-attendence-anal', 'midterm-pass-rate', 'ending-pass-rate']

            this.activeTabName = allTabName[tempNum]

            switch (this.activeTabNum) {
                case '0':
                    this.$nextTick(() => {
                        echarts.init(this.teacherAttChart).setOption(this.option)
                    })
                    break
                case '1':
                    this.$nextTick(() => {
                        echarts.init(this.studentAttChart).setOption(this.option2)
                    })
                    break
                case '2':
                    this.$nextTick(() => {
                        echarts.init(this.minExamChart).setOption(this.option3)
                    })
                    break
                case '3':
                    this.$nextTick(() => {
                        echarts.init(this.finalExamChart).setOption(this.option4)
                    })
                    break
            }
        },
        // 幼
        timeOutFun () {
            this.timeOut = setTimeout(() => {
                this.timer1 = setInterval(this.timer1Fun, this.schoolInterval)
                this.timer = setInterval(this.timerFun, this.tabInterval)
                this.openAutoPlayMixin()
            }, this.timeOutInterval)
        },
        timeOut1Fun () {
            this.timeOut1 = setTimeout(() => {
                this.timer = setInterval(this.timerFun, this.tabInterval)
                this.openAutoPlayMixin()
            }, this.timeOutInterval)
        },
        /**
         * 请求学校数据接口数据
         *
         */
        getSchoolList () {
            this.API.getSchoolList((res) => {
                dz.foreach(res.data.content.list, (key, item) => {
                    this.schoolTreeData.push({
                        id: item.label,
                        label: item.label,
                        children: []
                    })
                    item.children.forEach((val, index) => {
                        this.schoolTreeData[key].children.push({
                            id: val.id,
                            label: val.label
                        })
                    })
                })
                // console.log(this.schoolListData)
                // this.schoolListData = res.data.content.list
            }, (rsp) => {
                this.$message({
                    showClose: true,
                    message: rsp.message,
                    type: 'error',
                    duration: 1500
                })
            })
        }
    },
    created () {
        this.getSchoolList()
    },
    mounted () {
        this.teacherAttChart = document.getElementById('teacher-attendence-pie')
        this.studentAttChart = document.getElementById('student-attendence-pie')
        this.minExamChart = document.getElementById('mid-bar')
        this.finalExamChart = document.getElementById('final-bar')

        // 学校最大人数
        // let teacherMaxData = this.teacherAttendence.total
        // let studentMaxData = this.teacherAttendence.total

        // 图表初始值
        this.option.xAxis.max = 3000
        this.option2.xAxis.max = 3000

        // 清空赋值
        // TODO echart中data为数组 所有数据处理为对象数组赋值给data更方便 目前用的对象
        this.option.series[0].data = []
        this.option.series[1].data = []
        let flag = 0
        let arr = []
        dz.foreach(this.teacherAttendence['1'], (key, val) => {
            if (key !== 'total') {
                arr.push({
                    value: val,
                    symbol: imageUrls[flag]
                })
                flag++
            }
        })
        arr = arr.reverse()
        this.option.series[0].data = arr
        this.option.series[1].data = arr

        // 初始化老师图表
        echarts.init(this.teacherAttChart).setOption(this.option)

        this.openAutoPlayMixin()
        // 2s生成随机8组数据 更新视图
        this.timer1 = setInterval(this.timer1Fun, this.schoolInterval)
        this.timer = setInterval(this.timerFun, this.tabInterval)
    },
    watch: {
        /**
         * 学校
         * @param  {Boolean}  val 当前学校（统计）类型是否属于schoolTypeName
         */
        isSchoolTypeNormal (val) {
            this.activeType = val ? this.activeType : 0
        }
    },
    beforeDestroy () {
        clearInterval(this.timer1)
        clearInterval(this.timer)
    }
}
</script>

<style lang="less">
.education-dynamics-tabs {
    .el-tabs__active-bar {
        background: none;
    }
    .el-tabs__item {
        height: 45px;
        font: bold 18px "Microsoft YaHei";
    }
}
.midterm-pass-rate,
.ending-pass-rate {
    display: flex;
    width:100%;
    .pass-rate-left {
        width: 300px;
        .passing-the-exam-item {
            box-shadow: 0 0 30px #f0f6ff;
            border-radius: 10px;
            height: 60px;
            margin: 20px 20px 40px;
            padding: 25px;
            .passing-the-exam-title {
                font: normal 18px "Microsoft YaHei";
                line-height: 30px;
            }
            .passing-the-exam-times {
                font: bolder 18px "Microsoft YaHei";
                line-height: 30px;
            }
            .kindergarten {
                color: #fe755f;
            }
            .primary-school {
                color: #845ffe;
            }
            .junior-school {
                color: #21cfac;
            }
            .high-school {
                color: #fe68b4;
            }
        }
    }
    .midterm-pass-rate-echarts,
    .ending-pass-rate-echarts {
        width: 100%;
        height: 500px;
        box-shadow: 0 0 30px #f0f6ff;
        border-radius: 10px;
        margin: 20px;
        padding: 30px;
        .pass-rate-echarts,.ending-pass-rate-echarts{
            width: 100%;
            height:500px;
        }
        .pass-rate-echarts-title {
            text-align: left;
            padding-left: 10px;
            font: bold 18px "Microsoft YaHei";
        }
    }
}

//教职工出勤 学生出勤
.attendence-card-box {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    //min-width: 1363px;
    padding-left: 15px;
    // padding-right: 10px;
    margin-bottom: 70px;
    box-sizing: border-box;
}
.attendence-card-item {
    width: 22%;
    height: 110px;
    //margin-right: 45px;
    margin-top: 42px;
    box-sizing: border-box;
    box-shadow: 0 0 30px #f0f6ff;
    border-radius: 10px;
    .label {
        margin-top: 22px;
        margin-bottom: 20px;
        font-size: 20px;
        line-height: 20px;
    }
    .times {
        font-size: 18px;
        line-height: 30px;
        &.late {
            color: #fe755f;
        }
        &.early {
            color: #845ffe;
        }
        &.absence {
            color: #21cfac;
        }
        &.leave {
            color: #fe68b4;
        }
    }
    .num {
        font-size: 30px;
    }
}
.nav-box {
    margin-bottom: 40px;
    .el-button {
        padding: 10px 0;
        width: 72px;
        color: #3c90ff;
        border-color: #fff;
        box-shadow: 0 0 30px #f0f6ff;
    }
    .el-button:hover,
    .el-button.nav-button.active {
        color: #fff;
        border-color: #3c90ff;
        background-color: #3c90ff;
    }
    .el-button + .el-button {
        margin-left: 20px;
    }
    .el-button:focus{
        background-color: #fff;
        border-color: #fff;
        color: #3c90ff;
    }
}
.pie-box {
    width: 100%;
    height: 400px;
    padding: 10px;
    margin-bottom: 30px;
    /* display: flex;
       // padding:15px;
       justify-content: space-around;
       align-content: space-around;
       flex-wrap: wrap; */
}
.pie-item {
    width: 98%;
    height: 100%;
    box-shadow: 0 0 30px #f0f6ff;
    border-radius: 10px;
}

// aside
.education-dynamics {
    .el-main {
        padding-left: 45px;
        padding-top: 44px;
    }
    .el-aside {
        line-height: normal;
        border-right: none;
    }
    .dz-header-wrapper .dz-content-wrapper {
        padding: 0;
        padding-top: 35px;
    }
    .search-tree-box {
        width: 287px;
        min-height: 700px;
        margin-top: 35px;
        border-right: 1px solid #f0f0f0;
    }
    .dynamics-search {
        margin: 0 auto;
        width: 215px;
        // margin-left: 30px;
        .el-input__inner {
            height: 46px;
            width: 215px;
            padding-right: 40px;
            border-radius: 2px;
            border: none;
            box-shadow: 0 0 10px rgba(139, 189, 255, 0.2);
        }
        .el-input__suffix {
            right: 17px;
        }
        .search-icon {
            display: inline-block;
            width: 20px;
            height: 21px;
            margin-top: 13px;
            cursor: pointer;
            background: url("/static/images/search.png") 0 0 no-repeat;
        }
    }
    .area {
        text-align: center;
        font-size: 16px;
        margin-top: 35px;
        margin-bottom: 15px;
        color: #3c90ff;
    }
    .dynamics-tree {
        padding: 25px;
        padding-top: 0;
        .el-tree-node__content {
            height: auto;
        }
        .el-tree-node__content:hover {
            background-color: #e2eeff;
        }
        .is-checked .el-tree-node__label {
            color: #3c90ff;
        }
        .el-tree-node__label {
            display: inline-block;
            vertical-align: top;
            float: left;
            font-size: 16px;
            max-width: 200px;
            text-align: left;
            // overflow: hidden;
            white-space: normal;
            word-break: break-all;
        }
        .el-tree-node {
            padding-top: 5px;
            padding-bottom: 5px;
            font-weight: 500;
        }
        .el-tree-node__children .el-tree-node__label {
            font-size: 14px;
        }
    }
}
</style>
