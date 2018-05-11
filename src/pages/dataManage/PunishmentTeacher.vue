<template lang="html">
    <div class="punishment-teacher">
        <el-main class="punishment-teacher-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="punishment-teacher-button-title" style="margin: 0;" :gutter="20">
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
                    <el-input v-model="searchData.punishmentName" placeholder="输入惩处人姓名" clearable></el-input>
                    <el-select v-model="searchData.PunishmenLevel" placeholder="请选择惩处等级" clearable>
                        <el-option
                            v-for="item in pagePunishmentLevel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <el-table v-loading="pageLoadingFlg" :data="pagePunishmentTeacherList" style=""
                      class="punishment-teacher-table-list">
                <el-table-column align="center" type="selection" width="50"></el-table-column>
                <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
                <el-table-column align="center" prop="punishmentName" label="姓名" width="110"></el-table-column>
                <el-table-column align="center" prop="idCard" label="身份证号码"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="所属学校"></el-table-column>
                <el-table-column align="center" prop="punishmentRealName" label="惩处名称" width="110"></el-table-column>
                <el-table-column align="center" prop="punishmentWhy" label="惩处原因" width="110"></el-table-column>
                <el-table-column align="center" prop="punishmentUnit" label="惩处单位" width="110"></el-table-column>
                <el-table-column align="center" prop="punishmentTime" label="惩处日期" width="110"></el-table-column>
                <el-table-column align="center" prop="punishmentTime" label="惩处撤销" width="110"></el-table-column>
                <el-table-column align="center" label="操作" width="110">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="toView(scope.row)"
                                   class="local-btn-success">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <dz-pager :pager="pager" @changeCurrentPage="handlePaging"></dz-pager>
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
                        <p class="dz-dialog-key fn-left">惩处名称</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentRealName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">几率处分</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentRealName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处原因</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentWhy}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处内容</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentContent}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处单位</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentUnit}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处文号</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentWhyTitanic}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处日期</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentTime}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处撤销日期</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentUndo}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处撤销文号</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentUndoTitanic}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">惩处撤销原因</p>
                        <p class="dz-dialog-val fn-left">{{seeDetail.punishmentWhyTitanic}}</p>
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
        name: 'RewardsTeacher',
        components: {
            'dz-header': DzHeader,
            'DzPager': DzPager,
            'DzDialog': DzDialog,
            'DzSelectDialog': DzSelectDialog,
            DzSearchData
        },
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 学校名称
                    schoolName: '',
                    // 获奖人姓名
                    punishmentName: '',
                    // 奖罚等级
                    PunishmenLevel: '',
                    currentPage: 1,
                    pageSize: 20
                },
                // 学校数据列表
                punishmentTeacherList: [],
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingDataFlg: false,
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
                seeDetail: {},
                school: [],
                schoolId: []
            }
        },
        created: function () {
            this.getPunishmentTeacherList()
        },
        computed: {
            /**
             * 学校数据列表.
             */
            pagePunishmentTeacherList: function () {
                return this.punishmentTeacherList
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
            pagePunishmentLevel: function () {
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
            /**
             * 搜索组件.
             */
            searchList () {
                if (this.searchData.schoolName === '' && this.searchData.punishmentName === '' && this.searchData.PunishmenLevel === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getPunishmentTeacherList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.schoolName = ''
                this.searchData.punishmentName = ''
                this.searchData.PunishmenLevel = ''
                this.getPunishmentTeacherList()
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
             * @param {String} opts.punishmentName     获奖人姓名
             * @param {String} opts.schoolName      获奖人学校名
             * @param {String} opts.rewardLevel     获奖等级
             *
             */
            getPunishmentTeacherList: function (opts) {
                let searchOpts = {
                    currentPage: this.pager.currentPage,
                    pageSize: this.pager.pageSize,
                    punishmentName: this.punishmentName,
                    schoolName: this.schoolName,
                    punishmentLevel: this.punishmentLevel
                }
                this.loadingDataFlg = true
                this.API.getPunishmentTeacherListBySearch(searchOpts, (result) => {
                    this.loadingDataFlg = false
                    let dataObj = result.data.content
                    this.punishmentTeacherList = dataObj.list
                    this.pager = dataObj.pager
                    // this.pager.currentPage = dataObj.pager.currentPage
                    // console.log(this.punishmentTeacherList, dataObj, this.pager)
                }, (errorObj) => {
                    this.$message({
                        showClose: true,
                        message: errorObj.message,
                        type: 'error',
                        duration: 1500
                    })
                    this.loadingDataFlg = false
                })
            },
            getRewardsLevelList: function () {
                this.loadingDataFlg = true
                this.API.getRewardsLevel({}, (result) => {
                    this.loadingDataFlg = false
                    this.pagePunishmentLevel = result.data.data
                    console.log(result.data)
                }, (errorObj) => {
                    this.$message({
                        showClose: true,
                        message: errorObj.message,
                        type: 'error',
                        duration: 1500
                    })
                    this.loadingDataFlg = false
                })
            },
            /**
             * 翻页.
             */
            handlePaging: function (val) {
                // this.pageNo = val
                // console.log(val)
                this.getPunishmentTeacherList()
                // console.log('执行翻页:' + val)
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
                this.schoolId = data
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .punishment-teacher {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .punishment-teacher-list-wrapper {
            /*width: 100%;*/
            box-sizing: border-box;
            padding: 0;
            .punishment-teacher-button-title {
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
            .punishment-teacher-table-list {
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
