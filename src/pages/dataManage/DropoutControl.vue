<template lang="html">
    <div class="dropout-control b-radius6">
        <el-main class="dropout-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="dropout-button-title"  style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData" class="text-button">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog @click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <!--搜索组件-->
            <dz-search-data :searchData="searchData" @clickSearch="searchList"
                            @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                <div slot="search">
                    <el-input placeholder="请输入学生姓名" v-model="searchData.studentName" clearable></el-input>
                    <el-input placeholder="请输入学号" v-model="searchData.studentId" clearable></el-input>

                    <el-select v-model="searchData.isBackSchool" placeholder="是否复学">
                        <el-option
                            v-for="item in backOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <el-table v-loading="loadingShow" :data="dropoutList" class="dropout-table-list">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column align="center" prop="studentName" label="学生名称"></el-table-column>
                <el-table-column align="center" prop="reason" label="辍学原因"></el-table-column>
                <el-table-column align="center" prop="time" label="辍学时间"></el-table-column>
                <el-table-column align="center" prop="isBackSchool" label="是否复学" width="100"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini"
                                   @click="viewSingleDropoutInfo(scope.$index, scope.row)"
                                   class="local-btn-success">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属学校</p>
                    <p class="dz-dialog-val fn-left">{{editData.schoolName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生姓名</p>
                    <p class="dz-dialog-val fn-left">{{editData.studentName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">学生学号</p>
                    <p class="dz-dialog-val fn-left">{{editData.studentNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">辍学时间</p>
                    <p class="dz-dialog-val fn-left">{{editData.time}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">辍学原因</p>
                    <p class="dz-dialog-val fn-left">{{editData.reason}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">跟进情况</p>
                    <p class="dz-dialog-val fn-left">{{editData.state}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">是否复学</p>
                    <p class="dz-dialog-val fn-left">{{editData.isBackSchool}}</p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * 控辍保学页面.
     * @author dz-liujingyan-20180502
     */
    import DzFooter from '@/components/DzFooter'
    import DzPager from '@/components/DzPager'
    import DzSearchData from '@/components/DzSearchData'
    import DzSelectDialog from '@/components/DzSelectDialog'
    import DzDialog from '@/components/DzDialog'

    const backOptions = [
        {
            value: 1,
            label: '是'
        },
        {
            value: 0,
            label: '否'
        }
    ]

    export default {
        name: 'DropoutControl',
        components: {DzFooter, DzSearchData, DzSelectDialog, DzPager, DzDialog},
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 学生姓名
                    studentName: '',
                    // 学生id
                    studentId: '',
                    isBackSchool: '',
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
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                dialogShow: false,
                isBackSchool: '',
                schoolId: [],
                // 表格数据
                dropoutList: [
                    {
                        'studentId': '120324231',
                        'schoolName': '酉州中学',
                        'studentName': '张明',
                        'reason': '外出打工', // 辍学原因
                        'time': '1500000000', // 辍学时间
                        'isBackSchool': 1,
                        'state': '已做家长工作'// 跟进情况
                    }
                ],
                backOptions: backOptions,
                editData: []
            }
        },
        created: function () {
            this.getDataList()
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
             * 获取课程列表
             *
             * @param {Object} opts 入参
             * @param {Number|String} opts.pageSize 每页size
             * @param {Number|String} opts.currentPage   当前页
             * @param {String} opts.studentName      学生名
             * @param {String} opts.studentId      学生id
             *
             */
            // getDataList: function (opts) {
            //     let searchOpts = {
            //         currentPage: this.currentPage,
            //         pageSize: this.pageSize,
            //         studentName: this.studentName,
            //         studentId: this.studentId
            //     }
            //
            //     // console.log(this.currentPage)
            //     this.loadingDataFlg = true
            //     // this.schoolList = []
            //     let _this = this
            //     this.API.dropoutListBySearch(searchOpts, (result) => {
            //         // console.log(result)
            //         _this.loadingDataFlg = false
            //         let dataObj = result.data.content
            //         _this.dropoutList = dataObj.list
            //         _this.total = dataObj.pager.total
            //         _this.currentPage = dataObj.pager.currentPage
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
            getDataList () {
                this.loadingShow = true
                this.API.dropoutListBySearch(this.searchData, (res) => {
                    this.dropoutList = res.data.content.list
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
                    this.getDataList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.studentName = ''
                this.searchData.studentId = ''
                this.searchData.isBackSchool = ''
                this.getDataList()
            },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getDataList()
            },
            /**
             * 翻页.
             */
            doHandlePaging: function (val) {
                this.currentPage = val
                this.getDataList()
                // console.log('执行翻页:' + val)
            },
            /**
             * 查看 单个数据.
             */
            viewSingleDropoutInfo (index, row) {
                this.editData = this.dropoutList[index]
                // console.log(this.editData)
                this.dialogShow = true
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
                this.schoolId = data
                // console.log(data)
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
    .dropout-control {
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        padding: 52px 10%;
        .dropout-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .dropout-button-title {
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
            .dropout-table-list {
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
