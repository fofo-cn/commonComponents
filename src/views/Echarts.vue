<template>
  <div>
    <CommonCharts :data="series" :type="line" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommonCharts from "@/components/CommonCharts.vue";
@Component({ components: { CommonCharts } })
export default class Echarts extends Vue {
  line = "line";
  //   source: [
  //   ["product", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  //   ["邮件营销", 120, 132, 101, 134, 90, 230, 210],
  //   ["联盟广告", 220, 182, 191, 234, 290, 330, 310],
  //   ["视频广告", 220, 182, 191, 234, 290, 330, 310],
  //   ["直接访问", 320, 332, 301, 334, 390, 330, 320],
  //   ["搜索引擎", 320, 332, 301, 334, 390, 330, 320]
  // ]
  series = [
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "视频广告",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "直接访问",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "搜索引擎",
      type: "line",
      stack: "总量",
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ];
}
</script>

<style lang="scss" scoped></style>
