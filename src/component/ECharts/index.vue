<template>
    <div ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "ECharts",
    props: {
        options: Object,
        theme: String,
    },
    data() {
        return {
            chart: null,
        };
    },
    watch: {
        options: {
            immediate: true,
            handler: "$_setOption",
        },
        chart: "$_setOption",
    },
    beforeDestroy() {
        this.chart?.dispose();
        this.chart = null;
    },
    mounted() {
        this.$_init();
    },
    methods: {
        $_init() {
            this.chart = echarts.init(this.$refs.chart, this.theme);
        },
        $_setOption() {
            if (this.options && this.chart) {
                this.chart.setOption(this.options);
            }
        },
    },
};
</script>

<style scoped></style>
