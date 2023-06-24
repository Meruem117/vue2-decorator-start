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
        default: 0,
        required: true
    })
    value!: number | string

    @Prop({
        default: 'number',
        required: true
    })
    type!: string

    @Prop({
        default: '',
        required: false
    })
    title!: string

    @Prop({
        default: '#ffa300',
        required: false
    })
    color!: string

    @Prop({
        default: '#fbecd0',
        required: false
    })
    bgColor!: string

    @Prop({
        default: '255, 206, 27',
        required: false
    })
    topColor!: string

    get chartId() {
        return 'chart-liquid-' + this.code
    }

    get config() {
        return {
            color: this.color,
            bgColor: this.bgColor,
            topColor: this.topColor,
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
        let value = this.value ? (parseInt(this.value.toString().replace('%', '')) * 100 / 10000) : 0
        let option = this.getOption(value, this.title, this.config)
        this.chart.setOption(option, true)
        this.handleResize()
    }

    getOption(value: number, title: string, config: typeof this.config) {
        let data = [value, value, value]
        let dataArr: any[] = []
        for (var i = 0; i < 8; i++) {
            if (i % 2 === 0) {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 50,
                    itemStyle: {
                        normal: {
                            color: config.color,
                        },
                    },
                })
            } else {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 20,
                    itemStyle: {
                        normal: {
                            color: config.bgColor,
                        },
                    },
                })
            }
        }
        let option = {
            title: {
                text: value * 10000 / 100 + '%',
                textStyle: {
                    color: '#fff',
                    fontSize: 21,
                    fontWeight: 'normal',
                    fontFamily: 'Impact',
                    textShadowBlur: 2,
                    textShadowColor: 'rgba(0,0,0,.2)'
                },
                x: 'center',
                y: '35%',
            },
            graphic: [
                {
                    type: 'group',
                    left: 'center',
                    top: '60%',
                    children: [
                        {
                            type: 'text',
                            z: 100,
                            left: '10',
                            top: 'middle',
                            style: {
                                text: title,
                                fill: '#fff',
                                font: '14px Microsoft YaHei',
                            },
                        },
                    ],
                },
            ],
            series: [
                {
                    type: 'liquidFill',
                    radius: '75%',
                    center: ['50%', '50%'],
                    data: data,
                    period: 1000,
                    backgroundStyle: {
                        color: config.bgColor,
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 4,
                            borderColor: 'rgba(' + config.topColor + ', .4)',
                            shadowBlur: 2,
                            shadowColor: config.bgColor,
                        },
                    },
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 1, color: config.color },
                                { offset: 0.5, color: 'rgba(' + config.topColor + ', .6)' },
                                { offset: 0, color: 'rgba(' + config.topColor + ', .3)' },
                            ],
                            globalCoord: false,
                        },
                    ],
                    label: {
                        normal: {
                            formatter: '',
                        },
                    },
                },
                {
                    type: 'pie',
                    zlevel: 0,
                    silent: true,
                    center: ['50%', '50%'],
                    radius: ['85%', '90%'],
                    hoverAnimation: false,
                    color: config.bgColor,
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [1],
                },
                {
                    type: 'pie',
                    zlevel: 10,
                    silent: true,
                    center: ['50%', '50%'],
                    radius: ['85%', '90%'],
                    startAngle: 50,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: dataArr,
                },
            ],
        }
        return option
    }
}
</script>
