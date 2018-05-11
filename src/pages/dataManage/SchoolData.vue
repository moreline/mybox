<template lang="html">
    <div class="school-data">
        <el-main class="school-data-list-wrapper">
            <!--导入导出数据-->
            <el-row class="school-data-button-title" style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doAddNewSchool">新增学校</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="text" @click="doImportData">导入数据</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="text" @click="doExportData">导出数据</el-button>
                </el-col>
            </el-row>
            <!--搜索组件-->
            <dz-search-data :searchData="searchData" @clickSearch="searchList"
                            @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                <div slot="search">
                    <el-input v-model="searchData.schoolName" placeholder="请输入学校名称"></el-input>
                    <el-input v-model="searchData.masterName" placeholder="请输入校长名"></el-input>
                    <el-select v-model="searchData.schoolType" placeholder="请选择办学类型" clearable>
                        <el-option
                            v-for="item in pageSchoolTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="searchData.schoolHost" placeholder="请选择学校办别" clearable>
                        <el-option
                            v-for="item in pageHostTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <el-table v-loading="loadingShow" :data="pageSchoolList" style=""
                      class="school-data-table-list">
                <el-table-column align="center" type="selection" width="50"></el-table-column>
                <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
                <el-table-column align="center" prop="name" label="学校名称"></el-table-column>
                <el-table-column align="center" prop="headMasterName" label="校长名称" width="150"></el-table-column>
                <el-table-column align="center" prop="addr" label="地址" ></el-table-column>
                <el-table-column align="center" prop="schoolType" label="办学类型"  width="150"></el-table-column>
                <el-table-column align="center" prop="tel" label="联系电话" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="160" type=index>
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="doEditSingleSchool(scope.row)">编辑</el-button> -->
                        <el-button type="success" size="mini" @click="viewSingleSchool(scope.$index)"
                                   class="local-btn-success">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页器-->
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>
        <dz-dialog :dialog-show.sync="dialogSchDetail" :use-footer="'true'">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear" v-for="(schItem, idx) in pageSingleSchDetail" :key="idx">
                    <p class="dz-dialog-key fn-left">{{schItem.key}}</p>
                    <p class="dz-dialog-val fn-left">{{schItem.val}}</p>
                </div>
            </div>
            <div slot="dz-dialog-footer">
                        <span slot="footer" class="dz-dialog-foot"
                              style="display: block; text-align: center; margin: 0 auto;">
                            <!-- <el-button type="primary" @click="dialogInnerClass = true">查看班级</el-button> -->
                            <el-button type="primary" @click="dialogSchDetail = false">确定</el-button>
                        </span>
            </div>
        </dz-dialog>

        <dz-dialog :dialog-show.sync="dialogInnerClass">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear" v-for="(schItem, idx) in pageClassDetail" :key="idx">
                    <p class="dz-dialog-key fn-left">{{schItem.key}}</p>
                    <p class="dz-dialog-val fn-left">{{schItem.val}}</p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '学校数据'页面.
     * @author dz-gonglong-20180427
     */
    import DzHeader from '@/components/DzTempHeader/DzHeader'
    import DzSearchData from '@/components/DzSearchData'
    import DzDialog from '@/components/DzDialog'
    import DzPager from '@/components/DzPager'

    // 固定不变的数据--用常量
    const ALL_SCHOOL_TYPES = [
        {label: '全部', value: '1'},
        {label: '小学', value: '2'},
        {label: '初中', value: '3'},
        {label: '高中', value: '4'}
    ]
    const ALL_HOST_TYPES = [
        {label: '普通中小学/职业中学', value: '1'},
        {label: '民办', value: '2'},
        {label: '民办公助', value: '3'},
        {label: '公办', value: '4'}
    ]

    // const KEY_LBL_bak = {
    //     ID: '学校ID',
    //     SCHOOLNAME: '学校名称',
    //     MASTERNAME: '校长姓名',
    //     ADDR: '学校地址',
    //     SCHOOLTYPETXT: '学校办别',
    //     TEL: '联系电话'
    // }
    const SCH_KEY_LBL = {
        ID: '学校id',
        CODE: '学校代码',
        NAME: '学校名称',
        HIGHERSCHOOL: '上级学校',
        NAMEINEN: '学校英文名称',

        ADDR: '学校地址',
        POSTCODE: '学校邮政编码',
        REGIONCODE: '学校区划码',
        BORNDATE: '建校年月',
        CELEBRATEDATE: '校庆日',

        SCHOOLTYPE: '学校办学类型',
        AUTHORITY: '学校主管部门',
        CORPORATENO: '法定代表人号',
        CORPORATELICENSE: '法人证书号',
        HEADMASTERNO: '校长工号',

        HEADMASTERNAME: '校长姓名',
        PARTYLEADERNO: '党委负责人号',
        ORGANIZATIONCODE: '组织机构代码',
        TEL: '联系电话',
        FAX: '传真电话',

        EMAIL: '电子信箱',
        HOMEPAGE: '主页地址',
        HISTORY: '历史沿革',
        SCHOOLHOST: '学校办别',
        HIGHERAUTHORITY: '所属主管单位',

        CITYTYPE: '所在地城乡类型',
        ECONOMYTYPE: '所在地经济属性',
        MINZUTYPE: '所在地名族属性',
        PRIMARYSCHCOURSE: '小学学制',
        PRIMARYSCHAGE: '小学入学年龄',

        JUNIORMIDSCHCOURSE: '初中学制',
        JUNIORMIDSCHAGE: '初中入学年龄',
        SENIORMIDSCHCOURSE: '高中学制',
        FIRSTLANGUAGE: '主教学语言',
        SECONDLANGUAGE: '辅教学语言',

        STUDENTAREA: '招生半径',
        NOTE: '备注'
    }

    // 查看班级.
    const CLASS_KEY_LBL = {
        NO: '班号',
        NAME: '班级',
        CLASSTEACHERNO: '班主任工号',
        MONITORNO: '班长学号',
        HONOUR: '班级荣誉称号',

        SCHCOURSE: '学制',
        TYPE: '班级类型',
        ARTSANDSCIENCE: '文理类型',
        GRADUATEDATE: '毕业日期',
        MINZUFLG: '是否少数民族双语教学班',

        BILINGUAL: '双语教学模式'
    }
    export default {
        name: 'SchoolData',
        components: {
            'dz-header': DzHeader,
            'dz-dialog': DzDialog,
            DzSearchData,
            DzPager
        },
        data () {
            return {
                searchData: {
                    // 校长名称
                    masterName: '',
                    // 学校名称
                    schoolName: '',
                    // 办学类型
                    schoolType: '',
                    // 学校办别
                    schoolHost: '',
                    // 每页数据size
                    pageSize: 20,
                    // 当前页
                    currentPage: 1
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
                schoolList: [],
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                // loadingDataFlg: true,
                // 点击查看 某个学校的详情.
                detailSchIdx: -1,
                // 对话框标记--学校信息, true: 显示, false: 隐藏.
                dialogSchDetail: false,
                // 对话框标记--查看班级, true: 显示, false: 隐藏.
                dialogInnerClass: false
            }
        },
        created: function () {
            // this.doHandlePaging(1)
            this.getSchoolList()
        },
        methods: {
            /**
             * 新增学校.
             */
            doAddNewSchool: function () {
                console.log('新增学校。')
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
             * 搜索组件.
             */
            searchList () {
                if (this.searchData.masterName === '' && this.searchData.schoolName === '' && this.searchData.schoolType === '' && this.searchData.schoolHost === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getSchoolList()
                }
            },
            /**
             * 点击重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.masterName = ''
                this.searchData.schoolName = ''
                this.searchData.schoolType = ''
                this.searchData.schoolHost = ''
                this.getSchoolList()
            },
            /**
             * 获取学校列表
             *
             * @param {Object} opts 入参
             * @param {Number|String} opts.pageSize 每页size
             * @param {Number|String} opts.pageNo   当前页
             * @param {String} opts.schoolName      学校名
             * @param {String} opts.masterName      校长名
             * @param {String} opts.schoolType      办学类型
             * @param {String} opts.schoolHost      学校办别
             *
             */
            // getSchoolList: function (opts) {
            //     let searchOpts = {
            //         pageNo: this.pageNo,
            //         pageSize: this.pageSize,
            //         schoolHost: this.schoolHost,
            //         schoolType: this.schoolType,
            //         schoolName: this.schoolName,
            //         masterName: this.masterName
            //     }
            //     this.loadingDataFlg = true
            //     // this.schoolList = []
            //     this.API.getSchoolListBySearch(
            //         searchOpts,
            //         result => {
            //             // console.log('getSchoolList--数据:' + JSON.stringify(result.data))
            //             this.loadingDataFlg = false
            //             let dataObj = result.data.content
            //             this.schoolList = dataObj.list
            //             this.total = dataObj.pager.count
            //             this.pageNo = dataObj.pager.currentPage
            //         },
            //         errorObj => {
            //             this.$message({
            //                 showClose: true,
            //                 message: errorObj.message,
            //                 type: 'error',
            //                 duration: 1500
            //             })
            //             this.loadingDataFlg = false
            //         }
            //     )
            // },
            /**
             * 获取学校列表
             */
            getSchoolList () {
                this.loadingShow = true
                this.API.getSchoolListBySearch(this.searchData, (res) => {
                    this.schoolList = res.data.content.list
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
            //  * 查看 单个学校数据.
            //  */
            // viewSingleSchoolInfo (index, row) {
            //     this.editData = this.schoolList[index]
            //     console.log(this.editData)
            //     this.dialogShow = true
            // },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getSchoolList()
            },
            /**
             * 编辑 单个学校数据.
             */
            doEditSingleSchool: function (val) {
                // console.log('编辑:' + JSON.stringify(val))
            },
            /**
             * 查看 单个学校数据.
             */
            viewSingleSchool: function (val) {
                // console.log('查看:' + JSON.stringify(val))
                this.detailSchIdx = val
                this.dialogSchDetail = true
            },
            /**
             * 关闭 学校详情 对话框
             * */
            closeSchDetailDailog: function () {
                this.detailSchIdx = 0
                this.dialogSchDetail = false
            }
        },
        computed: {
            /**
             * 学校类型.
             */
            pageSchoolTypes: function () {
                return ALL_SCHOOL_TYPES
            },
            /**
             * 学校办别.
             */
            pageHostTypes: function () {
                return ALL_HOST_TYPES
            },
            /**
             * 学校数据列表.
             */
            pageSchoolList: function () {
                return this.schoolList
            },
            /**
             * 加载状态.
             */
            pageLoadingFlg: function () {
                return this.loadingDataFlg
            },
            /**
             * 返回当前查看的 单个学校详情.
             */
            pageSingleSchDetail: function () {
                let tmpData = []
                let tmpObj = null
                if (this.detailSchIdx !== -1) {
                    tmpObj = this.schoolList[this.detailSchIdx]
                    let key = ''
                    for (key in tmpObj) {
                        // console.log('pageSingleSchDetail--key:' +  key)
                        // console.log('pageSingleSchDetail--val:' +  tmpObj[key])
                        if (key.toUpperCase() !== 'CLASSINFO') {
                            if (SCH_KEY_LBL[key.toUpperCase()] !== undefined) {
                                tmpData.push({
                                    key: SCH_KEY_LBL[key.toUpperCase()],
                                    val: tmpObj[key]
                                })
                            }
                        }
                    }
                }
                return tmpData
            },
            /**
             * 返回 班级详情.
             */
            pageClassDetail: function () {
                let tempDetail = []
                let tmpObj = null
                if (this.detailSchIdx !== -1) {
                    tmpObj = this.schoolList[this.detailSchIdx]['classInfo']
                    let key = ''
                    for (key in tmpObj) {
                        tempDetail.push({
                            key: CLASS_KEY_LBL[key.toUpperCase()],
                            val: tmpObj[key]
                        })
                    }
                }
                return tempDetail
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .school-data {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .school-data-list-wrapper {
            /*width: 100%;*/
            box-sizing: border-box;
            padding: 0;
            .school-data-button-title {
                padding-bottom: 10px;
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
            .school-data-table-list {
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
