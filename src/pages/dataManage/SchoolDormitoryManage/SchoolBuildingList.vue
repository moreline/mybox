<template lang="html">
    <div class="school-dormitory-management b-radius6">
        <el-main class="building-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="building-button-title" style="margin: 0;" :gutter="20">
                <el-col :span="3">
                    <el-button type="text" @click="doExportData">导出数据</el-button>
                </el-col>
                <el-col :span="3">
                    <dz-select-dialog v-on:click-sure="handleSchoolId"></dz-select-dialog>
                </el-col>
            </el-row>
            <!--搜索组件-->
            <dz-search-data :searchData="searchData" @clickSearch="searchList"
                            @clickReset="resetList" style="margin: 30px auto 0; line-height: 50px;">
                <div slot="search">
                    <el-input v-model="searchData.buildingName" placeholder="输入建筑名"></el-input>
                    <el-input v-model="searchData.buildingId" placeholder="输入建筑号"></el-input>
                    <el-select v-model="searchData.buildingType" placeholder="请选择建筑物分类" clearable>
                        <el-option
                            v-for="item in pageBuildingTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <!--建筑数据列表-->
            <el-table v-loading="loadingShow" :data="pageBuildingList" style=""
                      class="building-table-list">
                <!--<el-table-column align="center" type="selection" width="50"></el-table-column>-->
                <el-table-column align="center" label="建筑物图片" class-name="building-img">
                    <template slot-scope="scope">
                        <img :src="scope.row.buildingImg[0] || ''" height="60"/>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="schoolName" label="学校名称"></el-table-column>
                <el-table-column align="center" prop="buildingId" label="建筑物号"></el-table-column>
                <el-table-column align="center" prop="buildingName" label="建筑物名称"></el-table-column>
                <el-table-column align="center" prop="region" label="所在地区"></el-table-column>
                <el-table-column align="center" prop="buildingUse" label="建筑物用途"></el-table-column>
                <el-table-column align="center" label="房间">
                    <template slot-scope="scope">
                        <router-link :to="'/school-room-list/' + scope.row.buildingId">
                            <el-button type="primary">查看房间</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="操作" width="160">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="doEditSingleBuilding(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="success" size="mini" @click="viewSingleBuildingInfo(scope.$index, scope.row)" class="local-btn-success">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页器-->
            <dz-pager :pager="pager" @changeCurrentPage="changeCurrentPage"></dz-pager>
        </el-main>

        <!--修改-->
        <dz-dialog :dialog-show.sync="dialogEditShow">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属学校</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.buildingName"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">课程描述</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.buildingId"></el-input>
                    </p>
                </div>
                <el-button type="primary" class="building-edit">确认修改</el-button>
            </div>
        </dz-dialog>
        <!--查看-->
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属校区</p>
                    <p class="dz-dialog-val fn-left">{{editData.region}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物编号</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingId}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物名称</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物层数</p>
                    <p class="dz-dialog-val fn-left">{{editData.floor}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建成年月</p>
                    <p class="dz-dialog-val fn-left">{{editData.year}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物总面积</p>
                    <p class="dz-dialog-val fn-left">{{editData.acreage}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物地址</p>
                    <p class="dz-dialog-val fn-left">{{editData.addr}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑物用途</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingUse}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间统计</p>
                    <p class="dz-dialog-val fn-left">{{editData.roomNum}}间</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">备注信息</p>
                    <p class="dz-dialog-val fn-left">{{editData.remark}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">图片</p>
                    <p class="dz-dialog-img fn-left">
                        <span v-for="(buildingImg, index) in editData.buildingImg" :key="index">
                            <img :src="buildingImg" height="100" style="padding: 10px 0 10px 15px; text-align: left"/>
                        </span>
                    </p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '校舍管理建筑物数据'页面.
     * @author dz-Drbeo-20180427
     */
    import DzSearchData from '@/components/DzSearchData'
    import DzPager from '@/components/DzPager'
    import DzHeader from '@/components/DzHeader/DzHeader'
    import DzFooter from '@/components/DzFooter'
    import DzDialog from '@/components/DzDialog'
    import DzSelectDialog from '@/components/DzSelectDialog'
    import dz from '@/functions/common'
    // 固定不变的数据--用常量
    const ALL_BUILDING_TYPES = [
        {label: '全部', value: '1'},
        {label: '音乐', value: '2'},
        {label: '微机', value: '3'},
        {label: '汇报厅', value: '4'}
    ]

    export default {
        components: {DzSearchData, DzPager, DzHeader, DzFooter, DzDialog, DzSelectDialog},
        name: 'SchoolDormitoryManage',
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 建筑物号
                    buildingId: '',
                    // 建筑物名称
                    buildingName: '',
                    // 建筑物类型
                    buildingType: '',
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
                buildingList: [],
                // 加载数据标记,true: 显示, false: 隐藏.
                loadingShow: true,
                // 模态框显示状态
                dialogShow: false,
                dialogEditShow: false,
                editData: {},
                schoolCheckShow: false,
                schoolId: []
            }
        },
        created: function () {
            // 初始化获取建筑数据列表
            this.getBuildingList()
            // this.doHandlePaging(1)
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
             * 获取建筑列表
             *
             */
            getBuildingList () {
                this.loadingShow = true
                this.API.getBuildingListBySearch(this.searchData, (res) => {
                    this.buildingList = res.data.content.list
                    dz.foreach(this.buildingList, (key, val) => {
                        val.buildingImg = JSON.parse(val.buildingImg)
                    })
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
             * 查看房间
             */
            doView: function (row) {
                // console.log(row.buildingId)
            },
            /**
             * 搜索组件.
             */
            searchList () {
                if (this.searchData.buildingName === '' && this.searchData.buildingId === '' && this.searchData.buildingType === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getBuildingList()
                }
            },
            /**
             * 重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.buildingName = ''
                this.searchData.buildingId = ''
                this.searchData.buildingType = ''
            },
            /**
             * 编辑 单个建筑数据.
             */
            doEditSingleBuilding (index, row) {
                this.editData = this.buildingList[index]
                // console.log(this.editData)
                this.dialogEditShow = true
            },
            /**
             * 查看 单个建筑数据.
             */
            viewSingleBuildingInfo: function (index, row) {
                this.editData = this.buildingList[index]
                // console.log(this.editData)
                this.dialogShow = true
            },
            /**
             * 翻页.
             */
            changeCurrentPage: function (val) {
                this.searchData.currentPage = val
                this.getBuildingList()
                // console.log('执行翻页:' + val)
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
             * 建筑物分类.
             */
            pageBuildingTypes: function () {
                return ALL_BUILDING_TYPES
            },
            /**
             * 建筑数据列表.
             */
            pageBuildingList: function () {
                return this.buildingList
            }
        }
    }
</script>

<style lang="less">
    @bgcolor: #fafbfd;
    @bgsuccess: #1acb66;
    .school-dormitory-management {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .building-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .building-button-title {
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
            .building-table-list {
                margin: 50px 0 160px;
                .building-img {
                    height: 60px;
                }
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
            .el-dialog {
                margin-top: 8vh!important;
            }
            .el-dialog__body {
                .dz-dialog-line {
                    border-bottom: 1px solid #f6f7f9;
                    height: auto;
                    display:flex;/*Flex布局*/
                    display: -webkit-flex; /* Safari */
                    align-items:center;/*指定垂直居中*/
                    .dz-dialog-edit {
                        padding: 0 !important;
                    }

                    .dz-dialog-key {
                        width: 45%;
                        box-sizing: border-box;
                        line-height: 1;
                        text-align: center;
                        padding-top: 18px;
                        padding-bottom: 10px;
                        margin: auto 0;
                        border-right: 0;
                    }
                    .dz-dialog-val {
                        width: 55%;
                        box-sizing: border-box;
                        line-height: 1;
                        text-align: center;
                        padding-top: 18px;
                        padding-bottom: 10px;
                        margin: auto 0;
                        border-left: 1px solid #f6f7f9;
                    }
                    .dz-dialog-img {
                        padding: 20px 0;
                        text-align: left;
                        width: 55%;
                        border-left: 1px solid #f6f7f9;
                    }
                }
                .building-edit {
                    margin-top: 30px;
                    text-align: center;
                    margin-left: 44%;
                }
                .dz-dialog-btn {
                    margin-top: 20px;
                    text-align: center;
                }
            }
        }
    }
</style>
