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
        let option = this.getOption()
        this.chart.setOption(option, true)
        this.handleResize()
    }

    getOption() {
        let option = {
        }
        return option
    }
}
</script>
