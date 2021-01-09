<template>
  <CLine ref="line" :option="option_l" :source="source" />
</template>

<script lang="ts">
import { ELine } from "@/components/Echarts";
import { LineOption } from "@/components/Echarts/echarts";
import { Component, Vue } from "vue-property-decorator";
import CLine from "@/components/Echarts/CLine.vue";
@Component({ components: { CLine } })
export default class LineAndBar extends Vue {
  option_l: LineOption = {
    titleText: undefined,
    tooltipFormatter: undefined,
    legendData: [],
    xFormatter: undefined,
    yFormatter: undefined,
    xAxisName: undefined,
    yAxisName: undefined,
    seriesFormatter: undefined
  };
  source = [
    { x: "2020.01", y: [0, 1, 2] },
    { x: "2020.02", y: [10, 11, 62] },
    { x: "2020.03", y: [20, 1, 22] },
    { x: "2020.04", y: [30, 31, 32] },
    { x: "2020.05", y: [20, 11, 2] },
    { x: "2020.06", y: [4, 21, 2] },
    { x: "2020.07", y: [90, 12, 27] },
    { x: "2020.08", y: [100, 1, 12] },
    { x: "2020.09", y: [50, 31, 12] },
    { x: "2020.10", y: [30, 38, 82] },
    { x: "2020.11", y: [20, 91, 2] },
    { x: "2020.12", y: [49, 61, 12] }
  ];

  mounted() {
    this.option_l.legendData = ["时间", "数量", "人数"];
    this.$nextTick(() => {
      (this.$refs.line as ELine).init();
      this.loading = false;
    });
  }
}
</script>

<style lang="scss" scoped></style>
