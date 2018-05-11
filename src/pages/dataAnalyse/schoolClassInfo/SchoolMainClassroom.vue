<template lang="html">
    <div class="">
            <div class="room-total">
                <div class="b-radius20 b-shadow30 school-shadow">
                    <div class="grid-content content">幼儿园教室（间）</div>
                    <div class="grid-content color1">{{classTotalData[0]}}</div>
                </div>
                <div class="b-radius20 b-shadow30 school-shadow">
                    <div class="grid-content content">小学教室（间）</div>
                    <div class="grid-content color2">{{classTotalData[1]}}</div>
                </div>
                <div class="b-radius20 b-shadow30 school-shadow">
                    <div class="grid-content content">初中教室（间）</div>
                    <div class="grid-content color3">{{classTotalData[2]}}</div>
                </div>
                <div class="b-radius20 b-shadow30 school-shadow">
                    <div class="grid-content content">高中教室（间）</div>
                    <div class="grid-content color4">{{classTotalData[3]}}</div>
                </div>
            </div>
            <div class="room-echart">
                <div class="b-radius20 b-shadow30 echart-box">
                    <div class="grid-content">
                        <p class="room-echarts-title ">本区域下学校构成情况</p>
                        <div id="school-room"
                             style="height:560px;width:100%;min-width:500px;">
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'SchoolMainClassroom',
    data () {
        return {
            classTotalData: [3282, 4848, 5093, 5109, 4500]
        }
    },
    mounted () {
        this.drawBarRoom() // 柱状图方法
    },
    methods: {
        drawBarRoom () {
            let that = this
            setTimeout(function () {
                that.myChartTwo = that.$echarts.init(document.getElementById('school-room'))
                that.myChartTwo.setOption({
                    legend: {data: ['幼儿园', '小学', '初中', '高中']},
                    tooltip: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['2013', '2014', '2015', '2016', '2017', '2018']
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }],
                    series: [{
                        name: '幼儿园',
                        type: 'bar',
                        itemStyle: {
                            normal: {color: '#fe755f'}
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: [5382, 8348, 5933, 5009, 4550, 2210]
                    }, {
                        name: '小学',
                        type: 'bar',
                        itemStyle: {
                            normal: {color: '#845ffe'}
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: [2382, 5848, 1933, 7009, 4800, 5010]
                    }, {
                        name: '初中',
                        type: 'bar',
                        itemStyle: {
                            normal: {color: '#13c0aa'}
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: [5382, 5848, 7033, 4029, 4500, 8210]
                    }, {
                        name: '高中',
                        type: 'bar',
                        itemStyle: {
                            normal: {color: '#fe68b4'}
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: [5282, 4838, 8093, 3209, 1500, 5240]
                    }]
                })
            }, 200)
        }
    }
}
</script>

<style lang="less">
</style>
