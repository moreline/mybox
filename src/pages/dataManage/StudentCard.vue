<template lang="html">
    <div class="student-card b-radius6">
        <el-main class="student-list-wrapper">
            <el-row class="student-button-title"  style="margin: 0;" :gutter="20">
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
                    <el-input v-model="searchData.studentName" placeholder="输入学生姓名"></el-input>
                    <el-input v-model="searchData.studentId" placeholder="输入学号"></el-input>
                </div>
            </dz-search-data>
            <!--学生数据列表-->
            <el-table v-loading="loadingShow" :data="pageStudentList"
                      style="width: 100%"
                      class="student-table-list">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" prop="studentId" label="学号"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称" ></el-table-column>
                <el-table-column align="center" prop="studentName" label="学生姓名"></el-table-column>
                <el-table-column align="center" prop="currentStudentStatus" label="当前学生状态" width="110"></el-table-column>
                <el-table-column align="center" prop="yearOfEntry" label="入学年月"></el-table-column>
                <el-table-column align="center" prop="schoolSystem" label="学制" width="110"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini"
                                   @click="viewSingleStudentInfo(scope.$index, scope.row)"
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
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属学校</p>
                    <p class="dz-dialog-val fn-left">{{editData.schoolName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生姓名</p>
                    <p class="dz-dialog-val fn-left">{{editData.studentId}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生学号</p>
                    <p class="dz-dialog-val fn-left">{{editData.studentId}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">入学年月</p>
                    <p class="dz-dialog-val fn-left">{{editData.yearOfEntry}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生类别码</p>
                    <p class="dz-dialog-val fn-left">{{editData.studentCategoryCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学制</p>
                    <p class="dz-dialog-val fn-left">{{editData.schoolSystem}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">专业码</p>
                    <p class="dz-dialog-val fn-left">{{editData.professionalCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所在班号</p>
                    <p class="dz-dialog-val fn-left">{{editData.classNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所在年级</p>
                    <p class="dz-dialog-val fn-left">{{editData.gradeNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生当前状态码</p>
                    <p class="dz-dialog-val fn-left">{{editData.currentStudentStatus}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动类别码</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionCategoryCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动日期</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionDate}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动原因码</p>
                    <p class="dz-dialog-val fn-left">{{editData.transaction}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">审批日期</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionReasonCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">审批文号</p>
                    <p class="dz-dialog-val fn-left">{{editData.approvalNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动来源学校码</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionSourceSchoolCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动去向学校码</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionGoingSchoolCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">异动说明</p>
                    <p class="dz-dialog-val fn-left">{{editData.transactionDescription}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">原院系所号</p>
                    <p class="dz-dialog-val fn-left">{{editData.originalDepartmentNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">原专业码</p>
                    <p class="dz-dialog-val fn-left">{{editData.originalProfessionalCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">原班号</p>
                    <p class="dz-dialog-val fn-left">{{editData.originalClassNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">原年级</p>
                    <p class="dz-dialog-val fn-left">{{editData.originalGradeNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">原学制</p>
                    <p class="dz-dialog-val fn-left">{{editData.originalSchoolSystem}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">现院系所号</p>
                    <p class="dz-dialog-val fn-left">{{editData.nowDepartmentNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">现专业码</p>
                    <p class="dz-dialog-val fn-left">{{editData.nowProfessionalCode}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">现班号</p>
                    <p class="dz-dialog-val fn-left">{{editData.nowClassNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">现年级</p>
                    <p class="dz-dialog-val fn-left">{{editData.nowGradeNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">现学制</p>
                    <p class="dz-dialog-val fn-left">{{editData.nowSchoolSystem}}</p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '学生数据'页面.
     *
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
        name: 'StudentCard',
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
                // 学生数据列表
                studentList: [],
                // 分页数据
                pager: {
                    // 总数据条数
                    total: 0,
                    // 当前页
                    currentPage: 1,
                    // 每页数据size
                    pageSize: 20
                },
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                // 模态框显示状态
                dialogShow: false,
                editData: {},
                teacherCheckData: [],
                schoolCheckShow: false
            }
        },
        created: function () {
            // 初始化获取学生数据列表
            this.getStudentList()
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
             * 获取学生列表
             *
             */
            // 请求列表接口数据
            getStudentList () {
                this.loadingShow = true
                this.API.getStudentListBySearch(this.searchData, (res) => {
                    this.studentList = res.data.content.list
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
             * 查看 单个学生数据.
             */
            viewSingleStudentInfo (index, row) {
                this.editData = this.studentList[index]
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
                    this.getStudentList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.studentName = ''
                this.searchData.studentId = ''
                this.getStudentList()
            },
            /**
             *  翻页
             */
            changeCurrentPage (val) {
                this.searchData.currentPage = val
                this.getStudentList()
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
             * 学生列表.
             */
            pageStudentList: function () {
                return this.studentList
            },
            /**
             * 加载状态.
             */
            pageLoadingFlg: function () {
                return this.loadingDataFlg
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .student-card {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .student-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .student-button-title {
                /*padding-bottom: 10px;*/
                border-bottom: 1px solid #ededed;
                color: #212123;
                text-align: left;
                button {
                    border: none;
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
            .student-table-list {
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
