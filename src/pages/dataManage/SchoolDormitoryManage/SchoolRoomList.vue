<template lang="html">
    <div class="school-room-list b-radius6">
        <el-main class="room-list-wrapper">
            <!--导出数据，选择学校-->
            <el-row class="room-button-title" style="margin: 0;" :gutter="20">
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
                    <el-input v-model="searchData.roomId" placeholder="输入房间号"></el-input>
                    <el-input v-model="searchData.roomName" placeholder="输入房间名"></el-input>
                    <el-select v-model="searchData.roomType" placeholder="请选择房间分类" clearable>
                        <el-option
                            v-for="item in pageRoomTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </dz-search-data>
            <el-table v-loading="loadingShow" :data="pageRoomList" style=""
                      class="room-table-list">
                <!--<el-table-column align="center" type="selection" width="50"></el-table-column>-->
                <el-table-column align="center" prop="buildingName" label="所属建筑物"></el-table-column>
                <el-table-column align="center" prop="roomId" label="房间编号"></el-table-column>
                <el-table-column align="center" prop="roomName" label="房间名称"></el-table-column>
                <el-table-column align="center" prop="floor" label="所处楼层"></el-table-column>
                <el-table-column align="center" prop="roomUse" label="房间用途"></el-table-column>
                <el-table-column align="center" prop="buildingArea" label="建筑面积"></el-table-column>
                <el-table-column align="center" label="操作"  width="160">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="doEditSingleRoom(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="success" size="mini" @click="viewSingleRoomInfo(scope.$index, scope.row)" class="local-btn-success">查看</el-button>
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
                    <p class="dz-dialog-key fn-left">所属建筑名称</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.buildingName"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属建筑编号</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间编号</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间名称</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间用途</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">教学用房性质</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所处楼层</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑面积</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.buildingArea"></el-input>
                    </p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">备注信息</p>
                    <p class="dz-dialog-val fn-left dz-dialog-edit">
                        <el-input :value="editData.roomId"></el-input>
                    </p>
                </div>
                <el-button type="primary" class="building-edit">确认修改</el-button>
            </div>
        </dz-dialog>
        <!--查看-->
        <dz-dialog :dialog-show.sync="dialogShow">
            <div slot="dialog">
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属建筑名称</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所属建筑编号</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingId}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间编号</p>
                    <p class="dz-dialog-val fn-left">{{editData.roomId}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间名称</p>
                    <p class="dz-dialog-val fn-left">{{editData.roomName}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">房间用途</p>
                    <p class="dz-dialog-val fn-left">{{editData.roomUse}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">教学用房性质</p>
                    <p class="dz-dialog-val fn-left">{{formatterType(editData.buildingType)}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">所处楼层</p>
                    <p class="dz-dialog-val fn-left">{{editData.floor}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">建筑面积</p>
                    <p class="dz-dialog-val fn-left">{{editData.buildingArea}}</p>
                </div>
                <div class="dz-dialog-line fn-clear">
                    <p class="dz-dialog-key fn-left">备注信息</p>
                    <p class="dz-dialog-val fn-left">{{editData.remark}}</p>
                </div>
            </div>
        </dz-dialog>
    </div>
</template>

<script>
    /**
     * '房间列表数据'页面.
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
    const ALL_ROOM_TYPES = [
        {label: '全部', value: '1'},
        {label: '教学及辅助用房', value: '2'},
        {label: '行政办公用房', value: '3'},
        {label: '生活用房', value: '4'}
    ]
    export default {
        components: {DzSearchData, DzPager, DzHeader, DzFooter, DzDialog, DzSelectDialog},
        name: 'SchoolRoomList',
        data () {
            return {
                // 搜索数据
                searchData: {
                    // 房间物号
                    roomId: '',
                    // 房间物名称
                    roomName: '',
                    // 房间物类型
                    roomType: '',
                    buildingId: this.$route.params.id,
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
                roomList: [],
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
            // 初始化获取房间数据列表
            this.getRoomList()
        },
        methods: {
            formatterType (id) {
                var thisType = id + 1
                let typeName = '教学及辅助用房'
                dz.foreach(this.pageRoomTypes, (key, val) => {
                    if (val.value === thisType.toString()) {
                        typeName = val.label
                        return typeName
                    }
                })
                return typeName
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
             *  获取房间列表
             *
             */
            getRoomList () {
                this.loadingShow = true
                this.API.getRoomListBySearch(this.searchData, (res) => {
                    this.roomList = res.data.content.list
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
                if (this.searchData.roomName === '' && this.searchData.roomId === '' && this.searchData.roomType === '') {
                    this.$message({
                        showClose: true,
                        message: '请输入搜索内容',
                        type: 'warning',
                        duration: 2000
                    })
                } else {
                    this.getRoomList()
                }
            },
            /**
             * 重置.
             */
            resetList: function () {
                console.log('按钮: 重置.')
                this.searchData.roomName = ''
                this.searchData.roomId = ''
                this.searchData.roomType = ''
            },
            /**
             * 编辑 单个建筑数据.
             */
            doEditSingleRoom (index, row) {
                this.editData = this.roomList[index]
                // console.log(this.editData)
                this.dialogEditShow = true
            },
            /**
             * 查看 单个建筑数据.
             */
            viewSingleRoomInfo: function (index, row) {
                this.editData = this.roomList[index]
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
             * 房间分类.
             */
            pageRoomTypes: function () {
                return ALL_ROOM_TYPES
            },
            /**
             * 房间数据列表.
             */
            pageRoomList: function () {
                return this.roomList
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
    .school-room-list {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 52px 10%;
        .room-list-wrapper {
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            .room-button-title {
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
            .room-table-list {
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
            }
            .el-dialog__body {
                .dz-dialog-line {
                    .dz-dialog-edit {
                        padding: 0 !important;
                    }
                    .dz-dialog-key {
                        border-right: 1px solid #f6f7f9;
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
