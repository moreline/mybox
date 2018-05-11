<template>
    <div class="dz-header-wrapper">
        <div class="dz-header fn-clear">
            <div class="header-logo-wrapper fn-left">
                <div class="logo"></div>
            </div>
            <div class="header-nav-wrapper fn-left fn-clear">
                <div v-for="(item,index) in navList"
                     :key="index"
                     class="nav-list fn-right"
                     @click="showNavList(item,index,'one')"
                     :class="oneNavIndex === index? 'active' : ''"
                >{{item.navName}}
                </div>
                <transition name="el-zoom-in-top">
                    <div class="two-nav-wrapper" v-show="twoNavShow" :style="{right:twoNavLeft + 'px'}">
                        <div class="two-nav-list"
                             v-for="(item,index) in twoNavList"
                             :key="index"
                             @click="showNavList(item,index,'two')"
                             :class="twoNavIndex === index? 'active' : ''"
                        >
                            {{item.navName}}
                        </div>
                        <transition name="el-zoom-in-center">
                            <div class="thr-nav-wrapper" v-show="thrNavShow"
                                 :style="{top:thrNavTop + 'px',left:thrNavLeft + 'px'}">
                                <div class="thr-nav-list"
                                     v-for="(item,index) in thrNavList"
                                     :key="index"
                                     @click="goThrList(item,index)"
                                     :class="thrNavIndex === index? 'active' : ''"
                                >
                                    {{item.navName}}
                                </div>
                            </div>
                        </transition>
                    </div>
                </transition>
            </div>
        </div>
        <div class="dz-content-wrapper" ref="contentHeight">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    /**
     * 头部组件
     * @author dz-tangpeng-20180502
     */
    export default {
        name: 'DzHeader',
        data () {
            return {
                navList: [
                    {
                        navName: '学校数据',
                        navPath: 'SchoolData'
                    },
                    {
                        navName: '教职工信息',
                        navPath: 'teacherInfo'
                    },
                    {
                        navName: '学生信息',
                        navPath: 'studentInfo'
                    },
                    {
                        navName: '成绩管理',
                        navPath: 'gradeManage'
                    },
                    {
                        navName: '体质健康',
                        navPath: 'PhysicalHealth'
                    },
                    {
                        navName: '控辍保学',
                        navPath: 'DropoutControl'
                    },
                    {
                        navName: '奖惩情况',
                        children: [
                            {
                                navName: '教职工奖励',
                                navPath: 'RewardsTeacher'
                            },
                            {
                                navName: '教职工惩罚',
                                navPath: 'PunishmentTeacher'
                            },
                            {
                                navName: '学生奖励',
                                navPath: 'RewardsStudent'
                            },
                            {
                                navName: '学生惩罚',
                                navPath: 'PunishmentStudent'
                            }
                        ]
                    },
                    {
                        navName: '学籍卡',
                        navPath: 'StudentCard'
                    },
                    {
                        navName: '课程管理',
                        navPath: 'CourseManage'
                    },
                    {
                        navName: '课表管理',
                        navPath: 'ScheduleManage'
                    },
                    {
                        navName: '校舍管理',
                        navPath: 'SchoolBuildingList'
                    }
                ], //  导航栏数据
                oneNavIndex: '', // 一级导航的索引
                twoNavIndex: '', // 二级导航的索引
                thrNavIndex: '', // 三级导航的索引
                twoNavShow: false, // 二级导航的显示
                thrNavShow: false, // 三级导航的显示
                twoNavList: [], // 二级导航的数据
                thrNavList: [] // 三级导航的数据
            }
        },
        computed: {
            twoNavLeft () {
                // -50是容器一半的宽度
                let right = parseInt(this.oneNavIndex) * 100 - 50
                return right
            },
            thrNavTop () {
                let top = parseInt(this.twoNavIndex) * 57
                return top
            },
            thrNavLeft () {
                // +40 是20的pandding
                let left = -(this.thrNavList.length * 120 + 40)
                return left
            }
        },
        created () {
            // 把数据倒叙
            this.navList = this.navList.reverse()
            // 刷新页面时获取本地session的数据
            this.oneNavIndex = parseInt(sessionStorage.getItem('oneNavIndex')) || 10
            if (!isNaN(parseInt(sessionStorage.getItem('twoNavIndex')))) {
                this.twoNavIndex = parseInt(sessionStorage.getItem('twoNavIndex'))
            }
            if (!isNaN(parseInt(sessionStorage.getItem('thrNavIndex')))) {
                this.thrNavIndex = parseInt(sessionStorage.getItem('thrNavIndex'))
            }
        },
        mounted () {
            // 初始化页面高度
            this.$refs.contentHeight.style.minHeight = window.innerHeight - 175 + 'px'
        },
        methods: {
            /**
             * 显示下一级组件
             * @author dz-tangpeng-20180502
             * @param {object} item 当前数据
             * @param {number} index 当前索引
             * @param {string}  str  one/two
             */
            showNavList (item, index, str) {
                // 如果是一级导航栏就存一级导航栏的index
                if (str === 'one') {
                    sessionStorage.setItem('oneNavIndex', index)
                    this.oneNavIndex = index
                }
                // 如果是2级导航栏就存2级导航栏的index
                if (str === 'two') {
                    sessionStorage.setItem('twoNavIndex', index)
                    this.twoNavIndex = index
                }
                // router跳转地址
                if (item.navPath) {
                    this.twoNavShow = false
                    this.thrNavShow = false
                    this.$router.push({name: item.navPath})
                }
                // 如果有子级
                if (item.children) {
                    // 如果是一级导航栏就吧二级导航栏true并把数据赋值
                    if (str === 'one') {
                        this.twoNavShow = !this.twoNavShow
                        this.twoNavList = item.children
                    }
                    // 如果是二级导航栏就吧三级导航栏true并把数据赋值
                    if (str === 'two') {
                        this.thrNavShow = !this.thrNavShow
                        this.thrNavList = item.children
                    }
                }
            },
            goThrList (item, index) {
                sessionStorage.setItem('thrNavIndex', index)
                this.thrNavIndex = index
                this.$router.push({name: item.navPath})
            }
        }
    }
</script>

<style lang="less">
    .dz-header-wrapper {
        min-height: 100%;
        width: 100%;
        background-color: #f2f5fa;
        padding: 125px 93px 45px;
        box-sizing: border-box;
        .dz-header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 30;
            padding: 0 80px;
            width: 100%;
            box-sizing: border-box;
            background-color: #fff;
            height: 80px;
            color: #212123;
            box-shadow: 0 1px 10px rgba(0, 0, 0, .1);
            .header-logo-wrapper {
                width: 215px;
                padding: 21px 0;
                .logo {
                    width: 215px;
                    height: 38px;
                    background: url(./logo.png) no-repeat;
                }
            }
            .header-nav-wrapper {
                position: relative;
                width: calc(100% - 215px);
                .nav-list {
                    line-height: 80px;
                    width: 100px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    text-align: center;
                    &.active {
                        color: #3c90ff;
                        border-bottom: 2px solid #3c90ff;
                    }
                    &:hover {
                        color: #3c90ff;
                        border-bottom: 2px solid #3c90ff;
                    }
                }
                .two-nav-wrapper {
                    position: absolute;
                    top: 70px;
                    width: 200px;
                    text-align: center;
                    z-index: 21;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
                    .two-nav-list {
                        height: 57px;
                        line-height: 57px;
                        color: #444448;
                        font-size: 16px;
                        cursor: pointer;
                        &:hover {
                            color: #3c90ff;
                            background-color: #e2eeff;
                        }
                        &.active {
                            color: #3c90ff;
                            background-color: #e2eeff;
                        }
                    }
                    .thr-nav-wrapper {
                        position: absolute;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, .3);
                        height: 78px;
                        line-height: 78px;
                        padding: 0 20px;
                        border-radius: 8px;
                        .thr-nav-list {
                            width: 120px;
                            font-size: 14px;
                            color: #444448;
                            cursor: pointer;
                            &:hover {
                                color: #3c90ff;
                            }
                            &.active {
                                color: #3c90ff;
                            }
                        }
                    }
                }
            }
        }
        .dz-content-wrapper {
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            padding: 52px 10%;
        }
    }
</style>
