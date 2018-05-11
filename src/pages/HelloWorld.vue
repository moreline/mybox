<template>
    <div class="hello">
        <!--<h1>{{ msg }}</h1>-->
        <!--<h2>Essential Links</h2>-->
        <h2>TODO- 将element改为 按需加载.</h2>
        <div class="dz-temp-ul">
            <h2>数据管理</h2>
            <ul>
                <li v-for="(item, index) in pageDataManage" :key="index">
                    <el-button v-if="item.flg" @click="moveTo(item.pathName)" type="primary" size="mini">{{item.label}}</el-button>
                    <el-button v-else size="mini">{{item.label}}</el-button>
                </li>
            </ul>
            <el-button @click="startHacking">Start</el-button>
        </div>

        <div class="dz-temp-ul">
            <h2>数据分析</h2>
            <ul>
                <li v-for="(item, index) in pageDataAnalyse" :key="index">
                    <el-button v-if="item.flg" @click="moveTo(item.pathName)" type="primary" size="mini">{{item.label}}</el-button>
                    <el-button v-else size="mini">{{item.label}}</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const PAGE_MANAGE_LIST = [
        {label: 'DemoPage', pathName: 'SchoolData', flg: true},
        {label: 'EchartsDemo', pathName: 'DemoEcharts', flg: true},
        {label: '学校数据', pathName: 'SchoolData', flg: true},
        {label: '教职工信息管理', pathName: 'teacherInfo', flg: true},
        {label: '学生/家长信息管理', pathName: 'studentInfo', flg: true},

        {label: '成绩管理', pathName: 'gradeManage', flg: true},
        {label: '体质健康', pathName: 'PhysicalHealth', flg: true},
        {label: '控辍保学', pathName: 'DropoutControl', flg: true},
        {label: '奖惩情况-教职工奖励', pathName: 'RewardsTeacher', flg: true},
        {label: '奖惩情况-教职工惩处', pathName: 'PunishmentTeacher', flg: true},

        {label: '奖惩情况-学生奖励', pathName: 'RewardsStudent', flg: true},
        {label: '奖惩情况-学生惩处', pathName: 'PunishmentStudent', flg: true},
        {label: '学籍卡', pathName: 'StudentCard', flg: true},
        {label: '课程管理', pathName: 'CourseManage', flg: true},
        {label: '课表管理', pathName: 'ScheduleManage', flg: true},

        {label: '校舍管理', pathName: 'SchoolBuildingList', flg: true},
        {label: '房间列表', pathName: 'SchoolRoomList', flg: true},
        {label: '教师信息管理', pathName: 'teacherInfo', flg: true},

        {label: '教职工数据', pathName: 'StaffData', flg: true},
        {label: '首页-概览', pathName: 'Home', flg: true}
    ]

    const PAGE_ANALYSE_LIST = [
        {label: '学校数据-学校班级', pathName: 'schoolClass', flg: true},
        {label: '教育动态', pathName: 'EducationDynamics', flg: true},
        {label: '教职工数据', pathName: 'StaffData', flg: true},
        {label: '学生数据', pathName: 'studentInfoStatic', flg: true},
        {label: '学生属性', pathName: 'studentTypeStatic', flg: true},
        {label: '家长分析', pathName: 'ParentAnalyse', flg: true},
        {label: '成绩分析', pathName: 'Score', flg: true}
        // {label: '成绩分析1', pathName: 'Score1', flg: true}
    ]

    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        created: function () {
            console.log('[HelloWorld] --> created!')
            this.API.initPage(result => {
                console.log('[HelloWorld] --> POST:调用接口!')
            })
            this.API.testGetReq(result => {
                console.log('[HelloWorld] --> GET:调用接口!')
            })
        },
        methods: {
            startHacking () {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 3000
                })
            },
            moveTo (pathName) {
                console.log(pathName)
                this.$router.push({name: pathName})
            }
        },
        computed: {
            /**
             * 数据管理.
             */
            pageDataManage: function () {
                return PAGE_MANAGE_LIST
            },
            /**
             * 数据分析.
             */
            pageDataAnalyse: function () {
                return PAGE_ANALYSE_LIST
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: decimal;
        padding: 0;
    }

    li {
        display: list-item;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .hello{
        button {
            margin-top: 10px
        }
    }
    /*style="margin-left: 20px; width: 300px;"*/
    .dz-temp-ul {
        position: relative;
        float: left;
        padding-left: 20px;
        width: 300px;

    }
</style>
