<template>
    <div class="container">
        <div class="chart" :id="chartId"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import * as echarts from 'echarts'

@Component
export default class ChartLine extends Vue {
    @Prop({
        default: '',
        required: false
    })
    code!: string

    @Prop({
        default: () => [],
        required: false
    })
    data!: Chart.LineDataItem[]

    @Prop({
        default: false,
        required: false
    })
    showLegend!: boolean

    get chartId() {
        return 'chart-line-' + this.code
    }

    get legendConfig() {
        return {
            show: this.showLegend
        }
    }

    chart: any = null

    init() {
        this.$nextTick(() => {
            this.drawChart()
        })
    }

    handleResize() {
        this.$nextTick(() => {
            if (this.chart) this.chart.resize()
        })
    }

    drawChart() {
        this.chart = echarts.init(document.getElementById(this.chartId)!)
        let option = this.getLineOption(this.data, this.legendConfig)
        this.chart.setOption(option, true)
        this.handleResize()
    }

    getLineOption(list: Chart.LineDataItem[], legendConfig: { show: boolean }) {
        let series: any[] = []
        let typeArr: string[] = [], colorArr: string[] = [], nameArr: string[] = []
        list.forEach(item => {
            typeArr.push(item.type)
            colorArr.push(item.color)
            nameArr = item.name
            series.push({
                name: item.type,
                type: 'line',
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: item.color,
                    },
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: `rgba(${item.colorRgb},0.5)` },
                            { offset: 1, color: `rgba(${item.colorRgb},0)` },
                        ], false),
                    },
                },
                data: item.value
            })
        })
        let option = {
            color: colorArr,
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: legendConfig.show ? '22%' : '12%',
                left: '0',
                right: '5%',
                bottom: '0',
                containLabel: true
            },
            legend: {
                show: legendConfig.show,
                top: '5%',
                right: '4%',
                icon: 'rect',
                itemWidth: 13,
                itemHeight: 13,
                itemGap: 10,
                textStyle: {
                    color: '#9c9da1',
                    fontSize: 12
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: '#9c9da1',
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'dotted',
                            color: '#dce1e7'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dotted',
                            color: '#dce1e7'
                        }
                    },
                    boundaryGap: false,
                    data: nameArr
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    minInterval: 1,
                    nameTextStyle: {
                        color: "#9c9da1",
                        fontSize: 12,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'dotted',
                            color: '#dce1e7'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dotted',
                            color: '#dce1e7'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#9c9da1',
                            fontSize: 12
                        }
                    },
                },
            ],
            series: series
        }
        return option
    }
}
</script>
