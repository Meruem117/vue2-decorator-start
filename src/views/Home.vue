<template>
    <div class="page">
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {
    },
})

export default class HomeView extends Vue { }
</script>

<style lang="less" scoped>
.page {
    width: 100%;
    min-height: 100vh;
    background-color: #e7e9fa;
}
</style>
