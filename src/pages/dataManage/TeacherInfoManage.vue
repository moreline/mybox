<template>
    <div class="teacher-info-manage b-radius6">
        <el-main class="teacher-list-wrapper">
            <el-row class="teacher-button-title" style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData" class="text-button">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog @click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <div class="teacher-info-search">
                <dz-search-data :searchData="searchData" @clickSearch="searchList"
                                @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                    <div slot="search">
                        <el-input v-model="searchData.name" placeholder="输入教师姓名"></el-input>
                        <el-input v-model="searchData.job" placeholder="输入职务"></el-input>
                        <el-input v-model="searchData.course" placeholder="输入任教科目"></el-input>
                    </div>
                </dz-search-data>
            </div>
            <el-table  v-loading="loadingShow" :data="pageTeacherList" class="teacher-table-list">
                <el-table-column align="center" type="selection" width="100px"></el-table-column>
                <el-table-column align="center" prop="jobNumber" label="工号"></el-table-column>
                <el-table-column align="center" prop="schoolName" label="所属学校名称"></el-table-column>
                <el-table-column align="center" prop="name" label="教师名称"></el-table-column>
                <el-table-column align="center" prop="jobOccupation" label="职位"></el-table-column>
                <el-table-column align="center" prop="courseSection" label="任教科目"></el-table-column>
                <el-table-column align="center" prop="mobile" label="联系电话"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="viewInfo(scope.$index, scope.row)" size="mini" class="local-btn-success">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">工号</p>
                    <p class="dz-dialog-val fn-left">{{editData.jobNumber}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">姓名</p>
                    <p class="dz-dialog-val fn-left">{{editData.name}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">英文姓名</p>
                    <p class="dz-dialog-val fn-left">{{editData.englishName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">姓名拼音</p>
                    <p class="dz-dialog-val fn-left">{{editData.pinyin}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">曾用名</p>
                    <p class="dz-dialog-val fn-left">{{editData.usedName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">性别码</p>
                    <p class="dz-dialog-val fn-left">{{editData.sex}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">出生日期</p>
                    <p class="dz-dialog-val fn-left">{{editData.birthday}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">出生地码</p>
                    <p class="dz-dialog-val fn-left">{{editData.placeOfBirth}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">籍贯</p>
                    <p class="dz-dialog-val fn-left">{{editData.origin}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">民族码</p>
                    <p class="dz-dialog-val fn-left">{{editData.ethnic}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">国籍/地区码</p>
                    <p class="dz-dialog-val fn-left">{{editData.countryOfCitizenship}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">身份证件类型码</p>
                    <p class="dz-dialog-val fn-left">{{editData.typeOfCertificate}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">身份证件号</p>
                    <p class="dz-dialog-val fn-left">{{editData.idCard}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">婚姻状况码</p>
                    <p class="dz-dialog-val fn-left">{{editData.maritalStatus}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">港澳台侨外码</p>
                    <p class="dz-dialog-val fn-left">{{editData.overseasChinese}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">政治面貌码</p>
                    <p class="dz-dialog-val fn-left">{{editData.politicalStatus}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">健康状况码</p>
                    <p class="dz-dialog-val fn-left">{{editData.healthStatus}}</p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * '教职工信息管理'页面.
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
        name: 'teacherInfo',
        data () {
            return {
                searchData: {
                    name: '',
                    job: '',
                    course: '',
                    schoolId: [],
                    currentPage: 1,
                    pageSize: 20
                },
                schoolList: [],
                teacherList: [],
                // 分页数据
                pager: {
                    // 总数据条数
                    total: 0,
                    // 当前页
                    currentPage: 1,
                    // 每页数据size
                    pageSize: 20
                },
                teacherCheckData: [],
                schoolCheckShow: false,
                schoolListData: [],
                loadingShow: true,
                dialogShow: false,
                editData: {}
            }
        },
        created () {
            this.getTeacherList()
            this.getSchoolList()
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
            getTeacherList () {
                this.loadingShow = true
                this.API.putTeacherInfoList(this.searchData, (res) => {
                    this.teacherList = res.data.content.list
                    this.pager = res.data.content.pager
                    this.loadingShow = false
                }, (rsp) => {
                    this.$message({
                        showClose: true,
                        message: rsp.message,
                        type: 'error',
                        duration: 1500
                    })
                    // this.loadingShow = false
                })
            },
            // 请求学校数据接口数据
            getSchoolList () {
                this.API.getSchoolList((res) => {
                    this.schoolListData = res.data.content.list
                }, (rsp) => {
                    this.$message({
                        showClose: true,
                        message: rsp.message,
                        type: 'error',
                        duration: 1500
                    })
                })
            },
            // 查看
            viewInfo (index, row) {
                this.editData = this.teacherList[index]
                // console.log(this.editData)
                this.dialogShow = true
            },
            // 点击搜索事件
            searchList () {
                if (this.searchData.name === '' && this.searchData.job === '' && this.searchData.course === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getTeacherList()
                }
            },
            // 点击重置事件
            resetList () {
                this.searchData.name = ''
                this.searchData.job = ''
                this.searchData.course = ''
                this.getTeacherList()
            },
            // 修改分页器
            changeCurrentPage (val) {
                this.searchData.currentPage = val
                this.getTeacherList()
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
                this.getTeacherList()
                this.schoolCheckShow = false
            },
            handleSelectionChange (val) {
                this.teacherCheckData = val
            },
            /* 选择学校按钮切换显示隐藏 */
            checkSchool () {
                this.schoolCheckShow = !this.schoolCheckShow
            }
        },
        computed: {
            /**
             * 课程列表.
             */
            pageTeacherList: function () {
                return this.teacherList
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .teacher-info-manage {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .teacher-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .teacher-button-title {
                /*padding-bottom: 10px;*/
                border-bottom: 1px solid #ededed;
                color: #212123;
                text-align: left;
                button {
                    color: #212123;
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
            .teacher-table-list {
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
            /*padding: 7px 10px*/
        }
    }
</style>
