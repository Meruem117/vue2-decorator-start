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
        required: true
    })
    code!: string

    @Prop({
        default: () => [],
        required: false
    })
    data!: Chart.PieDataItem[]

    get chartId() {
        return 'chart-pie-' + this.code
    }

    get config() {
        return {

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
        let option = this.getOption(this.data)
        this.chart.setOption(option, true)
        this.handleResize()
    }

    getOption(data: Chart.PieDataItem[]) {
        let colorList = ['#518dff', '#00e2f0', '#08d066', '#ffd200', '#ffa800', '#ff6271', '#ffb271', '#ffc271']
        let dataOuter: any[] = [], dataInner: any[] = [], total = 0
        data.forEach((item, index) => {
            total += item.value || 0
            dataOuter.push({
                name: item.name,
                value: item.value || 0,
                rate: item.rate || '',
                itemStyle: {
                    color: colorList[index % colorList.length],
                }
            })
            dataInner.push({
                name: item.name,
                value: item.value,
                rate: item.rate,
                itemStyle: {
                    color: colorList[index % colorList.length],
                    opacity: .3
                }
            })
        })
        let option = {
            grid: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            series: [
                {
                    type: 'pie',
                    radius: ['52%', '68%'],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: dataOuter,
                },
            ]
        }
        return option
    }
}
</script>
