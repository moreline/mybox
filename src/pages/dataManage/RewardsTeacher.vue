<template lang="html">
    <div class="rewards-teacher">
        <el-main class="rewards-teacher-list-wrapper">
            <el-row class="rewards-teacher-button-title" style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog @click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <!--搜索组件-->
            <dz-search-data :searchData="searchData" @clickSearch="searchList"
                            @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                <div slot="search">
                    <el-input v-model="searchData.schoolName" placeholder="请输入学校名称" clearable></el-input>
                    <el-input v-model="searchData.rewardsName" placeholder="输入获奖人姓名" clearable></el-input>
                    <el-select v-model="searchData.RewardsLevel" placeholder="请选择奖惩等级" clearable>
                        <el-option
                            v-for="item in pageRewardsLevel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <el-table v-loading="loadingShow" :data="pageRewardTeacherList" class="rewards-teacher-table-list">
                <el-table-column align="center" type="selection" width="50"></el-table-column>
                <el-table-column align="center" prop="id" label="ID"></el-table-column>
                <el-table-column align="center" prop="rewardsName" label="姓名"></el-table-column>
                <el-table-column align="center" prop="idCard" label="身份证号码" width="170"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称" width="170"></el-table-column>
                <el-table-column align="center" prop="rewardProject" label="奖励项目" width="100"></el-table-column>
                <el-table-column align="center" prop="rewardLevel" label="奖励等级" width="100"></el-table-column>
                <el-table-column align="center" prop="rewardWay" label="奖励方式" width="100"></el-table-column>
                <el-table-column align="center" prop="rewardContent" label="奖励内容" width="150"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="toView(scope.row)"
                                   class="local-btn-success">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页器-->
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-content">
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">身份证号码</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.idCard}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">所属学校</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.schoolName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">获奖项目</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardProject}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励级别</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardPlaceLevel}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励等级</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardLevel}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">获奖类别</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardType}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励方式</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardWay}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励名称</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardRealName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励名称码</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardRealNameCode}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">获奖原因</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardWhy}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">奖励内容</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardContent}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">颁奖单位</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardUnit}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">获奖日期</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.rewardTime}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">荣誉称号码</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.honorCode}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">获奖角色码</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.idCard}}</p>
                    </div>

                </div>
                <div class="dz-dialog-btn">
                    <el-button type="primary">确定</el-button>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '教职工奖励'页面.
     * @author dz-liuyang-20180427
     */
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzPager from '@/components/DzPager'
    import DzDialog from '@/components/DzDialog'
    import DzSelectDialog from '@/components/DzSelectDialog'
    import DzSearchData from '@/components/DzSearchData'
    // 固定不变的数据--用常量
    const ALL_BUILDING_TYPES = [
        {
            label: '全部',
            value: '1'
        },
        {
            label: '一等奖',
            value: '2'
        },
        {
            label: '二等奖',
            value: '3'
        },
        {
            label: '三等奖',
            value: '4'
        }
    ]
    export default {
        components: {
            'dz-header': DzHeader,
            'DzPager': DzPager,
            'DzDialog': DzDialog,
            'DzSelectDialog': DzSelectDialog,
            DzSearchData
        },
        name: 'RewardsTeacher',
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 学校名称
                    schoolName: '',
                    // 获奖人姓名
                    rewardsName: '',
                    // 奖罚等级
                    RewardsLevel: '',
                    currentPage: 1,
                    pageSize: 20
                },
                // 学校数据列表
                rewardTeacherList: [],
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: false,
                // 分页数据
                pager: {
                    // 总数据条数
                    total: 0,
                    // 当前页
                    currentPage: 1,
                    // 每页数据size
                    pageSize: 20
                },
                teacherInfo: {},
                // dialog 控制器
                dialogShow: false,
                // 查看详情
                seeDetail: {}
            }
        },
        created: function () {
            this.getRewardTeacherList()
        },
        computed: {
            /**
             * 学校数据列表.
             */
            pageRewardTeacherList: function () {
                return this.rewardTeacherList
            },
            /**
             * 加载状态.
             */
            pageLoadingFlg: function () {
                return this.loadingDataFlg
            },
            /**
             * 奖励等级列表.
             */
            pageRewardsLevel: function () {
                return ALL_BUILDING_TYPES
            }
        },
        methods: {
            /**
             * 导入数据.
             */
            doImportData: function () {
                console.log('导入数据。')
            },
            /**
             * 导出数据.
             */
            doExportData: function () {
                console.log('导出数据。')
            },
            // /**
            //  * 搜索.
            //  */
            // doSearch: function (opts) {
            //     this.getRewardTeacherList()
            //     console.log('按钮: 搜索.' + JSON.stringify(opts))
            // },
            /**
             * 搜索组件.
             */
            searchList () {
                if (this.searchData.schoolName === '' && this.searchData.rewardsName === '' && this.searchData.RewardsLevel) {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getRewardTeacherList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.schoolName = ''
                this.searchData.rewardsName = ''
                this.searchData.RewardsLevel = ''
                /*
                * 重置需要初始化表格
                * */
                this.getRewardTeacherList()
            },
            /**
             * 查看
             */
            toView: function (opts) {
                // console.log(opts)
                this.seeDetail = opts
                // console.log(this.seeDetail)
                this.dialogShow = true
            },
            /**
             * 获取教职工获奖人列表
             *
             * @param {Object} opts 入参
             * @param {Number|String} opts.pageSize 每页size
             * @param {Number|String} opts.pageNo   当前页
             * @param {String} opts.rewardsName     获奖人姓名
             * @param {String} opts.schoolName      获奖人学校名
             * @param {String} opts.rewardLevel     获奖等级
             *
             */
            // getRewardTeacherList: function (opts) {
            //     let searchOpts = {
            //         currentPage: this.pager.currentPage,
            //         pageSize: this.pager.size,
            //         rewardsName: this.rewardsName,
            //         schoolName: this.schoolName,
            //         rewardLevel: this.rewardLevel
            //     }
            //     this.loadingDataFlg = true
            //     this.API.getRewardsTeacherListBySearch(searchOpts, (result) => {
            //         this.loadingDataFlg = false
            //         let dataObj = result.data.content
            //         this.rewardTeacherList = dataObj.list
            //         this.pager.count = dataObj.pager.count
            //         this.pager.currentPage = dataObj.pager.currentPage
            //         console.log(this.rewardTeacherList, dataObj, this.pager)
            //     }, (errorObj) => {
            //         this.$message({
            //             showClose: true,
            //             message: errorObj.message,
            //             type: 'error',
            //             duration: 1500
            //         })
            //         this.loadingDataFlg = false
            //     })
            // },
            /**
             * 获取教职工获奖人列表
             */
            getRewardTeacherList () {
                this.loadingShow = true
                this.API.getRewardsTeacherListBySearch(this.searchData, (res) => {
                    this.rewardTeacherList = res.data.content.list
                    this.pager = res.data.content.pager
                    this.loadingShow = false
                }, (rsp) => {
                    this.$message({
                        showClose: true,
                        message: rsp.message,
                        type: 'error',
                        duration: 1500
                    })
                })
            },
            getRewardsLevelList: function () {
                this.loadingShow = true
                this.API.getRewardsLevel({}, (result) => {
                    this.loadingShow = false
                    this.pageRewardsLevel = result.data.data
                    // console.log(result.data)
                }, (errorObj) => {
                    this.$message({
                        showClose: true,
                        message: errorObj.message,
                        type: 'error',
                        duration: 1500
                    })
                    this.loadingShow = false
                })
            },
            /**
             * 翻页.
             */
            // handlePaging: function (val) {
            //     // this.pageNo = val
            //     console.log(val)
            //     this.getRewardTeacherList()
            //     console.log('执行翻页:' + val)
            // },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getRewardTeacherList()
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
            }
        }
    }
</script>

<style lang="less">
    /* 局部 */
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .rewards-teacher {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .rewards-teacher-list-wrapper {
            /*width: 100%;*/
            box-sizing: border-box;
            padding: 0;
            .rewards-teacher-button-title {
                /*padding-bottom: 10px;*/
                border-bottom: 1px solid #ededed;
                color: #212123;
                text-align: left;
                button {
                    border: none;
                    /*color: #212123;*/
                    background: transparent;
                    font-size: 18px;
                }
                .el-button--text{
                    color:#212123;
                }
                .el-button:focus, .el-button:hover {
                    color: #409EFF;
                }
            }
            .rewards-teacher-table-list {
                margin: 50px 0 160px;
                &.el-table, &.el-table__expanded-cell {
                    background: transparent;
                }
                &.el-table th, &.el-table tr {
                    background-color: transparent;
                }
                .has-gutter {
                    background-color: #fafbfd;
                    color: #5b7084;
                    font-size: 18px;
                }
                .el-table__body-wrapper {
                    color: #5b7084;
                    font-size: 14px;
                }
                .el-checkbox__inner {
                    width: 16px;
                    height: 16px;
                    border-radius: 5px;
                    &:after {
                        left: 5px;
                        top: 2px;
                    }
                }
            }
        }

        .local-btn-success {
            background-color: @bgsuccess;
            border-color: @bgsuccess;
            /*padding: 7px 20px*/
        }
    }
</style>
