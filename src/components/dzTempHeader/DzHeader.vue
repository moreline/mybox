<template lang="html">
<div class="dz-header-wrap">
    <div class="logo"></div>
    <div class="nav-bar">
        <!-- 一级菜单 -->
        <!--<el-tabs v-model="firlevelNavSelected" :value="firlevelNavSelected" @tab-click="handleFirstlevelTab">-->
        <el-tabs v-model="firlevelNavSelected" @tab-click="handleFirstlevelTab">
            <el-tab-pane v-for="(item, idx) in pageNavDataFirstLevel" :key="idx" :name="item.routerName" :label="item.lbl">{{item.lbl}}</el-tab-pane>
        </el-tabs>
    </div>
    <transition name="el-zoom-in-top">
        <div class="nav-menu-dropdown" v-show="secLevelNavVisable">
            <!-- 二级菜单 -->
            <div class="menu-dropdown-mask" @click="closeSecLevelMenu"></div>
            <!--<div ref="second_level_menu" class="menu-list" :style="{right: pageSecNavPos + 'px'}">-->
            <div ref="second_level_menu" class="menu-list">
                <!-- <div class="menu-item">aa-112</div> -->
                <div class="menu-item" :class="(secItem.flg) ? 'selected':'' " v-for="(secItem, secIdx) in pageSecLevelNavData" :key="secIdx"
                     @click="handelSecLevMenuClick(secIdx, secItem.routerName)" @mouseover="handelSecLevMenuHover">{{secItem.lbl}}
                </div>
            </div>
        </div>
    </transition>
    <div class="nav-menu-popover" v-show="thrLevelNavVisable">
        <!-- 三级菜单 -->
        <div class="menu-popover-mask"></div>
        <div class="menu-list" style="">
            <div class="menu-item">bb-112</div>
            <div class="menu-item">bb-223</div>
        </div>
    </div>
</div>
</template>

<script>
/**
 * 区域端--公用组件: header.
 *
 * @author dz-gonglong-20180504
 */
const NAV_DATA = [
    {
        lbl: '概览',
        routerName: 'Home',
        children: null
    },
    {
        lbl: '平台介绍',
        routerName: 'Banner',
        children: null
    },
    {
        lbl: '教育动态',
        routerName: 'EducationDynamics',
        children: null
    },
    {
        lbl: '学校数据',
        routerName: 'schoolClass',
        children: null
    },
    {
        lbl: '教职工信息',
        routerName: 'StaffData',
        children: null
    },
    {
        lbl: '学生信息',
        routerName: 'studentInfoStatic',
        // routerName: 'Header_Item_1',
        children: [
            {
                lbl: '统计维度',
                routerName: 'studentInfoStatic',
                flg: false
            },
            {
                lbl: '属性维度',
                routerName: 'studentTypeStatic',
                flg: false
            }
        ]
    },
    {
        lbl: '家长分析',
        routerName: 'ParentAnalyse',
        children: null
    },
    {
        lbl: '成绩分析',
        routerName: 'Score',
        children: null
    },
    {
        lbl: '数据管理',
        // routerName: 'Header_Item_2',
        routerName: 'SchoolData',
        children: [
            {
                lbl: '学校数据',
                routerName: 'SchoolData',
                flg: false
            },
            {
                lbl: '教职工信息管理',
                routerName: 'teacherInfo',
                flg: false
            },
            {
                lbl: '学生/家长信息管理',
                routerName: 'studentInfo',
                flg: false
            },
            {
                lbl: '成绩管理',
                routerName: 'gradeManage',
                flg: false
            },
            {
                lbl: '体质管理',
                routerName: 'PhysicalHealth',
                flg: false
            },
            {
                lbl: '控辍保学',
                routerName: 'DropoutControl',
                flg: false
            },
            {
                lbl: '奖惩情况',
                routerName: 'RewardsStudent',
                flg: false
            },
            {
                lbl: '学籍卡',
                routerName: 'StudentCard',
                flg: false
            },
            {
                lbl: '课表管理',
                routerName: 'ScheduleManage',
                flg: false
            },
            {
                lbl: '课程管理',
                routerName: 'CourseManage',
                flg: false
            },
            {
                lbl: '校舍管理',
                routerName: 'SchoolBuildingList',
                flg: false
            }
        ]
    }
]

export default {
    name: 'DzHeader',
    data () {
        return {
            // 一级菜单的 选中值.
            firlevelNavSelected: '', // Home
            // 一级菜单的 选中项目的下标.
            firlevelNavIdx: 0,
            // 二级菜单的 可见标识.
            secLevelNavVisable: false,
            // 二级菜单 数据, 注: 存在多个二级菜单, 为避免相互影响, 用键值对暂存数据.
            secLevelNavData: [],
            // 三级菜单的 可见标识.
            thrLevelNavVisable: false,
            // 定时器: 自动播放;
            autoPlayTimer: null,
            autoPlayTimerCount: 0,
            // 自动播放-时间间隔(毫秒).
            duration: 300000, // 300000, 5分钟
            // 定时器: 监听页面操作: 恢复 自动播放; (全局标志, 本地标志 同时为true)
            listenPageTimer: null,

            // 自动播放之本地标志， true: 开启, false: 关闭
            localAutoPlayFlg: true,
            // 定时器: 用以设置 自动播放之本地标志.
            localAutoPlayFlgTimer: null
        }
    },
    created: function () {
        console.log('%c test-header create.')
        let localDuration = sessionStorage.getItem('DZ_HEADER_DURATION')
        if (typeof localDuration !== 'undefined' && localDuration !== null) {
            localDuration = parseInt(localDuration, 10)
            if (!isNaN(localDuration)) {
                this.duration = localDuration
            }
        }

        sessionStorage.setItem('DZ_HEADER_DURATION', this.duration + '')
    },
    mounted: function () {
        let routeName = this.$route.name
        // console.log('%c TEST-Header-mounted -->routeName:' + routeName, 'background-color:pink')
        if (routeName !== 'HelloWorld') { // TODO -- 开发用(其他vue文件不需要此判断逻辑)
            this.openAutoTimer()
        }
    },
    beforeDestroy: function () {
        this.closeAllTimer()
    },
    methods: {
        /**
         * 监听 一级菜单.
         */
        handleFirstlevelTab: function (tab, event) {
            // tab.index, tab.paneName
            console.log('handleFirstlevelTab--> index:' + tab.index)
            // console.log('handleFirstlevelTab--> pos:' + JSON.stringify({x: event.x, y: event.y}))
            if (event !== null) {
                // 手动查看
                this.closeAutoTimer()
                this.autoPlayTimerCount = tab.index
            }

            var tmpOldNavIdx = this.firlevelNavIdx
            this.firlevelNavSelected = tab.paneName
            this.firlevelNavIdx = parseInt(tab.index, 10)

            if (event === null) {
                // 自动播放: 直接跳转页面. 关闭二级菜单.
                this.closeSecLevelMenu()
                this.moveTo(tab.paneName)
            } else {
                if (this.pageNavDataFirstLevel[tab.index].children !== null) {
                    // 显示 二级菜单
                    this.secLevelNavData = NAV_DATA[this.firlevelNavIdx].children
                    if (tmpOldNavIdx !== parseInt(tab.index, 10)) {
                        // 点击另外的 二级菜单.
                        this.resetSecLevelMenu()
                    }
                    let posLeft = (Math.round(event.pageX / 100) * 100) - 130
                    this.$refs.second_level_menu.style.left = posLeft + 'px'
                    // this.$refs.second_level_menu
                    this.openSecLevelMenu()
                } else {
                    // 一级菜单-页面跳转.
                    // this.firlevelNavIdx = tab.index
                    this.closeSecLevelMenu()
                    this.moveTo(tab.paneName)
                }
            }
        },
        /**
         * 监听 二级菜单 点击事件.
         *
         * @param {String} idx 菜单下标
         * @param {String} pathName 路径(router)name
         */
        handelSecLevMenuClick: function (idx, pathName) {
            console.log('handelSecLevMenuClick --> idx:' + idx)
            this.resetSecLevelMenu()
            this.secLevelNavData[idx]['flg'] = true
            if (typeof this.secLevelNavData[idx].children === 'undefined') {
                this.closeSecLevelMenu()
                this.moveTo(pathName)
            }
            // console.log('handelSecLevMenuClick --> this.pageSecLevelNavData:' + JSON.stringify(this.pageSecLevelNavData))
        },
        /**
         * 监听 二级菜单 hover事件.
         */
        handelSecLevMenuHover: function () {
            console.log('handelSecLevMenuHover --> mouseover')
        },
        /**
         * 打开 二级菜单.
         */
        openSecLevelMenu: function () {
            this.secLevelNavVisable = true
            // console.log('this.secLevelNavData:' + JSON.stringify(this.secLevelNavData))
        },
        /**
         * 重置 二级菜单 选中值.
         */
        resetSecLevelMenu: function () {
            for (var i = 0, len = this.secLevelNavData.length; i < len; i++) {
                this.secLevelNavData[i]['flg'] = false
            }
        },
        /**
         * 关闭 二级菜单.
         */
        closeSecLevelMenu: function () {
            this.secLevelNavVisable = false
        },
        /**
         * 页面跳转.
         * @param {String} pathName 路径(router)name
         */
        moveTo: function (pathName) {
            this.$router.push({ name: pathName })
        },
        /**
         * 打开自动播放定时器.
         */
        openAutoTimer: function () {
            let navNum = NAV_DATA.length
            this.autoPlayTimer = setInterval(() => {
                console.log('%c TEST-header 打开自动播放定时器 -->:' + JSON.stringify({
                    autoPlay: this.getAutoPlayMixin(),
                    localAutoPlayFlg: this.localAutoPlayFlg
                }), 'background-color:pink;')

                if (this.getAutoPlayMixin()) {
                    this.autoPlayTimerCount++
                    if (this.autoPlayTimerCount === 8) {
                        // 数据管理 不用进入自动播放
                        this.autoPlayTimerCount = 0
                    }
                    let tempIdx = this.autoPlayTimerCount % navNum
                    let tempNavItem = NAV_DATA[tempIdx]
                    this.handleFirstlevelTab({paneName: tempNavItem.routerName, index: tempIdx}, null)
                } else {
                    // 子页面有人工操作
                    this.closeAutoTimer()
                }
            }, this.duration)
        },
        /**
         * 关闭自动播放定时器.
         */
        closeAutoTimer: function () {
            // this.closeAutoPlayMixin()
            clearInterval(this.autoPlayTimer)
            // 如果约定时间内没有操作, 则恢复 顶部菜单自动播放
            this.openListenTimer()

            this.localAutoPlayFlg = false
            clearTimeout(this.localAutoPlayFlgTimer)
            this.localAutoPlayFlgTimer = setTimeout(() => {
                this.localAutoPlayFlg = true
            }, this.duration)

            console.log('%c TEST-header 关闭自动播放定时器  -->' + JSON.stringify({
                autoPlay: this.getAutoPlayMixin(),
                localAutoPlayFlg: this.localAutoPlayFlg
            }), 'background-color:lightblue;')
        },
        /**
         * 打开 恢复'自动播放'定时器.
         */
        openListenTimer: function () {
            // clear上次的 定时器.
            this.closeListenTimer()
            this.listenPageTimer = setInterval(() => {
                if (this.getAutoPlayMixin() && this.localAutoPlayFlg) {
                    this.closeListenTimer()
                    this.openAutoTimer()
                }

                console.log('%c TEST-header 恢复定时器-5:' + JSON.stringify({
                    autoPlay: this.getAutoPlayMixin(),
                    localAutoPlayFlg: this.localAutoPlayFlg
                }), 'background-color: yellow;')
            }, this.duration)
        },
        /**
         * 关闭 恢复'自动播放'定时器.
         */
        closeListenTimer: function () {
            clearInterval(this.listenPageTimer)
            this.listenPageTimer = null
        },
        /**
         * 永远 清除所有 定时器.
         */
        closeAllTimer: function () {
            clearInterval(this.autoPlayTimer)
            this.autoPlayTimer = null
            this.closeListenTimer()
        }
    },
    computed: {
        /**
         * 一级菜单数据
         */
        pageNavDataFirstLevel: function () {
            return NAV_DATA
        },
        /**
         * 二级菜单数据
         */
        pageSecLevelNavData: function () {
            // 根据一级菜单的下标 获取二级菜单数据
            // let tmpSecData = NAV_DATA[this.firlevelNavIdx].children
            // console.log('pageSecLevelNavData:' + JSON.stringify(tmpSecData))
            return this.secLevelNavData
        },
        /**
         * 二级菜单 定位,
         */
        pageSecNavPos: function () {
            // let rightVal = (6 - this.firlevelNavIdx) * 100
            // window.innerWidth -
            let rightVal = (6 - this.firlevelNavIdx) * 50 + 50
            return rightVal
        }
    },
    watch: {
        '$route': function (a, b) {
            // TODO -- watch.'$route' 调查次方案: 性能,官方支持,替代方案 -- gonglong 20180507
            this.firlevelNavSelected = a.name
            let tempNavName = a.name
            if (this.firlevelNavIdx === 5) {
                tempNavName = 'studentInfoStatic'
            } else if (this.firlevelNavIdx === 8) {
                tempNavName = 'SchoolData'
            } else if (this.firlevelNavIdx === 3) {
                tempNavName = 'schoolClass'
            }
            this.firlevelNavSelected = tempNavName
            // console.log('TEST-DzHeader -》 watch $route firlevelNavIdx:' + this.firlevelNavIdx)
        }
    }
}
</script>

<style lang="less">
@header-color-default: #212123;
@header-comm-h: 80px;
@nav-active-bg-color: #e2eeff;
@nav-active-ft-color: #409eff;

.dz-header-wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    min-width: 1100px;
    height: @header-comm-h;
    padding: 0 80px;
    color: @header-color-default;
    background-color: #ffffff;
    /*box-shadow: 0 1px 10px rgba(255, 152, 0, 0.5);*/
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    z-index: 999;
    .logo {
        position: relative;
        left: 0px;
        top: 0px;
        width: 290px;
        height: 100%;
        // background-color: pink;
        background-image: url("./logo.png");
        background-repeat: no-repeat;
        background-position: center;
    }

    .nav-bar {
        position: absolute;
        right: 90px;
        top: 0px;
        width: 900px;
        height: 100%;
        line-height: @header-comm-h;
        // background-color: yellow;
        overflow: hidden;

        .el-tabs__nav {
            float: right;
        }
        .el-tabs__nav-wrap {
            &:after {
                // background-color: none;
                height: 0px;
            }
        }
    }

    .menu-dropdown-mask,
    .menu-popover-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .nav-menu-dropdown {
        position: absolute;
        top: 0px;
        left: 0px;
        // left: 100px; // TODO-动态计算.
        z-index: 2000;
        background-color: pink;

        .menu-dropdown-mask {
            z-index: 5000;
        }

        .menu-list {
            position: fixed;
            top: 100px;
            // right: 300px;
            width: 200px;
            color: #444448;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            box-sizing: border-box;
            background-color: #ffffff;
            z-index: 5001;

            .menu-item {
                position: relative;
                height: 60px;
                line-height: 60px;
                box-sizing: border-box;
                &:hover {
                    background-color: @nav-active-bg-color;
                }
                &:active,
                &.selected {
                    color: @nav-active-ft-color;
                    background-color: @nav-active-bg-color;
                    // background-color: pink;
                }
            }
        }
    }

    .nav-menu-popover {
        display: none;
        .menu-popover-mask {
            z-index: 5500;
        }
    }
}
</style>
