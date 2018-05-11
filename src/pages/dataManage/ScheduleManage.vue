<template lang="html">
    <div class="schedule-manage b-radius6">
        <el-main class="schedule-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="schedule-button-title" style="margin: 0;" :gutter="20">
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
                    <el-input v-model="searchData.schoolName" placeholder="输入学校名称"></el-input>
                    <el-input v-model="searchData.semester" placeholder="输入学期"></el-input>
                </div>
            </dz-search-data>
            <!--课表数据列表-->
            <el-table v-loading="loadingShow" :data="pageScheduleList" style=""
                      class="schedule-table-list">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" prop="classNumber" label="班级编号"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="所属学校名称"></el-table-column>
                <el-table-column align="center" prop="semester" label="学期"></el-table-column>
                <el-table-column align="center" prop="gradeAndClass" label="年级班级"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini"
                                   @click="viewSingleScheduleInfo(scope.$index, scope.row)"
                                   class="local-btn-success">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页器-->
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <!--查看-->
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <!--<el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/schedule-manage' }">课表管理</el-breadcrumb-item>
                    <el-breadcrumb-item>查看</el-breadcrumb-item>
                </el-breadcrumb>-->
                    <h3 class="time-table-title">{{editData.semester}} {{editData.gradeAndClass}} 课程表</h3>
                    <el-table :data="editData.schoolTimetable" class="time-table" border>
                        <el-table-column align="center" type="index" label="星期" :index="indexMethod"></el-table-column>
                        <el-table-column align="center" prop="mon" label="星期一"></el-table-column>
                        <el-table-column align="center" prop="tue" label="星期二"></el-table-column>
                        <el-table-column align="center" prop="wed" label="星期三"></el-table-column>
                        <el-table-column align="center" prop="thu" label="星期四"></el-table-column>
                        <el-table-column align="center" prop="fri" label="星期五"></el-table-column>
                        <!--<el-table-column align="center" prop="sat" label="星期六"></el-table-column>-->
                        <!--<el-table-column align="center" prop="sun" label="星期日"></el-table-column>-->
                    </el-table>
                <!--<div class="dz-dialog-line fn-clear">-->
                    <!--<p class="dz-dialog-key fn-left">学生姓名</p>-->
                    <!--<p class="dz-dialog-val fn-left">{{editData.studentId}}</p>-->
                <!--</div>-->
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '课表管理'页面.
     * @author dz-Drbeo-20180427
     */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import DzSelectDialog from '@/components/DzSelectDialog'
    // import dz from '@/functions/common'

    export default {
        components: {DzSearchData, DzPager, DzHeader, DzFooter, DzDialog, DzSelectDialog},
        name: 'ScheduleManage',
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 学生姓名
                    studentName: '',
                    // 学生id
                    studentId: '',
                    currentPage: 1,
                    pageSize: 20
                },
                // 分页数据
                pager: {
                    // 总数据条数
                    total: 0,
                    // 当前页
                    currentPage: 1,
                    // 每页数据size
                    pageSize: 20
                },
                // 课表数据列表
                scheduleList: [],
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                // 模态框显示状态
                dialogShow: false,
                editData: {},
                teacherCheckData: [],
                schoolCheckShow: false,
                schoolId: []
            }
        },
        created: function () {
            // 初始化获取课表数据列表
            this.getScheduleList()
        },
        methods: {
            indexMethod (index) {
                return index + 1
            },
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
             * 获取课表列表
             */
            getScheduleList () {
                this.loadingShow = true
                this.API.getScheduleListBySearch(this.searchData, (res) => {
                    this.scheduleList = res.data.content.list
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
            /**
             * 查看 单个课表数据.
             */
            viewSingleScheduleInfo (index, row) {
                this.editData = this.scheduleList[index]
                // console.log(this.editData)
                this.dialogShow = true
            },
            /**
             * 搜索组件.
             */
            searchList () {
                if (this.searchData.studentName === '' && this.searchData.studentId === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getScheduleList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.schoolName = ''
                this.searchData.semester = ''
                this.getScheduleList()
            },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getScheduleList()
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
                this.schoolId = data
            }
        },
        computed: {
            /**
             * 课表列表.
             */
            pageScheduleList: function () {
                return this.scheduleList
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .schedule-manage {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .schedule-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .schedule-button-title {
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
            .schedule-table-list {
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
        .time-table-title {
            width: 100%;
            margin-bottom: 20px;
            font-size: 16px;
            color: #409EFF;
            text-align: center;
        }
        .time-table .cell, .time-table td:first-child .cell, .time-table th:first-child .cell {
            padding: 0;
        }
        .time-table td, .time-table th {
            padding: 6px 0;
        }
        /*#time-table {*/
            /*.el-table__body {*/
                /*el-table__row {*/
                    /*.cell {*/
                        /*padding: 0;*/
                    /*}*/
                /*}*/
            /*}*/
        /*}*/
    }

</style>
