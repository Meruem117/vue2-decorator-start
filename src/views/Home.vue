<template>
    <div class="page">
        <div class="chart">
            <ChartLine code="line" :data="lineData" showLegend ref="chartLine" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import ChartLine from '@/components/ChartLine.vue'

@Component({
    components: {
        ChartLine
    },
})

export default class HomeView extends Vue {
    lineData: Chart.LineDataItem[] = [
        { type: '', name: ['周一', '周二', '周三'], value: [100, 300, 200], color: '#fdc865', colorRgb: '252, 201, 103' }
    ]

    @Ref('chartLine') readonly chartLine!: ChartLine

    private mounted() {
        this.chartLine!.init()
    }
}
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    min-height: 100vh;
    text-align: center;
    background-color: #e7e9fa;

    .chart {
        width: 100%;
        height: 160px;
    }
}
</style>
