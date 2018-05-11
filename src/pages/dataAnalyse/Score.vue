<template>
    <div class="score-wrapper" style="width:100%">
        <el-container>
            <el-aside width="289px">
                <div class="search-tree-box">
                    <el-input
                        class="dynamics-search"
                        placeholder="请输入学校或年级"
                        v-model="searchText">
                        <i slot="suffix" class="search-icon"></i>
                    </el-input>
                    <p class="area" @click="isAll = true">{{area}}</p>
                    <el-tree
                        :data="schoolTreeData"
                        node-key="id"
                        ref="school-tree"
                        highlight-current
                        class="dynamics-tree"
                        default-expand-all
                        @node-click="handleNodeClick"
                        :props="defaultProps">
                    </el-tree>
                </div>
            </el-aside>
            <!-- 单个学校/年级/班级 分析显示 -->
            <el-main v-show="!isAll" class="grade">
                <h3 class="school">{{schoolInfo}}成绩分析</h3>
                <div class="select-box">
                    <el-select v-model="year" placeholder="请选择学年" size="small">
                        <el-option
                            v-for="item in yearOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="exam" placeholder="请选择考试" size="small">
                        <el-option
                            v-for="item in examOptions"
                            :key="item.examId"
                            :label="item.label"
                            :value="item.examId">
                        </el-option>
                    </el-select>
                </div>
                <div class="score-anal-box">
                    <h3 class="exam-title">{{formatExam}}考试分析</h3>
                    <p class="exam-time">
                        <span><b>考试时间:</b>2018年1月30日-2018年2月1日</span>
                        <span><b>考试形式:</b>百分制(各科成绩均为100分)</span>
                    </p>
                    <div class="card-box">
                        <div class="card-item">
                            <p class="label">参与学生(人)</p>
                            <p class="num student">3456</p>
                        </div>
                        <div class="card-item">
                            <p class="label">考试学科(个)</p>
                            <p class="num subject">7</p>
                        </div>
                        <div class="card-item">
                            <p class="label">整体通过率</p>
                            <p class="num pass-rate">86%</p>
                        </div>
                    </div>
                </div>
                <div class="echart-box" id="high-score-segment">
                </div>
                <div class="echart-box" id="segment">
                </div>
                <div class="echart-box" id="subject-pass-rate">
                </div>
                <div class="class-rank-box rank100">
                    <h3 class="rank-title">成绩前100名</h3>
                    <el-table max-height="600" :data="top100" stripe border style="" class="top-table-list">
                        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
                        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                        <el-table-column align="center" prop="score" label="总成绩"></el-table-column>
                        <el-table-column align="center" prop="rank" label="排名"></el-table-column>
                    </el-table>
                </div>
                <div class="class-rank-box rank10">
                    <h3 class="rank-title">单科成绩前10名</h3>
                    <el-table max-height="600" :data="subjectTop10" stripe border style="" class="top-table-list">
                        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
                        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                        <el-table-column align="center" prop="score" label="成绩"></el-table-column>
                        <el-table-column align="center" prop="subject" label="科目"></el-table-column>
                        <el-table-column align="center" prop="rank" label="排名"></el-table-column>
                    </el-table>
                </div>
            </el-main>
            <!-- 区域显示 -->
            <el-main v-show="isAll">
                <div class="score-anal-box">
                    <h3 class="exam-title">本辖区2017-2018学年考试活动(事件概述)</h3>
                    <div class="card-box">
                        <div class="card-item">
                            <p class="label">录入周考(次)</p>
                            <p class="num student">237</p>
                        </div>
                        <div class="card-item">
                            <p class="label">录入月考(次)</p>
                            <p class="num subject">126</p>
                        </div>
                        <div class="card-item">
                            <p class="label">期中考试(次)</p>
                            <p class="num pass-rate">38</p>
                        </div>
                        <div class="card-item">
                            <p class="label">期末考试(次)</p>
                            <p class="num pass-rate">36</p>
                        </div>
                    </div>
                    <div class="card-box1">
                        <div class="card-item">
                            <p class="label">诊断考试(次)</p>
                            <p class="num pass-rate" style="color:#13c068">43</p>
                        </div>
                        <div class="card-item card-item1">
                            <p class="label">摸底考试(次)</p>
                            <p class="num pass-rate" style="color:#fccf59">41</p>
                        </div>
                    </div>
                </div>
                <div class="score-anal-box">
                    <h3 class="exam-title">本辖区内最近一次本级统考考试事件成绩分析</h3>
                    <p class="exam-time">
                        <span><b>名称:</b>{{formatExam}}考试分析</span>
                        <span><b>时间:</b>2018年1月30日-2018年2月1日</span>
                        <span><b>形式:</b>百分制(各科成绩均为100分)</span>
                    </p>
                    <div class="card-box">
                        <div class="card-item">
                            <p class="label">参与学校(个)</p>
                            <p class="num student">39</p>
                        </div>
                        <div class="card-item">
                            <p class="label">参与学生(人)</p>
                            <p class="num student">6456</p>
                        </div>
                        <div class="card-item">
                            <p class="label">考试学科(个)</p>
                            <p class="num subject">7</p>
                        </div>
                        <div class="card-item">
                            <p class="label">考试通过率(整体)</p>
                            <p class="num pass-rate">86%</p>
                        </div>
                    </div>
                </div>
                <div class="echart-box" id="regional-high-score-segment">
                </div>
                <div class="echart-box" id="regional-segment">
                </div>
                <div class="echart-box" id="regional-school-pass-rate">
                </div>
                <div class="echart-box" id="regional-subject-pass-rate">
                </div>
                <div class="class-rank-box rank100">
                    <h3 class="rank-title">成绩前100名</h3>
                    <el-table max-height="600" :data="top100" stripe border style="" class="top-table-list">
                        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
                        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                        <el-table-column align="center" prop="score" label="成绩"></el-table-column>
                        <el-table-column align="center" prop="rank" label="排名"></el-table-column>
                    </el-table>
                </div>
                <div class="class-rank-box rank10">
                    <h3 class="rank-title">单科成绩前10名</h3>
                    <el-table max-height="600" :data="subjectTop10" stripe border style="" class="top-table-list">
                        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
                        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                        <el-table-column align="center" prop="score" label="成绩"></el-table-column>
                        <el-table-column align="center" prop="subject" label="科目"></el-table-column>
                        <el-table-column align="center" prop="rank" label="排名"></el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
/**
 * 成绩分析页面
 * @author  liujingyan liuyang tangpeng Drbeo  20180507
 */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import dz from '@/functions/common'
    import echarts from 'echarts'
    import RankLists from '@/functions/data'

    const SINGLELISTS = RankLists.single
    const ALLRANKLISTS = RankLists.all

    const yearOptions = [{
        value: '2017-2018',
        label: '2017-2018学年'
    }, {
        value: '2016-2017',
        label: '2016-2017学年'
    }]

    // 18种科目的颜色
    const color = ['#fe755f', '#845ffe', '#13c0aa', '#fe68b4', '#fccf59', '#13c068', '#61a7fd', '#bec013', '#fe5656', '#f8b551', '#686ffe', '#fe68fc', '#fe68fc', '#f19ec2', '#fff65d', '#397efd', '#688bfe', '#fe687a']

    // 区域学校通过率 数据
    const regionalSchoolPassRate = {
        legend: ['语文', '数学', '英语', '物理', '化学', '政治', '历史'],
        schoolArr: ['巴蜀中学', '育才中学', '西师附中', '铜梁中学', '渝北中学', '外国语中学', '江北中学'],
        colorArr: [['#fe755f', '#fe75a0'], ['#845ffe', '#845fb0'], ['#13c0aa', '#13c055'], ['#fe68b4', '#fe685f'], ['#fccf59', '#fccfab'], ['#61a7fd', '#61a7aa'], ['#bec013', '#bec01f']],
        data: [
            [80, 81, 84, 91, 99, 91, 86],
            [90, 94, 87, 95, 81, 87, 88],
            [85, 98, 97, 93, 81, 86, 89],
            [86, 86, 96, 87, 92, 83, 82],
            [87, 84, 96, 88, 83, 90, 81],
            [99, 77, 95, 86, 74, 75, 97],
            [97, 87, 94, 86, 83, 92, 93]
        ]
    }

    export default {
        name: 'Score',
        components: { DzSearchData, DzPager, DzHeader, DzFooter, DzDialog },
        data () {
            return {
                searchText: '',
                area: '重庆市各区县学校概览',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                // 选中的学校/年级/班级
                schoolInfo: '',
                // 成绩分析中不包含幼儿园
                schoolTreeData: [],
                // 显示区域
                isAll: true,
                year: '2017-2018', // 学年 默认为当前学年
                exam: '1', // 考试活动 默认为1
                yearOptions: yearOptions,
                examOptions: [{
                    examId: '1',
                    label: '2017-2018年第一学期期末考试(区级统考)'
                }, {
                    examId: '2',
                    label: '2017-2018年第一学期期中考试(校级统考)'
                }, {
                    examId: '3',
                    label: '2017-2018年第一学期初二年级期中考试(校级统考)'
                }, {
                    examId: '4',
                    label: '2017-2018年第一学期初三期中考试(校级统考)'
                }],
                // 学科通过率
                option: {
                    title: {
                        text: '学科通过率',
                        left: 'center',
                        top: 15
                        // padding:50
                    },
                    toolbox: {
                        top: 55
                    },
                    xAxis: {
                        type: 'category',
                        data: ['语文', '数学', '英语', '物理', '化学', '地理', '生物']
                    },
                    yAxis: {
                        type: 'value',
                        name: '通过率(%)'
                    },
                    series: [{
                        data: [{
                            value: 90,
                            itemStyle: {color: color[0]}
                        }, {
                            value: 91,
                            itemStyle: {color: color[1]}
                        }, {
                            value: 96,
                            itemStyle: {color: color[2]}
                        }, {
                            value: 89,
                            itemStyle: {color: color[3]}
                        }, {
                            value: 85,
                            itemStyle: {color: color[4]}
                        }, {
                            value: 85,
                            itemStyle: {color: color[5]}
                        }, {
                            value: 97,
                            itemStyle: {color: color[6]}
                        }],
                        type: 'bar'
                    }]
                },
                // 学科分段分布
                option1: null,
                // 高分分布
                option2: null,
                // 区域学校学科通过率
                option3: null,
                subjectPassEchart: null,
                segmentEchart: null,
                scoreEchart: null,
                // 区域
                areaSchPassEchart: null, // 区域学校通过率
                areaSubPassEchart: null, // 区域学科通过率
                areaSegmentEchart: null, // 区域学科分段分布
                areaScoreEchart: null, // 区域高分分布
                 // 区域学校通过率
                regionalSchoolPassRate: {},
                top100: ALLRANKLISTS[0],
                subjectTop10: SINGLELISTS[0],
                allsubjectTop10: SINGLELISTS,
                allTop100: ALLRANKLISTS
            }
        },
        created () {
            this.closeAutoPlayMixin()
            this.getSchoolList()
        },
        mounted () {
            this.subjectPassEchart = document.getElementById('subject-pass-rate')
            this.segmentEchart = document.getElementById('segment')
            this.scoreEchart = document.getElementById('high-score-segment')
            // 区域
            this.areaSchPassEchart = document.getElementById('regional-school-pass-rate')
            this.areaSubPassEchart = document.getElementById('regional-subject-pass-rate')
            this.areaSegmentEchart = document.getElementById('regional-segment')
            this.areaScoreEchart = document.getElementById('regional-high-score-segment')

            this.regionalSchoolPassRate = this.$echarts.init(document.getElementById('regional-school-pass-rate'))
            this.regionalSchoolPassRateEcharts()

            // 初始化学科通过率
            // echarts.init(this.subjectPassEchart).setOption(this.option)

            // 分数轴 55 0-59分 65 60-69分 75 70-79分 85 80-89分 95 90-99分 100 100分
            let scores = ['55', '65', '75', '85', '95', '100']
            let scoresArr = ['0-59', '60-69', '70-79', '80-89', '90-99', '100']
            let subjects = ['语文', '数学', '英语', '物理', '化学', '地理', '生物']
            // let data1 = [0,29,1],[0,56,13],[0,57,2],[0,]

            function random (MaxData) {
                return (Math.random() * MaxData).toFixed(0)
            }

            // 设置为1-100分情况每个分数都统计人数 后续有需要可更改
            /* let dataArr = []
            for(let i=0;i<7;i++){
                for(let j=0;j<100;j++){
                    //小于60分
                    if (j<60) {
                        dataArr.push([i,j,random(50)])
                    }else{
                        dataArr.push([i,j,random(300)])
                    }
                }
            }
           let data = dataArr */

           // 一维subjects中的index 二维scores中的index  三维人数或者100%
           let data1 = []
           for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 6; j++) {
                    switch (j) {
                        // 100 不及格
                        case 0:
                        case 5:
                            data1.push([i, j, random(50)])
                            break
                        // 60-80
                        case 1:
                        case 2:
                            data1.push([i, j, random(400)])
                            break
                        default:
                            data1.push([i, j, random(500)])
                    }
                }
           }

           let option1 = {
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                       return scoresArr[params.dataIndex] + ':' + params.data[1] + '人'
                       // 设置为1-100分情况每个分数都统计人数 后续有需要可更改
                       // return params.data[0]+'分'+':'+params.data[1]+'人'
                    }
                },
                title: [],
                singleAxis: [],
                series: [],
                color: color
            }
            echarts.util.each(subjects, function (subject, idx) {
                option1.title.push({
                    textBaseline: 'middle',
                    left: 20,
                    top: (idx + 0.5) * 100 / 7 + '%',
                    text: subject
                })
                // 设置为1-100分情况每个分数都统计人数 后续有需要可更改
               /* option1.singleAxis.push({
                    left: 80,
                    type: 'value',
                    min:60,
                    boundaryGap: false,
                    data: scores,
                    top: (idx * 100 / 7 + 5) + '%',
                    height: (100 / 7 - 10) + '%',
                    axisLabel: {
                        interval: 0
                    }
                }) */
                option1.singleAxis.push({
                    left: 90,
                    type: 'category',
                    boundaryGap: false,
                    data: scores,
                    top: (idx * 100 / 7 + 5) + '%',
                    height: (100 / 7 - 10) + '%',
                    axisLabel: {
                        interval: 0
                    }
                })
                option1.series.push({
                    singleAxisIndex: idx,
                    coordinateSystem: 'singleAxis',
                    type: 'scatter',
                    data: [],
                    name: subject,
                    symbolSize: function (dataItem) {
                        // 控制圆圈的半径
                        return dataItem[1] / 10
                    }
                })
            })
            echarts.util.each(data1, function (dataItem) {
                option1.series[dataItem[0]].data.push([dataItem[1], dataItem[2]])
            })
            this.option1 = option1
            // 初始化各个学科分段分布
            // echarts.init(this.segmentEchart).setOption(option1)

            let data2 = [
                [[30, 80], [25, 85], [5, 90], [3, 95]],
                [[21, 80], [19, 85], [7, 90], [2, 95]],
                [[19, 80], [21, 85], [8, 90], [3, 95]],
                [[14, 80], [29, 85], [10, 90], [4, 95], [4, 100]],
                [[22, 80], [16, 85], [9, 90], [6, 95], [1, 100]],
                [[16, 80], [18, 85], [7, 90], [5, 95], [2, 100]],
                [[22, 80], [21, 85], [6, 90], [6, 95], [1, 100]],
                [[30, 80], [12, 85], [6, 90], [3, 95], [0, 100]],
                [[22, 80], [24], [2, 90], [3, 95]],
                [[24, 80], [13], [10], [9, 95]],
                [[22, 80], [30, 85], [7, 90], [2, 95], [2, 100]],
                [[15, 80], [29, 85], [14, 90], [10, 95], [3, 100]],
                [[20, 80], [18, 85], [22, 90], [1, 95], [0, 100]],
                [[14, 80], [17, 85], [24, 90], [6, 95], [1, 100]],
                [[21, 80], [14, 85], [7, 90], [2, 95], [0, 100]],
                 [[12, 80], [21, 85], [16, 90], [4, 95], [0, 100]],
                [[16, 80], [15, 85], [9, 90], [3, 95], [0, 100]]
            ]

            let option2 = {
                /* backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#f7f8fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]), */
                title: {
                    text: '高分分布(各个学科)',
                    left: 'center',
                    top: 15
                },
                grid: {
                    top: 110
                },
                toolbox: {
                    top: 55
                },
                legend: {
                    left: 'center',
                    top: 50,
                    data: ['语', '数', '外', '物', '化', '生', '政', '史', '地', '信息技术', '通信技术', '艺术', '音乐', '美术', '体育与健康', '综合实践活动', '校本课程']
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                     name: '人数'
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    scale: true,
                    name: '分数 ',
                    min: 70
                },
                series: [
                    {
                    name: '语',
                    data: data2[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                             formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fe755f'
                            }, {
                                offset: 1,
                                color: '#fe755f'
                            }])
                        }
                    }
                }, {
                    name: '数',
                    data: data2[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#845ffe'
                            }, {
                                offset: 1,
                                color: '#845ffe'
                            }])
                        }
                    }
                }, {
                    name: '外',
                    data: data2[2],
                    type: 'scatter',
                    symbolSize: function (data) {
                      return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#13c0aa'
                            }, {
                                offset: 1,
                                color: '#13c0aa'
                            }])
                        }
                    }
                }, {
                    name: '物',
                    data: data2[3],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fe68b4'
                            }, {
                                offset: 1,
                                color: '#fe68b4'
                            }])
                        }
                    }
                }, {
                    name: '化',
                    data: data2[4],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fccf59'
                            }, {
                                offset: 1,
                                color: '#fccf59'
                            }])
                        }
                    }
                }, {
                    name: '生',
                    data: data2[5],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#13c068'
                            }, {
                                offset: 1,
                                color: '#13c068'
                            }])
                        }
                    }
                }, {
                    name: '政',
                    data: data2[6],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#61a7fd'
                            }, {
                                offset: 1,
                                color: '#61a7fd'
                            }])
                        }
                    }
                }, {
                    name: '史',
                    data: data2[7],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#bec013'
                            }, {
                                offset: 1,
                                color: '#bec013'
                            }])
                        }
                    }
                }, {
                    name: '地',
                    data: data2[8],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fe5656'
                            }, {
                                offset: 1,
                                color: '#fe5656'
                            }])
                        }
                    }
                }, {
                    name: '信息技术',
                    data: data2[9],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#f8b551'
                            }, {
                                offset: 1,
                                color: '#f8b551'
                            }])
                        }
                    }
                }, {
                    name: '通信技术',
                    data: data2[10],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#686ffe'
                            }, {
                                offset: 1,
                                color: '#686ffe'
                            }])
                        }
                    }
                }, {
                    name: '艺术',
                    data: data2[11],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fe68fc'
                            }, {
                                offset: 1,
                                color: '#fe68fc'
                            }])
                        }
                    }
                }, {
                    name: '音乐',
                    data: data2[12],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#f19ec2'
                            }, {
                                offset: 1,
                                color: '#f19ec2'
                            }])
                        }
                    }
                }, {
                    name: '美术',
                    data: data2[13],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fff65d'
                            }, {
                                offset: 1,
                                color: '#fff65d'
                            }])
                        }
                    }
                }, {
                    name: '体育与健康',
                    data: data2[14],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#397efd'
                            }, {
                                offset: 1,
                                color: '#397efd'
                            }])
                        }
                    }
                }, {
                    name: '综合实践活动',
                    data: data2[15],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return (param.data[0] + '人' + param.data[1] + '分')
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#688bfe'
                            }, {
                                offset: 1,
                                color: '#688bfe'
                            }])
                        }
                    }
                }, {
                    name: '校本课程',
                    data: data2[16],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[0]) * 8
                    },
                    label: {
                        emphasis: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#fe687a'
                            }, {
                                offset: 1,
                                color: '#fe687a'
                            }])
                        }
                    }
                }
                ]
            }
            this.option2 = option2
            // 初始化各学科高分分布
            // echarts.init(this.scoreEchart).setOption(option2)
            echarts.init(this.areaSubPassEchart).setOption(this.option)
            echarts.init(this.areaSegmentEchart).setOption(this.option1)
            echarts.init(this.areaScoreEchart).setOption(this.option2)

            let flag = 0
            let flag1 = 0

            this.timer1 = setInterval(() => {
                this.top100 = this.allTop100[flag]
                this.subjectTop10 = this.allsubjectTop10[flag1]
                if (flag < 9) {
                    flag++
                } else {
                    flag = 0
                }
                if (flag1 < 4) {
                    flag1++
                } else {
                    flag1 = 0
                }
                // console.log(this.top100)
            }, 2000)
        },
        computed: {
            /**
             * 根据当前选中的考试examId 获取考试名称(label)
             * @return {String}  考试名称
             */
           formatExam: function () {
                let label = null
                dz.foreach(this.examOptions, (key, item) => {
                    if (item.examId === this.exam) {
                        label = item.label
                    }
                })
                return label
           }
        },
        methods: {
        /**
         * 点击tree树  获取对应数据 更新视图
         * @param  {Object} data 用户点击节点所对应的对象 包含id label
         * @param  {Object} node 用户点击节点对应的 Node
         */
        handleNodeClick (data, node) {
            // 点击学校类别不予分析
            if (data.id === 1 || data.id === 2 || data.id === 3 || data.id === 4) { return }
            // let labelArr = []
            /* function takeLabe (obj, keySymbol) {
                if (obj.label !== '小学' && obj.label !== '初级中学' && obj.label !== '高级中学') {
                    takeLabe(obj.parent, keySymbol)
                    labelArr.push(obj[keySymbol])
                } else {

                }
            } */

            // takeLabe(node, 'label')

            this.schoolInfo = node.label

            this.isAll = false
        },
        // 渲染区域学校通过率
        regionalSchoolPassRateEcharts () {
            let _arr = []
            regionalSchoolPassRate.data.forEach(function (elem, index) {
                // 组装series数据
                let _obj = {
                    name: regionalSchoolPassRate.legend[index],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: regionalSchoolPassRate.colorArr[index][0]
                            }, {
                                offset: 1,
                                color: regionalSchoolPassRate.colorArr[index][1]
                            }]),
                            barBorderRadius: 50,
                            borderWidth: 0
                        }
                    },
                    zlevel: 2,
                    barWidth: '8%',
                    data: elem
                }
                _arr.push(_obj)
            })
            let option = {
                backgroundColor: '#ffffff',
                legend: {
                    top: 45,
                    textStyle: {
                        color: '#010101'
                    },
                    data: ['语文', '数学', '英语', '物理', '化学', '政治', '历史']
                },
                title: {
                    text: '区域学校通过率',
                    left: 'center',
                    top: 15
                },
                toolbox: {
                    left: 'center',
                    top: 55
                },
                grid: {
                    left: '7%',
                    right: '4%',
                    bottom: '10%',
                    top: '20%',
                    containLabel: true
                },

                tooltip: {
                    show: 'true',
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                    padding: [8, 10], // 内边距
                    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', // 添加阴影
                    formatter: function (params) {
                        return params.name + '<br>' + regionalSchoolPassRate.legend[params.seriesIndex] + ' ：' + params.value + '%'
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '通过率（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#363e83'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#363e83 '
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#010101',
                            fontWeight: 'normal',
                            fontSize: '12'
                        }
                    }
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#363e83'
                        }
                    },
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#010101',
                            fontWeight: 'normal',
                            fontSize: '12'
                        }
                    },
                    data: regionalSchoolPassRate.schoolArr
                }, {
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
                    },
                    data: regionalSchoolPassRate.schoolArr
                }],
                series: _arr
            }
            this.regionalSchoolPassRate.setOption(option)
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
        watch: {
            isAll (value) {
                if (value) {
                    this.$nextTick(() => {
                        this.regionalSchoolPassRateEcharts()
                        echarts.init(this.areaSubPassEchart).setOption(this.option)
                        echarts.init(this.areaSegmentEchart).setOption(this.option1)
                        echarts.init(this.areaScoreEchart).setOption(this.option2)
                    })
                } else {
                    this.$nextTick(() => {
                        echarts.init(this.subjectPassEchart).setOption(this.option)
                        echarts.init(this.segmentEchart).setOption(this.option1)
                        echarts.init(this.scoreEchart).setOption(this.option2)
                    })
                }
            }
        },
        beforeDestroy () {
            clearInterval(this.timer1)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.score-wrapper {
    .el-aside {
        line-height: normal;
        border-right: none;
    }
    .dz-header-wrapper .dz-content-wrapper {
        padding: 0;
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
        cursor: pointer;
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
    .el-main {
        padding-left: 25px;
        padding-top: 35px;
        text-align: left;
        .school{
            font-size: 24px;
        }
        .select-box{
            margin-top: 20px;
        }
        .el-select+.el-select{
            margin-left: 10px;
        }
        .score-anal-box{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #f0f0f0;
        }
        .exam-title{
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }
        .rank-title {
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }
        .exam-time{
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
            span{margin-right: 20px;}
            b{margin-right: 5px;}
        }
        .card-box{
            // padding-left: 15px;
            width: 100%;
            margin-top: 30px;
            // margin-bottom: 60px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            // align-content: space-around;
        }
        #regional-high-score-segment,#high-score-segment{
            margin-top: 40px;
        }
        .card-box1{
            width: 100%;
            // margin-top: 30px;
            margin-bottom: 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            .card-item {
                margin-left: 1.5%;
            }
            .card-item1 {
                margin-left: 3%;
            }
        }
        .card-item{
            // float: left;
            width: 22%;
            height: 110px;
            margin-top: 30px;
          /*   margin-right: 35px; */
            box-sizing: border-box;
            box-shadow: 0 0 30px #f0f6ff;
            border-radius: 10px;
            text-align: center;
            .label{
                margin-top: 22px;
                margin-bottom: 20px;
                font-size: 20px;
                line-height: 20px;
            }
            .num{
               font-size: 30px;
               line-height: 30px;
               &.student {
                    color: #fe755f;
                }
                &.subject {
                    color: #845ffe;
                }
                &.pass-rate {
                    color: #21cfac;
                }
            }
        }
        .echart-box{
            width: 96%;
            margin: 0 auto;
            // padding: 10px;
            height: 500px;
            margin-bottom: 30px;
            box-shadow: 0 0 30px #f0f6ff;
            border-radius: 10px;
        }
        .el-table{
            width: 96%;
            margin: 0 auto;
        }
        .el-table td, .el-table th {
            padding: 3px 0;
        }
        .rank100 .has-gutter th, .rank10 .has-gutter th{
            color: #5b7084;
            background-color: #fafbfd;
        }
    }
}
</style>
