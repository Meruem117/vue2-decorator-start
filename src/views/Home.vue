<template>
    <div class="page">
        <chart-line />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
}
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    min-height: 100vh;
    background-color: #e7e9fa;
}
</style>
