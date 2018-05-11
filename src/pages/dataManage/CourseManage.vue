<template lang="html">
    <div class="course-manage b-radius6">
        <el-main class="course-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="course-button-title" style="margin: 0;" :gutter="20">
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
                    <el-input v-model="searchData.courseName" placeholder="输入课程名称"></el-input>
                </div>
            </dz-search-data>
            <!--课程数据列表-->
            <el-table v-loading="loadingShow" :data="pageCourseList" style=""
                      class="course-table-list">
                <el-table-column align="center" type="selection" width="50"></el-table-column>
                <el-table-column align="center" prop="courseId" label="课程编号" width="120"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column align="center" prop="courseName" label="课程名称" width="150"></el-table-column>
                <el-table-column align="center" prop="courseLevel" label="课程等级" width="100"></el-table-column>
                <el-table-column align="center" prop="courseDescription" label="课程简介"></el-table-column>
                <el-table-column align="center" prop="totalPeriod" label="总学时"  width="120"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini"
                                   @click="viewSingleCourseInfo(scope.$index, scope.row)"
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
                <div class="course-dialog">
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">所属学校</p>
                        <p class="dz-dialog-val fn-left">{{editData.schoolName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程号</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseId}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程名称</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程别名</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseAlias}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程等级码</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseLevel}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程简介</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseDescription}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程要求</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseRequire}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">总学时</p>
                        <p class="dz-dialog-val fn-left">{{editData.totalPeriod}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">周学时</p>
                        <p class="dz-dialog-val fn-left">{{editData.weekPeriod}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">自学学时</p>
                        <p class="dz-dialog-val fn-left">{{editData.selfStudyPeriod}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">授课方式码</p>
                        <p class="dz-dialog-val fn-left">{{editData.teachingMethods}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">教材编码</p>
                        <p class="dz-dialog-val fn-left">{{editData.textbookCoding}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">参考书目</p>
                        <p class="dz-dialog-val fn-left">{{editData.referenceBook}}</p>
                    </div>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '课程管理'页面.
     * @author dz-Drbeo-20180427
     */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import DzSelectDialog from '@/components/DzSelectDialog'
    // import dz from '@/functions/common'

    export default {
        components: {DzSearchData, DzPager, DzFooter, DzDialog, DzSelectDialog},
        name: 'CourseManage',
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
                // 学校数据列表
                courseList: [],
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
            // 初始化获取课程数据列表
            this.getCourseList()
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
                if (this.searchData.studentName === '' && this.searchData.studentId === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getCourseList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.schoolName = ''
                this.searchData.courseName = ''
                this.getCourseList()
            },
            /**
             * 获取课程列表
             */
            getCourseList () {
                this.loadingShow = true
                this.API.getCourseListBySearch(this.searchData, (res) => {
                    this.courseList = res.data.content.list
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
             * 查看 单个课程数据.
             */
            viewSingleCourseInfo (index, row) {
                this.editData = this.courseList[index]
                // console.log(this.editData)
                this.dialogShow = true
            },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getCourseList()
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
             * 课程列表.
             */
            pageCourseList: function () {
                return this.courseList
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .course-manage {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .course-list-wrapper {
            /*width: 100%;*/
            box-sizing: border-box;
            padding: 0;
            .course-button-title {
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
            .course-table-list {
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
        .dz-dialog-wrapper {
            .el-dialog__headerbtn .el-dialog__close {
                font-size: 30px;
                color: #4595ff;
            }
            .el-dialog__body {
                padding: 30px 48px;
                .course-dialog {
                    .dz-dialog-line {
                        border-bottom: 1px solid #f6f7f9;
                        height: auto;
                        display:flex;/*Flex布局*/
                        display: -webkit-flex; /* Safari */
                        align-items:center;/*指定垂直居中*/
                        p {
                            width: 50%;
                            box-sizing: border-box;
                            line-height: 1;
                            text-align: center;
                            padding-top: 14px;
                            padding-bottom: 6px;
                            margin: auto 0;
                        }
                        .dz-dialog-key {
                            border-right: 0;
                        }
                        .dz-dialog-val {
                            border-left: 1px solid #f6f7f9;
                        }
                    }
                }
                .dz-dialog-btn {
                    margin-top: 20px;
                    text-align: center;
                }
            }
        }
    }

</style>
