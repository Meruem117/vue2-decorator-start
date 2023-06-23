declare namespace Chart {
    type LineDataItem = {
        type: string,
        value: number[],
        color: string,
        colorRgb: string
    }
    type BarDataItem = {
        type: string,
        value: number[],
        barWidth?: number | string,
        barGap?: number | string,
        startColor: string,
        endColor: string,
    }
}
