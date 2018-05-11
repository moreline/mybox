<template>
    <div class="grade-manage b-radius6">
        <el-main class="grade-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="grade-button-title" style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog @click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <div class="grade-info-search">
                <!--<transition name="el-zoom-in-top">
                    <div class="school-check-wrapper" v-show="schoolCheckShow">
                        <div class="school-wrapper">
                            <el-row>
                                <el-col :span="22">
                                    <el-checkbox-group v-model="schoolList">
                                        <el-row>
                                            <el-col :span="6" v-for="item in schoolListData"
                                                    :key="item.id"
                                                    class="check-item">
                                                <el-checkbox :label="item.name" :key="item.id">
                                                    {{item.name}}
                                                </el-checkbox>
                                            </el-col>
                                        </el-row>
                                    </el-checkbox-group>
                                </el-col>
                                <el-col :span="2" class="item-btn">
                                    <el-button size="small" type="primary" @click="changeSchoolId">确定
                                    </el-button>
                                </el-col>
                            </el-row>
                            <div class="school-icon"></div>
                        </div>
                    </div>
                </transition>-->
                <dz-search-data :searchData="searchData" @clickSearch="searchList"
                                @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                    <div slot="search">
                        <el-input v-model="searchData.term" placeholder="请输入学期"></el-input>
                        <el-input v-model="searchData.exam" placeholder="请输入考试"></el-input>
                        <el-select v-model="searchData.gradeId" placeholder="请选择年级">
                            <el-option v-for="item in gradeList" :key="item.id" :label="item.label"
                                       :value="item.id"></el-option>
                        </el-select>
                        <el-input v-model="searchData.name" placeholder="输入学生姓名"></el-input>
                    </div>
                </dz-search-data>
            </div>
            <el-table class="grade-table-list"
                      :data="tableData"
                      v-loading="loadingShow"
                      @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" width="100px"></el-table-column>
                <el-table-column align="center" prop="schoolNumber" label="学号"></el-table-column>
                <el-table-column align="center" prop="name" label="学生名称"></el-table-column>
                <el-table-column align="center" prop="language" label="语文"></el-table-column>
                <el-table-column align="center" prop="mathematics" label="数学"></el-table-column>
                <el-table-column align="center" prop="english" label="英语"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="viewInfo(scope.$index, scope.row)" size="mini" class="local-btn-success">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <!--查看-->
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="grade-dialog-btn">
                    <el-button v-for="(item, index) in courseData"
                               :key="index"
                               size="small"
                               @click="changeCourse(item.course,index)"
                               :class="index==courseIndex?'active':''"
                    >{{item.course}}
                    </el-button>
                </div>
                <div class="dz-dialog-content">
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学年</p>
                        <p class="dz-dialog-val fn-left">{{editData.schoolYear}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学期</p>
                        <p class="dz-dialog-val fn-left">{{editData.term}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">考试日期</p>
                        <p class="dz-dialog-val fn-left">{{editData.testDate}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程号</p>
                        <p class="dz-dialog-val fn-left">{{editData.course}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">考试方式</p>
                        <p class="dz-dialog-val fn-left">{{editData.examinations}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">考试性质</p>
                        <p class="dz-dialog-val fn-left">{{editData.examinationNature}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">考试形式</p>
                        <p class="dz-dialog-val fn-left">{{editData.examFormat}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">分数类考试成绩</p>
                        <p class="dz-dialog-val fn-left">{{editData.scoreTestResults}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">等级类考试成绩</p>
                        <p class="dz-dialog-val fn-left">{{editData.gradeTestResults}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程成绩</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseResults}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">课程等级成绩</p>
                        <p class="dz-dialog-val fn-left">{{editData.courseGradeResults}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">任课教师工号</p>
                        <p class="dz-dialog-val fn-left">{{editData.teacherJobNumber}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">成绩录入人号</p>
                        <p class="dz-dialog-val fn-left">{{editData.gradeEntryNumber}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">成绩录入日期</p>
                        <p class="dz-dialog-val fn-left">{{editData.gradeEntryDate}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">成绩录入时间</p>
                        <p class="dz-dialog-val fn-left">{{editData.gradeEntryTime}}</p>
                    </div>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * '成绩管理'页面.
     * @author dz-tangpeng-20180427
     */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import DzSelectDialog from '@/components/DzSelectDialog'
    import dz from '@/functions/common'

    export default {
        components: {DzSearchData, DzPager, DzHeader, DzFooter, DzDialog, DzSelectDialog},
        name: 'studentInfo',
        data () {
            return {
                searchData: {
                    name: '',
                    term: '',
                    exam: '',
                    gradeId: '',
                    schoolId: [],
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
                gradeList: [
                    {
                        id: 1,
                        label: '一年级'
                    },
                    {
                        id: 2,
                        label: '二年级'
                    },
                    {
                        id: 3,
                        label: '三年级'
                    }
                ],
                schoolList: [],
                tableData: [],
                teacherCheckData: [],
                schoolCheckShow: false,
                schoolListData: [],
                loadingShow: true,
                dialogShow: false,
                courseData: [],
                courseIndex: 0,
                editData: {},
                schoolId: []
            }
        },
        created () {
            this.getListData()
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
            // 请求列表接口数据
            getListData () {
                this.loadingShow = true
                this.API.putGradeManageList(this.searchData, (res) => {
                    this.tableData = res.data.content.list
                    this.pager = res.data.content.pager
                    this.loadingShow = false
                }, (rsp) => {
                    this.$message({
                        showClose: true,
                        message: rsp.message,
                        type: 'error',
                        duration: 1500
                    })
                    this.loadingShow = false
                })
            },
            // // 请求学校数据接口数据
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
            // 查看
            viewInfo (index, row) {
                this.courseData = this.tableData[index].subject
                this.editData = this.tableData[index].subject[this.courseIndex]
                // console.log(this.editData)
                this.dialogShow = true
            },
            // 点击搜索事件
            searchList () {
                if (this.searchData.name === '' && this.searchData.term === '' && this.searchData.exam === '' && this.searchData.gradeId === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getListData()
                }
            },
            // 点击重置事件
            resetList () {
                this.searchData.name = ''
                this.searchData.term = ''
                this.searchData.exam = ''
                this.searchData.gradeId = ''
                this.getListData()
            },
            // 修改分页器
            changeCurrentPage (val) {
                this.searchData.currentPage = val
                this.getListData()
            },
            /**
             * 获取选择的学校ID DzSelectDialog子组件传递
             * @param  Array data 学校ID数组
             */
            handleSchoolId (data) {
                this.schoolId = data
            },
            // 选择学校ID
            changeSchoolId () {
                let id = []
                dz.foreach(this.schoolList, (key, val) => {
                    dz.foreach(this.schoolListData, (j, item) => {
                        if (item.name === val) {
                            id.push(item.id)
                        }
                    })
                })
                this.searchData.schoolId = id
                this.getListData()
                this.schoolCheckShow = false
            },
            // 修改科目
            changeCourse (course, index) {
                this.courseIndex = index
                dz.foreach(this.courseData, (key, val) => {
                    if (val.course === course) {
                        this.editData = val
                    }
                })
            },
            handleSelectionChange (val) {
                this.teacherCheckData = val
            },
            /* 选择学校按钮切换显示隐藏 */
            checkSchool () {
                this.schoolCheckShow = !this.schoolCheckShow
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .grade-manage {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .grade-list-wrapper {
            /*width: 100%;*/
            box-sizing: border-box;
            padding: 0;
            .grade-button-title {
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
            .grade-table-list {
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
        .grade-dialog-btn {
            .el-button {
                border: 1px solid #72a8f1;
                &.active {
                    background-color: #72a8f1;
                    color: #fff;
                }
            }
            .el-button + .el-button {
                margin-left: 0;
            }
        }
    }
</style>
