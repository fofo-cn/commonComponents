<template>
  <div id="chart" style="width: 1200px; height: 700px"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";
@Component({ components: {} })
export default class CommonCharts extends Vue {
  @Prop() data!: any;
  @Prop() type!: ["line", "pie", "bar"];
  get dataSource() {
    return 1;
  }
  option: any = {
    title: {
      text: "堆叠区域图"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      },
      position: ["50%", "50%"]
    },
    legend: {
      // 图例
      // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    },
    toolbox: {
      // 功能
      feature: {
        saveAsImage: {}, //下载图片，默认配置
        restore: {}, // 还原配置项,默认配置
        dataView: {}, // 数据可视化
        // dataZoom: {}, // 数据区域缩放。目前只支持直角坐标系的缩放。
        magicType: {
          type: ["line", "bar", "stack", "tiled"] // 动态类型切换
        }
        // brush:{}//选框组件的控制按钮。
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "0%",
      containLabel: true, // 刻度标签
      backgroundColor: "#afafaf", // 网格背景颜色,show必须为true才会显示
      borderColor: "#eee", //网格的颜色
      borderWidth: "1", // 网格线条的大小
      shadowBlur: { shadowColor: "rgba(0, 0, 0, 0.5)", shadowBlur: 10 }, //网格阴影
      shadowOffsetX: "1", //网格X轴偏移
      shadowOffsetY: "1", //网格Y轴偏移
      show: false, //是否展示网格
      zlevel: false // 用于canvas分层，手机端可能因动画效果导致崩溃，慎用！
      //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false //中心锚点
        // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    dataset: {
      // 提供一份数据。
      source: [
        ["product", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        ["邮件营销", 120, 132, 101, 134, 90, 230, 210],
        ["联盟广告", 220, 182, 191, 234, 290, 330, 310],
        ["视频广告", 220, 182, 191, 234, 290, 330, 310],
        ["直接访问", 320, 332, 301, 334, 390, 330, 320],
        ["搜索引擎", 320, 332, 301, 334, 390, 330, 320]
      ]
    },
    series: [
      { type: "line" },
      { type: "line" },
      { type: "line" },
      { type: "line" },
      { type: "line" }
    ]
  };
  mounted() {
    const chartsDom = document.getElementById("chart");
    const myCharts = echarts.init(chartsDom as any);
    myCharts.setOption(this.option as any);
  }
}
</script>

<style lang="scss" scoped></style>
