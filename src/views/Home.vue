<template>
    <div class="page">
        <div class="inner">
            <ChartLine code="line" :data="lineData" :cate="lineCate" showLegend ref="chartLine" />
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
        {
            type: '',
            value: [100, 300, 200],
            color: '#6293ff',
            colorRgb: '99, 148, 255'
        }
    ]
    lineCate: string[] = ['Mon', 'Tue', 'Wen']

    @Ref('chartLine') readonly chartLine!: ChartLine

    private mounted() {
        this.chartLine!.init()
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
    }
}
</style>
