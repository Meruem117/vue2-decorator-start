<template>
    <div class="page">
        <div class="inner">
            <ChartLine code="line" :data="lineData" :cate="comCate" ref="chartLine" />
            <ChartBar code="bar" :data="barData" :cate="comCate" :showLegend="true" ref="chartBar" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import ChartLine from '@/components/ChartLine.vue'
import ChartBar from '@/components/ChartBar.vue'

@Component({
    components: {
        ChartLine,
        ChartBar
    },
})

export default class HomeView extends Vue {
    comCate: string[] = ['Mon', 'Tue', 'Wen']
    lineData: Chart.LineDataItem[] = [
        {
            type: '',
            value: [100, 300, 200],
            color: '#6293ff',
            colorRgb: '99, 148, 255'
        }
    ]
    barData: Chart.BarDataItem[] = [
        {
            type: 'Up',
            value: [100, 200, 300],
            startColor: '#2782d7',
            endColor: '#2782d7'
        },
        {
            type: 'Down',
            value: [300, 200, 100],
            startColor: '#07c160',
            endColor: '#07c160'
        }
    ]

    @Ref('chartLine') readonly chartLine!: ChartLine
    @Ref('chartBar') readonly chartBar!: ChartBar

    private mounted() {
        this.chartLine!.init()
        this.chartBar!.init()
    }
}
</script>

<style lang="less" scoped>
.page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f2f3f4;

    .inner {
        position: absolute;
        top: 16px;
        left: 16px;
        right: 16px;
        bottom: 16px;
        background-color: #f2f3f4;
        overflow: auto;

        ::v-deep .chart {
            margin: 40px 0;
        }
    }
}
</style>
