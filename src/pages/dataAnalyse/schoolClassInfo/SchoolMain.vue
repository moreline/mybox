<template lang="html">
    <div class="school-class">
        <el-main class="main-content">
            <el-tabs class="school-tabs" v-model="activeFirst" @tab-click="changeTabs">
                <el-tab-pane v-for="(item, index) in titleData" :key="index" :label=item.lbl  :name=item.name ></el-tab-pane>
            </el-tabs>
            <div>
                <router-view></router-view>
            </div>
        </el-main>
    </div>
</template>

<script>
    const MENU_LIST = [
        {
            lbl: '学校&班级',
            name: 'SchoolOutline'
        }, {
            lbl: '教室统计',
            name: 'SchoolMainClassroom'
        }, {
            lbl: '校舍建筑面积',
            name: 'SchoolMainBuilding'
        }, {
            lbl: '校舍土地面积',
            name: 'SchoolMainLand'
        }, {
            lbl: '资产统计',
            name: 'SchoolMainAssets'
        }
    ]
    /**
     * 学校数据.
     * 参考 lixiaoying 代码, 重构.
     * @author dz-gonglong-20180509
     */
    export default {
        name: 'SchoolMain',
        data () {
            return {
                activeFirst: 'SchoolOutline', // 第一层tabs对应name
                menuAutoPlayTimer: null,
                // 重置 定时器: 用以恢复自动播放定时器;
                resetTimer: null,
                timerCount: 0,
                titleData: MENU_LIST,
                // 自动播放-时间间隔(毫秒).
                duration: 10000
            }
        },
        mounted: function () {
            this.openMenuAutoPlayTimer()
        },
        beforeDestroy: function () {
            this.closeAllTimer()
        },
        methods: {
            /**
             * 第一层tab点击事件，让图形重新加载
             * @param  {string}  val  第一层tabs对应索引
             */
            changeTabs: function (tab, event) {
                this.activeFirst = tab.paneName
                // this.timerCount = tab.index
                console.log(tab)
                if (event !== null) {
                    // 手动操作， 关闭自动轮播
                    this.closeMenuAutoPlayTimer()
                    // 打开 充值定时器
                    this.openResetTimer()
                    this.closeAutoPlayMixin()
                }
                this.$router.push({name: tab.paneName})
            },
            /**
             * 打开 菜单轮播 定时器
             */
            openMenuAutoPlayTimer: function () {
                this.menuAutoPlayTimer = setInterval(() => {
                    let idx = this.timerCount % MENU_LIST.length
                    console.log(idx)
                    console.log('%c 学校数据main- 执行轮播:' + MENU_LIST[idx].name, 'background-color: yellow;')
                    this.changeTabs({paneName: MENU_LIST[idx].name}, null)
                    this.timerCount++
                }, this.duration)
            },
            /**
             * 关闭 菜单轮播 定时器
             */
            closeMenuAutoPlayTimer: function () {
                // console.log('%c 学校数据main- 关闭 菜单轮播!', 'background-color: pink;')
                clearInterval(this.menuAutoPlayTimer)
                this.menuAutoPlayTimer = null
            },
            /**
             * 打开 重置定时器..
             */
            openResetTimer: function () {
                // 关闭上次的 定时器
                this.closeResetTimer()
                this.resetTimer = setTimeout(() => {
                    this.openMenuAutoPlayTimer()
                }, 5000)
            },
            /**
             * 关闭 重置定时器..
             */
            closeResetTimer: function () {
                clearTimeout(this.resetTimer)
                this.resetTimer = null
            },
            closeAllTimer: function () {
                this.closeMenuAutoPlayTimer()
                this.closeResetTimer()
            }
        }
    }
</script>

<style lang="less">
    .school-class {
        width: 100%;
        .school-shadow {
            cursor: pointer;
        }
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
                &:hover, &.selected {
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
