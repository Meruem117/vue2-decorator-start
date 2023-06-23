<template>
    <div class="container" :style="computedStyle">
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
        default: '160px',
        required: false
    })
    height!: string

    @Prop({
        default: () => [],
        required: false
    })
    data!: Chart.BarDataItem[]

    @Prop({
        default: () => [],
        required: false
    })
    cate!: string[]

    @Prop({
        default: false,
        required: false
    })
    showLegend!: boolean

    @Prop({
        default: 25,
        required: false
    })
    legendGap!: number

    @Prop({
        default: 0,
        required: false
    })
    legendTop!: number

    @Prop({
        default: 10,
        required: false
    })
    legendRight!: number


    @Prop({
        default: '',
        required: false
    })
    unit!: string

    get chartId() {
        return 'chart-bar-' + this.code
    }

    get config() {
        return {
            show: this.showLegend,
            legendGap: this.legendGap,
            legendTop: this.legendTop,
            legendRight: this.legendRight,
            unit: this.unit,
        }
    }

    get computedStyle() {
        return {
            height: this.height
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
        let option = this.getOption(this.data, this.cate, this.config)
        this.chart.setOption(option, true)
        this.handleResize()
    }

    getOption(data: Chart.BarDataItem[], cate: string[], config: typeof this.config) {
        let series: any[] = []
        let typeArr: string[] = []
        data.forEach(item => {
            typeArr.push(item.type)
            series.push({
                type: 'bar',
                name: item.type,
                data: item.value,
                barWidth: item.barWidth || 10,
                barGap: item.barGap || .5,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: item.startColor },
                            { offset: 0, color: item.endColor, }
                        ]),
                        opacity: 1,
                    }
                },
            })
        })
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: config.show ? '20%' : '5%',
                left: '0',
                right: '0',
                bottom: '0',
                containLabel: true
            },
            legend: {
                show: config.show,
                data: typeArr,
                align: 'left',
                top: config.legendTop,
                right: config.legendRight,
                textStyle: {
                    color: "#9c9da1"
                },
                itemWidth: 13,
                itemHeight: 13,
                itemGap: config.legendGap
            },
            xAxis: [{
                type: 'category',
                data: cate,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#dce1e7',
                        width: 1,
                        type: ''
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#999a9d',
                        fontSize: 11
                    }
                },
            }],
            yAxis: [{
                name: config.unit,
                nameTextStyle: {
                    color: '#999999',
                    padding: [0, -10, 0, 0],
                },
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#9c9da1',
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#dce1e7',
                        width: 1,
                        type: ''
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: '#dce1e7',
                        type: ''
                    }
                }
            }],
            series: series,
        }
        return option
    }
}
</script>
