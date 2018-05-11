<template>
    <div class="physical-health b-radius6">
        <el-main class="physical-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="physical-button-title" :gutter="20" style="margin: 0;">
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
            <el-table v-loading="loadingShow" :data="pagePhysicalList" style="" class="physical-table-list">
                <el-table-column align="center" prop="studentNumber" label="学号"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column align="center" prop="studentName" label="学生姓名"></el-table-column>
                <el-table-column align="center" prop="medicalHistory" label="病史"></el-table-column>
                <el-table-column align="center" prop="conclusion" label="体检结论"></el-table-column>
                <el-table-column align="center" prop="physicalDate" label="体检日期"></el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini"
                                   @click="viewSingleStudentInfo(scope.$index, scope.row)"
                                   class="local-btn-success">
                            查看
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
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content fn-left physical-title" style="font-size: 1rem;font-weight: bold">总体结论</div>
                    </el-col>
                </el-row>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属学校</p>
                    <p class="dz-dialog-val fn-left">{{viewData.schoolName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生姓名</p>
                    <p class="dz-dialog-val fn-left">{{viewData.studentName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生学号</p>
                    <p class="dz-dialog-val fn-left">{{viewData.studentNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">病史</p>
                    <p class="dz-dialog-val fn-left">{{viewData.medicalHistory}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">体检结论</p>
                    <p class="dz-dialog-val fn-left">{{viewData.conclusion}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">主检医生</p>
                    <p class="dz-dialog-val fn-left">{{viewData.doctor}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">体检完成日期</p>
                    <p class="dz-dialog-val fn-left">{{viewData.physicalDate}}</p>
                </div>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content fn-left physical-title" style="font-size: 1rem;font-weight: bold;margin-top: 1rem;">
                            各项目查看
                        </div>
                    </el-col>
                </el-row>
                <el-table max-height="600"
                          :data="viewData.physicalObject" style="" class="student-list-tb">
                    <el-table-column prop="physicalName"
                                     label="体检项目名称"
                                     width="150"></el-table-column>
                    <el-table-column prop="doctorIdea"
                                     label="医生意见"
                                     width="150"></el-table-column>
                    <el-table-column prop="doctor"
                                     label="医生姓名"
                                     width="250"></el-table-column>
                    <el-table-column prop="physicalDate"
                                     label="体检日期"
                                     width="180"></el-table-column>
                </el-table>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '体质健康'页面.
     * @author dz-李晓英-20180428
     */
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzSelectDialog from '@/components/DzSelectDialog'
    // import dz from '@/functions/common'

    export default {
        name: 'PhysicalHealth',
        components: {DzHeader, DzFooter, DzSearchData, DzPager, DzDialog, DzSelectDialog},
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
                physicalList: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                dialogShow: false,
                editData: {},
                viewData: {},
                schoolId: []
            }
        },
        created: function () {
            this.physicalAllList()
        },
        methods: {
            /**
             * 左边树形菜单选中的数据
             * @param {Object} data 入参
             */
            handleNodeClick (data) {
                // console.log(data)
                return data
            },
            /**
             * 导出数据
             */
            doExportData () {
                console.log('导出学生身体健康数据')
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
                    this.physicalAllList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                // console.log('按钮: 重置.')
                this.searchData.studentName = ''
                this.searchData.studentId = ''
                this.physicalAllList()
            },
            /**
             * 获取学生身体健康列表
             */
            physicalAllList () {
                this.loadingShow = true
                this.API.physicalAllListBySearch(this.searchData, (res) => {
                    this.physicalList = res.data.content.list
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
            // /**
            //  * 请求学校数据接口数据
            //  *
            //  */
            // getSchoolList () {
            //     this.API.getSchoolList((res) => {
            //         this.schoolListData = res.data.content.list
            //     }, (rsp) => {
            //         this.$message({
            //             showClose: true,
            //             message: rsp.message,
            //             type: 'error',
            //             duration: 1500
            //         })
            //     })
            // },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.physicalAllList()
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
                this.schoolId = data
            },
            /**
             * 翻页.pagePhysicalList
             * @param {Number|String} val   当前页码
             */
            changePages: function (val) {
                // console.log('执行翻页:' + val)
                this.currentPage = val
                this.physicalAllList()
            },
            /**
             * 查看 单个学生数据.
             */
            viewSingleStudentInfo: function (index, row) {
                // console.log(val)
                this.viewData = this.pagePhysicalList[index]
                // console.log(this.viewData)
                this.dialogShow = true
            }
        },
        computed: {
            /**
             * 学生列表.
             */
            pagePhysicalList: function () {
                return this.physicalList
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
    .physical-health {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .physical-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .physical-button-title {
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
            .physical-table-list {
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
        .physical-title {
            color: #409EFF;
        }
        .local-btn-success {
            background-color: @bgsuccess;
            border-color: @bgsuccess;
            /*padding: 7px 20px*/
        }
    }

</style>
