<template>
    <div class="student-info-manage b-radius6">
        <el-main class="student-list-wrapper">
            <el-row  class="student-button-title"  style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData" class="text-button">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog @click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <div class="student-info-search">
                <dz-search-data :searchData="searchData" @clickSearch="searchList"
                                @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                    <div slot="search">
                        <el-input v-model="searchData.name" placeholder="输入学生姓名"></el-input>
                        <el-input v-model="searchData.schoolNumber" placeholder="输入学号"></el-input>
                        <el-select v-model="searchData.gradeId" placeholder="请选择年级">
                            <el-option v-for="item in gradeList" :key="item.id" :label="item.label"
                                       :value="item.id"></el-option>
                        </el-select>
                    </div>
                </dz-search-data>
            </div>
            <el-table class="student-table-list"
                      :data="tableData"
                      v-loading="loadingShow"
                      @selection-change="handleSelectionChange">
                <el-table-column  align="center" type="selection" width="100px"></el-table-column>
                <el-table-column  align="center" prop="studentNumber" label="学号"></el-table-column>
                <el-table-column  align="center" prop="schoolName" label="所属学校名称"></el-table-column>
                <el-table-column  align="center" prop="name" label="学生名称"></el-table-column>
                <el-table-column  align="center" prop="gradeName" label="所在年级"></el-table-column>
                <el-table-column  align="center" prop="parent.name" label="家长姓名"></el-table-column>
                <el-table-column  align="center" prop="parent.phone" label="家长电话"></el-table-column>
                <el-table-column  align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="viewInfo(scope.$index, scope.row)" size="mini" class="local-btn-success">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>

        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-content">
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学号</p>
                        <p class="dz-dialog-val fn-left">{{editData.schoolNumber}}</p>
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
                        <p class="dz-dialog-val fn-left">{{editData.enrolmentYear}}</p>
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
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">宗教信仰</p>
                        <p class="dz-dialog-val fn-left">{{editData.religion}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">血型</p>
                        <p class="dz-dialog-val fn-left">{{editData.bloodType}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">照片</p>
                        <p class="dz-dialog-val fn-left">{{editData.price}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">身份证有效期</p>
                        <p class="dz-dialog-val fn-left">{{editData.idCardValidityPeriod}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">独生子女标志</p>
                        <p class="dz-dialog-val fn-left">{{editData.oneChild}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">入学年月</p>
                        <p class="dz-dialog-val fn-left">{{editData.enrolmentYear}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">年级</p>
                        <p class="dz-dialog-val fn-left">{{editData.gradeName}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">班号</p>
                        <p class="dz-dialog-val fn-left">{{editData.classNumber}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学生类别</p>
                        <p class="dz-dialog-val fn-left">{{editData.classStudent}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">现住址</p>
                        <p class="dz-dialog-val fn-left">{{editData.currentAddress}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">户口所在地</p>
                        <p class="dz-dialog-val fn-left">{{editData.accountLocation}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">户口性质</p>
                        <p class="dz-dialog-val fn-left">{{editData.natureOfResidence}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">是否流动人口</p>
                        <p class="dz-dialog-val fn-left">{{editData.floatingPopulation}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">特长</p>
                        <p class="dz-dialog-val fn-left">{{editData.specialty}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">通讯地址</p>
                        <p class="dz-dialog-val fn-left">{{editData.contactAddress}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">邮政编码</p>
                        <p class="dz-dialog-val fn-left">{{editData.postalCode}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">电子邮箱</p>
                        <p class="dz-dialog-val fn-left">{{editData.email}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">主页地址</p>
                        <p class="dz-dialog-val fn-left">{{editData.homepage}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学籍号</p>
                        <p class="dz-dialog-val fn-left">{{editData.schoolRollNumber}}</p>
                    </div>
                </div>
                <div class="dz-dialog-btn">
                    <el-button type="primary" @click="openParentDialog">查看家庭成员</el-button>
                </div>
            </div>
        </dz-dialog>
        <dz-dialog :dialog-show.sync="parentShow" :modal="true" v-if="editData.parent" class="parent-dialog">
            <div slot="dialog">
                <div class="dz-dialog-content">
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">关系码</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.relationship}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">成员姓名</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.name}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">出生年月</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.birthday}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">民族码</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.ethnic}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">国籍/地区</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.countryOfCitizenship}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">健康状况</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.healthStatus}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">成员工作单位</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.employer}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">从业码</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.occupation}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">专业技术职务</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.technicalPosition}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">职务级别</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.jobLevel}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">电话</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.mobile}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">电子信箱</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.email}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">是否监护人</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.guardian}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">性别</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.sex}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">学历</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.education}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">联系地址</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.contactAddress}}</p>
                    </div>
                    <div class="dz-dialog-line fn-clear">
                        <p class="dz-dialog-key fn-left">手机号码</p>
                        <p class="dz-dialog-val fn-left">{{editData.parent.phone}}</p>
                    </div>
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
        name: 'studentInfo',
        data () {
            return {
                searchData: {
                    name: '',
                    schoolNumber: '',
                    gradeId: '',
                    schoolId: [],
                    currentPage: 1,
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
                editData: {},
                parentShow: false
            }
        },
        created () {
            this.getListData()
            // this.getSchoolList()
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
                this.API.putStudentInfoList(this.searchData, (res) => {
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
                this.editData = this.tableData[index]
                this.dialogShow = true
            },
            // 查看家庭成员
            openParentDialog () {
                this.parentShow = true
            },
            // 点击搜索事件
            searchList () {
                if (this.searchData.name === '' && this.searchData.schoolNumber === '' && this.searchData.gradeId === '') {
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
                this.searchData.schoolNumber = ''
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
    .student-info-manage {
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
            /*padding: 7px 10px*/
        }
        .parent-dialog {
            .el-dialog__wrapper {
                .el-dialog {
                    box-shadow: none;
                }
            }
        }
    }
</style>
