<template>
    <div class="container">
        <div class="chart" :id="chartId"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import * as echarts from 'echarts'

type colorConfig = {
    color: string,
    bgColor: string,
    topColor: string,
}

@Component
export default class ChartLine extends Vue {
    @Prop({
        default: '',
        required: false
    })
    code!: string

    @Prop({
        default: 0,
        required: false
    })
    value!: number | string

    @Prop({
        default: '0%',
        required: false
    })
    rate!: string

    @Prop({
        default: '',
        required: false
    })
    text!: string

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

    get colorConfig() {
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
        let value = this.rate ? (parseInt(this.rate.replace('%', '')) * 100 / 10000) : 0
        let option = this.getLiquidOption(value, this.title, this.colorConfig)
        this.chart.setOption(option, true)
    }

    getLiquidOption(value: number, title: string, colorConfig: colorConfig) {
        let data = [value, value, value]
        let dataArr: any[] = []
        let { color, bgColor, topColor } = colorConfig
        for (var i = 0; i < 8; i++) {
            if (i % 2 === 0) {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 50,
                    itemStyle: {
                        normal: {
                            color: color,
                        },
                    },
                })
            } else {
                dataArr.push({
                    name: (i + 1).toString(),
                    value: 20,
                    itemStyle: {
                        normal: {
                            color: bgColor,
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
                        color: bgColor,
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 4,
                            borderColor: 'rgba(' + topColor + ', .4)',
                            shadowBlur: 2,
                            shadowColor: bgColor,
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
                                { offset: 1, color: color },
                                { offset: 0.5, color: 'rgba(' + topColor + ', .6)' },
                                { offset: 0, color: 'rgba(' + topColor + ', .3)' },
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
                    color: bgColor,
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
