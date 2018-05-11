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
                    <p class="area">{{area}}</p>
                    <el-tree
                        :data="schoolTreeData"
                        show-checkbox
                        node-key="id"
                        ref="school-tree"
                        highlight-current
                        class="dynamics-tree"
                        :props="defaultProps">
                    </el-tree>
                </div>
            </el-aside>
            <!-- <el-main>
                <h3 class="school">集美区实验中学（初中）成绩分析</h3>
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
                            <p class="num student">6456</p>
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
                <div class="echart-box" id="subject-pass-rate">
                    学科通过率
                </div>
                <div class="echart-box" id="segment">
                    各个学科分段分布
                </div>
                <div class="echart-box" id="high-score-segment">
                    高分分布（各个学科）
                </div>
                <div class="class-rank-box">
                     成绩前100名
                </div>
                <div class="class-rank-box">
                     单科成绩前10名
                </div>
            </el-main> -->
            <el-main>
                <div class="score-anal-box">
                    <h3 class="exam-title">本辖区2017-2018学年考试活动(事件概述)</h3>
                    <div class="card-box">
                        <div class="card-item">
                            <p class="label">录入周考（次）</p>
                            <p class="num student">126</p>
                        </div>
                        <div class="card-item">
                            <p class="label">录入月考（次）</p>
                            <p class="num subject">126</p>
                        </div>
                        <div class="card-item">
                            <p class="label">期中考试（次）</p>
                            <p class="num pass-rate">38</p>
                        </div>
                        <div class="card-item">
                            <p class="label">期末考试（次）</p>
                            <p class="num pass-rate">38</p>
                        </div>
                    </div>
                    <div class="card-box1">
                        <div class="card-item">
                            <p class="label">诊断考试（次）</p>
                            <p class="num pass-rate">38</p>
                        </div>
                        <div class="card-item card-item1">
                            <p class="label">摸底考试（次）</p>
                            <p class="num pass-rate">38</p>
                        </div>
                    </div>
                </div>
                <div class="score-anal-box">
                    <h3 class="exam-title">本辖区内最近一次本级统考考试事件成绩分析</h3>
                    <p class="exam-name">{{formatExam}}考试分析</p>
                    <p class="exam-time">
                        <span><b>考试时间:</b>2018年1月30日-2018年2月1日</span>
                        <span><b>考试形式:</b>百分制(各科成绩均为100分)</span>
                    </p>
                    <div class="card-box">
                        <div class="card-item">
                            <p class="label">参与学校(人)</p>
                            <p class="num student">6456</p>
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
                <div class="echart-box" id="regional-school-pass-rate">
                    区域学校通过率
                </div>
                <div class="echart-box" id="subject-pass-rate">
                    学科通过率
                </div>
                <div class="echart-box" id="segment">
                    各个学科分段分布
                </div>
                <div class="echart-box" id="high-score-segment">
                    高分分布（各个学科）
                </div>
                <div class="class-rank-box rank100">
                    <h3 class="rank-title">成绩前100名</h3>
                    <el-table max-height="600" :data="top100" stripe border style="" class="top-table-list">
                        <!--<el-table-column align="center" prop="id" label="序号"></el-table-column>-->
                        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
                        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
                        <el-table-column align="center" prop="score" label="成绩"></el-table-column>
                        <el-table-column align="center" prop="rank" label="排名"></el-table-column>
                    </el-table>
                </div>
                <div class="class-rank-box rank10">
                    <h3 class="rank-title">单科成绩前10名</h3>
                    <el-table max-height="600" :data="subjectTop10" stripe border style="" class="top-table-list">
                        <!--<el-table-column align="center" prop="id" label="序号"></el-table-column>-->
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
     * @author  dz-liujingyan 20180506
     */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import dz from '@/functions/common'
    import echarts from 'echarts'
    // import index from '../../store'

    const yearOptions = [{
        value: '2017-2018',
        label: '2017-2018学年'
    }, {
        value: '2016-2017',
        label: '2016-2017学年'
    }]
    // 区域学校通过率 数据
    const regionalSchoolPassRate = {
        legend: ['语文', '数学', '英语', '物理', '化学', '政治', '历史'],
        schoolArr: ['巴蜀中学', '育才中学', '西师附中', '铜梁中学', '渝北中学', '外国语中学', '江北中学'],
        colorArr: [['#fe755f', '#fe75a0'], ['#845ffe', '#845fb0'], ['#13c0aa', '#13c055'], ['#fe68b4', '#fe685f'], ['#fccf59', '#fccfab'], ['#61a7fd', '#61a7aa'], ['#bec013', '#bec01f']],
        data: [
            [8, 15, 10, 90, 78, 88, 16],
            [8, 17, 26, 30, 41, 24, 35],
            [8, 17, 26, 12, 34, 25, 78],
            [8, 17, 26, 30, 41, 24, 35],
            [8, 17, 26, 23, 58, 90, 60],
            [8, 17, 26, 30, 41, 24, 35],
            [8, 17, 26, 30, 41, 24, 35]
        ]
    }

    export default {
        name: 'Score',
        components: {DzSearchData, DzPager, DzHeader, DzFooter, DzDialog},
        data () {
            return {
                searchText: '',
                area: '厦门市同安校区概览',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                schoolTreeData: [
                    {
                        id: 1,
                        label: '幼儿园',
                        children: [
                            {
                                id: 4,
                                label: '集美区蓝天幼儿园',
                                children: [
                                    {
                                        id: 9,
                                        label: '幼儿园小班'
                                    },
                                    {
                                        id: 10,
                                        label: '幼儿班大班'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '小学',
                        children: [
                            {
                                id: 5,
                                label: '同安希望小学',
                                children: [
                                    {
                                        id: 14,
                                        label: '一年级',
                                        children: [
                                            {
                                                id: 16,
                                                label: '一年级（1）班'
                                            },
                                            {
                                                id: 17,
                                                label: '一年级（2）班'
                                            }
                                        ]
                                    },
                                    {
                                        id: 15,
                                        label: '二年级',
                                        children: [
                                            {
                                                id: 18,
                                                label: '二年级（1）班'
                                            },
                                            {
                                                id: 19,
                                                label: '二年级（2）班'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 6,
                                label: '集美区实验小学',
                                children: [
                                    {
                                        id: 20,
                                        label: '六年级',
                                        children: [
                                            {
                                                id: 21,
                                                label: '六年级（1）班'
                                            },
                                            {
                                                id: 22,
                                                label: '六年级（2）班'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '初级中学',
                        children: [
                            {
                                id: 7,
                                label: '同安希望中学'
                            },
                            {
                                id: 8,
                                label: '集美实验中学'
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: '高级中学',
                        children: [
                            {
                                id: 9,
                                label: '高一年级'
                            },
                            {
                                id: 10,
                                label: '高二年级级级级级级级级级级',
                                children: [
                                    {
                                        id: 11,
                                        label: '高二（1）班'
                                    },
                                    {
                                        id: 12,
                                        label: '高二（2）班'
                                    },
                                    {
                                        id: 13,
                                        label:
                                            '高二（3）班班班班班班班班班班班班班班'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                allTop100: [
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 0,
                            rank: 11
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 12
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 13
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 14
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 15
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 16
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 17
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 18
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 19
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 20
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 1,
                            rank: 21
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 22
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 2,
                            rank: 31
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 32
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 41
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 42
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 51
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 52
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 61
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 62
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 71
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 72
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 81
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 82
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '余亮',
                            sex: '男',
                            score: 100,
                            rank: 91
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            rank: 92
                        },
                        {
                            id: 3,
                            studentName: '叶子',
                            sex: '女',
                            score: 99,
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 8
                        },
                        {
                            id: 9,
                            studentName: '李牧',
                            sex: '男',
                            score: 98,
                            rank: 9
                        },
                        {
                            id: 10,
                            studentName: '王天蓝',
                            sex: '男',
                            score: 97,
                            rank: 10
                        }
                    ]
                ],
                top100: [
                    {
                        id: 1,
                        studentName: '余亮',
                        sex: '男',
                        score: 100,
                        rank: 1
                    },
                    {
                        id: 2,
                        studentName: '叶凡',
                        sex: '男',
                        score: 99,
                        rank: 2
                    },
                    {
                        id: 3,
                        studentName: '叶子',
                        sex: '女',
                        score: 99,
                        rank: 3
                    },
                    {
                        id: 4,
                        studentName: '李牧',
                        sex: '男',
                        score: 98,
                        rank: 4
                    },
                    {
                        id: 5,
                        studentName: '王天蓝',
                        sex: '男',
                        score: 97,
                        rank: 5
                    },
                    {
                        id: 6,
                        studentName: '王天蓝',
                        sex: '男',
                        score: 97,
                        rank: 6
                    },
                    {
                        id: 7,
                        studentName: '李牧',
                        sex: '男',
                        score: 98,
                        rank: 7
                    },
                    {
                        id: 8,
                        studentName: '王天蓝',
                        sex: '男',
                        score: 97,
                        rank: 8
                    },
                    {
                        id: 9,
                        studentName: '李牧',
                        sex: '男',
                        score: 98,
                        rank: 9
                    },
                    {
                        id: 10,
                        studentName: '王天蓝',
                        sex: '男',
                        score: 97,
                        rank: 10
                    }
                ],
                allsubjectTop10: [
                    [
                        {
                            id: 1,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 8
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 10
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 8
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 10
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '语文',
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 8
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 10
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '数学',
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 8
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 10
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '物理',
                            rank: 10
                        }
                    ],
                    [
                        {
                            id: 1,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 1
                        },
                        {
                            id: 2,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 2
                        },
                        {
                            id: 3,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 3
                        },
                        {
                            id: 4,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 4
                        },
                        {
                            id: 5,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 5
                        },
                        {
                            id: 6,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 6
                        },
                        {
                            id: 7,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 7
                        },
                        {
                            id: 8,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 8
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 10
                        },
                        {
                            id: 10,
                            studentName: '叶凡',
                            sex: '男',
                            score: 99,
                            subject: '化学',
                            rank: 10
                        }
                    ]
                ],
                subjectTop10: [
                    {
                        id: 1,
                        studentName: '叶凡',
                        sex: '男',
                        score: 99,
                        subject: '数学',
                        rank: 1
                    },
                    {
                        id: 1,
                        studentName: '叶凡',
                        sex: '男',
                        score: 99,
                        subject: '数学',
                        rank: 2
                    },
                    {
                        id: 1,
                        studentName: '叶凡',
                        sex: '男',
                        score: 99,
                        subject: '数学',
                        rank: 3
                    },
                    {
                        id: 1,
                        studentName: '叶凡',
                        sex: '男',
                        score: 99,
                        subject: '数学',
                        rank: 4
                    }
                ],
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
                // 区域学校通过率
                regionalSchoolPassRate: {},
                // 学科通过率
                option: {
                    xAxis: {
                        type: 'category',
                        data: ['语文', '数学', '英语', '物理', '历史', '政治', '体育']
                    },
                    yAxis: {
                        type: 'value',
                        name: '通过率(%)'
                    },
                    series: [{
                        data: [90, 91, 92, 96, 89, 85, 84],
                        type: 'bar'
                    }]
                },
                // option2:
                subjectPassEchart: null,
                segmentEchart: null,
                scoreEchart: null,
                timer1: null
            }
        },
        mounted () {
            this.subjectPassEchart = document.getElementById('subject-pass-rate')
            this.segmentEchart = document.getElementById('segment')
            this.scoreEchart = document.getElementById('high-score-segment')
            this.regionalSchoolPassRate = this.$echarts.init(document.getElementById('regional-school-pass-rate'))
            // echarts.init(this.regionalSchoolPassRate).setOption(this.regionalSchoolPassRateOption)
            this.regionalSchoolPassRateEcharts()
            echarts.init(this.subjectPassEchart).setOption(this.option)

            /*  var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
            console.log(data.length) */
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
            }, 1000)
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
                        top: 20,
                        textStyle: {
                            color: '#010101'
                        },
                        data: ['语文', '数学', '英语', '物理', '化学', '政治', '历史']
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
                        name: '区域学校通过率（%）',
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
            .school {
                font-size: 24px;
            }
            .select-box {
                margin-top: 20px;
            }
            .el-select + .el-select {
                margin-left: 10px;
            }
            .score-anal-box {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #f0f0f0;
            }
            .exam-title {
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
            .exam-name {
                margin-top: 10px;
                font-size: 14px;
                text-align: center;
            }
            .exam-time {
                margin-top: 10px;
                font-size: 14px;
                text-align: center;
                span {
                    margin-right: 20px;
                }
                b {
                    margin-right: 5px;
                }
            }
            .card-box {
                // padding-left: 15px;
                width: 100%;
                margin-top: 30px;
                margin-bottom: 60px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-around;
                // align-content: space-around;
            }
            .card-box1 {
                width: 100%;
                margin-top: 30px;
                margin-bottom: 60px;
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
            .card-item {
                // float: left;
                width: 22%;
                height: 110px;
                margin-top: 30px;
                /*   margin-right: 35px; */
                box-sizing: border-box;
                box-shadow: 0 0 30px #f0f6ff;
                border-radius: 10px;
                text-align: center;
                .label {
                    margin-top: 22px;
                    margin-bottom: 20px;
                    font-size: 20px;
                    line-height: 20px;
                }
                .num {
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
            .echart-box {
                width: 100%;
                height: 500px;
                margin-bottom: 30px;
                box-shadow: 0 0 30px #f0f6ff;
                border-radius: 10px;
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
