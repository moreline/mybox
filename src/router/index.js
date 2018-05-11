import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import EchartsDemo from '@/pages/EchartsDemo'

const SchoolData = () => import('@/pages/dataManage/SchoolData')
const CourseManage = () => import('@/pages/dataManage/CourseManage')
const ScheduleManage = () => import('@/pages/dataManage/ScheduleManage')
const StudentCard = () => import('@/pages/dataManage/StudentCard')
const SchoolBuildingList = () => import('@/pages/dataManage/SchoolDormitoryManage/SchoolBuildingList')

const SchoolRoomList = () => import('@/pages/dataManage/SchoolDormitoryManage/SchoolRoomList')
const RewardsTeacher = () => import('@/pages/dataManage/RewardsTeacher')
const PunishmentTeacher = () => import('@/pages/dataManage/PunishmentTeacher')
const DropoutControl = () => import('@/pages/dataManage/DropoutControl')
const PhysicalHealth = () => import('@/pages/dataManage/PhysicalHealth')

const RewardsStudent = () => import('@/pages/dataManage/RewardsStudent')
const PunishmentStudent = () => import('@/pages/dataManage/PunishmentStudent')
const StaffData = () => import('@/pages/dataAnalyse/StaffData')
const ParentAnalyse = () => import('@/pages/dataAnalyse/ParentAnalyse')

// 教职工信息管理
const teacherInfoMange = () => import('@/pages/dataManage/TeacherInfoManage')
// 学生家长信息管理
const studentInfoMange = () => import('@/pages/dataManage/StudentInfoManage')
// 成绩管理
const gradeManage = () => import('@/pages/dataManage/GradeManage')
// 学校和班级
const schoolClass = () => import('@/pages/dataAnalyse/SchoolClass')
// 学校数据重构-TODO
const SchoolMain = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolMain')
const SchoolMainAssets = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolMainAssets')
const SchoolMainBuilding = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolMainBuilding')
const SchoolMainClassroom = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolMainClassroom')
const SchoolMainLand = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolMainLand')
const SchoolOutline = () => import('@/pages/dataAnalyse/schoolClassInfo/SchoolOutline')
// 教育动态
const EducationDynamics = () => import('@/pages/dataAnalyse/EducationDynamics')
// 成绩分析
const Score = () => import('@/pages/dataAnalyse/Score')
// 成绩分析1
const Score1 = () => import('@/pages/dataAnalyse/Score1')
// 学生信息统计
const StudentInfoStatic = () => import('@/pages/dataAnalyse/studentInfo/studentInfo')
// 学生属性统计
const StudentTypeStatic = () => import('@/pages/dataAnalyse/StudentInfo/studentType')
// 首页-概览
const Home = () => import('@/pages/Home')

// 全屏banner
const Banner = () => import('@/pages/Banner')

Vue.use(Router)

var router = new Router({
    routes: [
        {
            path: '/',
            redirect: {name: 'Home'},
            name: 'HelloWorld',
            meta: {title: '开发引导页'},
            component: HelloWorld
        },
        {
            path: '/home',
            name: 'Home',
            meta: {title: '概览'},
            component: Home
        },
        {
            path: '/banner',
            name: 'Banner',
            meta: {title: '世纪海航教育科技集团'},
            component: Banner
        },
        {
            path: '/school-data',
            name: 'SchoolData',
            meta: {title: '学校数据'},
            component: SchoolData
        },
        {
            path: '/echarts',
            name: 'EchartsDemo',
            component: EchartsDemo
        },
        {
            path: '/teacher-info',
            name: 'teacherInfo',
            meta: {title: '教职工信息管理'},
            component: teacherInfoMange
        },
        {
            path: '/student-info',
            name: 'studentInfo',
            meta: {title: '学生家长信息管理'},
            component: studentInfoMange
        },
        {
            path: '/grade-manage',
            name: 'gradeManage',
            meta: {title: '成绩管理'},
            component: gradeManage
        },
        {
            path: '/dropout-control',
            name: 'DropoutControl',
            meta: {title: '控辍保学管理'},
            component: DropoutControl
        },
        {
            path: '/rewards-teacher',
            name: 'RewardsTeacher',
            meta: {title: '教职工奖励'},
            component: RewardsTeacher
        },
        {
            path: '/punishment-teacher',
            name: 'PunishmentTeacher',
            meta: {title: '教职工惩罚'},
            component: PunishmentTeacher
        },
        {
            path: '/course-manage',
            name: 'CourseManage',
            meta: {title: '课程管理'},
            component: CourseManage
        },
        {
            path: '/schedule-manage',
            name: 'ScheduleManage',
            meta: {title: '课表管理'},
            component: ScheduleManage
        },
        {
            path: '/student-card',
            name: 'StudentCard',
            meta: {title: '学籍卡'},
            component: StudentCard
        },
        {
            path: '/physical-health',
            name: 'PhysicalHealth',
            meta: {title: '体质健康'},
            component: PhysicalHealth
        },
        {
            path: '/school-building-list',
            name: 'SchoolBuildingList',
            meta: {title: '校舍管理'},
            component: SchoolBuildingList
        },
        {
            path: '/school-room-list/:id',
            name: 'SchoolRoomList',
            meta: {title: '房间列表'},
            component: SchoolRoomList
        },
        {
            path: '/rewards-student',
            name: 'RewardsStudent',
            meta: {title: '学生奖励'},
            component: RewardsStudent
        },
        {
            path: '/punishment-student',
            name: 'PunishmentStudent',
            meta: {title: '学生惩处'},
            component: PunishmentStudent
        },
        {
            path: '/school-class',
            name: 'schoolClass',
            meta: {title: '学校和班级'},
            component: schoolClass
        },
        {
            path: '/school-info',
            name: 'SchoolMain',
            redirect: {name: 'SchoolOutline'},
            meta: {title: '学校数据'},
            component: SchoolMain,
            children: [
                {
                    path: 'assets',
                    name: 'SchoolMainAssets',
                    meta: {title: '资产'},
                    component: SchoolMainAssets
                },
                {
                    path: 'build',
                    name: 'SchoolMainBuilding',
                    meta: {title: '校舍建筑面积'},
                    component: SchoolMainBuilding
                },
                {
                    path: 'classroom',
                    name: 'SchoolMainClassroom',
                    meta: {title: '教室统计'},
                    component: SchoolMainClassroom
                },
                {
                    path: 'outline',
                    name: 'SchoolOutline',
                    meta: {title: '学校和班级'},
                    component: SchoolOutline
                },
                {
                    path: 'land',
                    name: 'SchoolMainLand',
                    meta: {title: '校舍土地面积'},
                    component: SchoolMainLand
                }
            ]
        },
        {

            path: '/staff-data',
            name: 'StaffData',
            meta: {title: '教职工数据'},
            component: StaffData
        },
        {
            path: '/education-dynamics',
            name: 'EducationDynamics',
            meta: {title: '教育动态'},
            component: EducationDynamics
        },
        {
            path: '/student-info-static',
            name: 'studentInfoStatic',
            meta: {title: '学生信息统计'},
            component: StudentInfoStatic
        },
        {
            path: '/student-type-static',
            name: 'studentTypeStatic',
            meta: {title: '学生属性统计'},
            component: StudentTypeStatic
        },
        {
            path: '/parent-analyse',
            name: 'ParentAnalyse',
            meta: {title: '家长分析'},
            component: ParentAnalyse
        },
        {
            path: '/score',
            name: 'Score',
            meta: {title: '成绩分析'},
            component: Score
        },
        {
            path: '/score1',
            name: 'Score1',
            meta: {title: '成绩分析'},
            component: Score1
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) { // 如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})
export default router
