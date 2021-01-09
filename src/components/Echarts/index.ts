//!组件
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts, { ECharts, EChartOption } from "echarts";
import {
  BarOption,
  EchartEvent,
  EchartItem,
  LineOption,
  PieOption,
  LineBarOption,
  pieSize
} from "./echarts";

declare module "vue/types/vue" {
  interface Vue {
    [key: string]: any;
  }
}

export const defalutTrue = (v?: boolean) => (v === undefined ? true : v);
// 网格位置
const grid = {
  top: 60,
  left: 60,
  right: 60,
  bottom: 80
};
// 平均线
const markLine = {
  data: [{ type: "average", name: "平均值" }],
  symbol: "none",
  lineStyle: {
    color: "#333",
    width: "2",
    type: "dash"
  }
};
const dataZoom = [{ type: "inside", start: 0, end: 100 }]; //
// 背景
const backgroundColor = "#fff";
// 标题
const titleTemlate = (title = "", fontSize = 18) => {
  return {
    text: title,
    left: "center",
    textStyle: {
      fontSize
    }
  };
};
// echarts工具
const toolbox = ({
  dataView,
  magicType,
  restore,
  saveAsImage
}: {
  dataView?: boolean; //数据可视化
  magicType?: boolean; //动态切换类型
  restore?: boolean; //还原
  saveAsImage?: boolean; //下载图片
} = {}) => {
  return {
    right: 60,
    bottom: 0,
    feature: {
      dataView: {
        show: defalutTrue(dataView),
        readOnly: true
      },
      magicType: {
        show: defalutTrue(magicType),
        type: ["line", "bar"]
      },
      restore: { show: defalutTrue(restore) },
      saveAsImage: { show: defalutTrue(saveAsImage) }
    }
  };
};
// 展示最大值和最小值;
const markPoint = {
  data: [
    { type: "max", name: "最大值" },
    { type: "min", name: "最小值" }
  ]
};
// 饼图图例
const pieTemplate = ([left, top]: number[], text = "") => {
  return {
    ...titleTemlate(text, 14),
    left: `${left}%`,
    top: `${top}%`,
    textAlign: "center"
  };
};
// 饼图图例位置
const legendPosition = {
  top: 15,
  left: 100
};
@Component
class Common extends Vue {
  @Prop() source!: EchartItem[];
  @Prop({ default: 400 }) height!: number;
  echart!: null | ECharts;
  averageLine!: boolean;
  labelShow!: boolean;
  // _option!: EChartOption;

  reload() {
    // 重载
    if (this.echart) {
      this.echart.clear();
      this.echart.setOption(this._option);
      this.echart.resize();
    }
  }
  init() {
    // 初始化;
    const el = this.$refs.echart as HTMLDivElement;
    this.echart = echarts.init(el);
    this.bind(); // 绑定点击事件
    this.echart.clear();
    this.echart.setOption(this._option);
    this.echart.resize();
    setTimeout(() => {
      this.$emit("after_render");
    }, 100);
  }
  bind() {
    if (!this.echart) return;
    this.echart.on("click", ({ seriesName, name, value }: EchartEvent) => {
      this.$emit("echart-click", { seriesName, name, value });
    });
  }
  beforeDestroy() {
    // 组件销毁
    this.echart = null;
  }
}

@Component
export class EBar extends Common {
  @Prop() option!: LineOption | BarOption;
  type = "bar";
  averageLine = true;
  labelShow = true;
  // this.source=[{x:'date',y:[number]}]
  get xData() {
    return this.source.map(({ x }) => x);
  }
  get series() {
    const { legendData, yFormatter } = this.option;
    const { averageLine } = this;
    return legendData.map((name, index: number) => {
      return {
        name,
        type: this.type,
        data: this.source.map(({ y }) => y[index]),
        markLine: averageLine ? markLine : {},
        markPoint: !this.labelShow ? markPoint : {},
        axisLabel: {
          formatter: yFormatter
        },
        label: {
          show: this.labelShow,
          position: "top",
          distance: 5
        },
        symbolSize: 10
      };
    });
  }
  get _option() {
    const { option, series, xData } = this;
    const {
      tooltipFormatter,
      titleText,
      xAxisName,
      xFormatter,
      legendData,
      yFormatter,
      yAxisName
    } = option;
    return {
      backgroundColor,
      dataZoom,
      toolbox: toolbox(),
      grid,
      tooltip: {
        axisPointer: {
          type: "cross"
        },
        formatter: tooltipFormatter
      },
      title: titleTemlate(titleText),
      xAxis: {
        type: "category",
        axisTick: {},
        axisLabel: {
          formatter: xFormatter,
          rotate: 50
        },
        data: xData,
        name: xAxisName
      },
      yAxis: {
        type: "value",
        boundaryGap: ["0%", "10%"],
        axisLabel: {
          formatter: yFormatter
        },
        name: yAxisName
      },
      legend: {
        ...legendPosition,
        data: legendData
      },
      series
    };
  }
}
@Component
export class ELine extends EBar {
  type = "line";
}

Component;
export class EPie extends Common {
  @Prop() option!: PieOption;
  get legendData() {
    return this.source.map(({ x }) => x);
  }
  get seriesData(): EChartOption.Series[] {
    const { labelFormatter, pieName } = this.option;
    const [radius, centers] = pieSize[pieName.length - 1] as any;
    return pieName.map((name, index: number) => {
      const [x, y] = centers[index];
      return {
        type: "pie",
        name,
        radius: `${radius}%`,
        center: [`${x}%`, `${y}%`],
        data: this.source.map(({ x, y }) => {
          return { name: x, value: y[index] };
        }),
        startAngle: 90,
        minAngle: 0,
        selectedMode: "single",
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        labelLine: {
          show: true
        },
        label: {
          position: "outer",
          borderColor: "#aaa",
          formatter: labelFormatter || "{b} {c} ({d}%)"
        }
      };
    });
  }
  get _option(): EChartOption {
    const { tooltipFormatter, titleText, pieName } = this.option;
    const [, , title] = pieSize[pieName.length - 1] as any;
    const { legendData, seriesData } = this;
    return {
      backgroundColor,
      toolbox: toolbox({ magicType: false }),
      grid,
      tooltip: {
        trigger: "item",
        formatter: tooltipFormatter || "{a} {b} <br/> {c} ({d}%)"
      },
      title: [
        titleTemlate(titleText),
        ...pieName.map((text, index) => {
          return pieTemplate(title[index], text);
        })
      ],
      legend: {
        ...legendPosition,
        data: legendData,
        orient: "vertical",
        left: 0
      },
      series: seriesData
    };
  }
}

@Component
export class ELineBar extends Common {
  colors = [
    ["#00f", "#3fb1e3", "#6be6c1", "#626c91"],
    ["#f00", "#d87c7c", "#919e8b", "#d7ab82"]
  ];
  get color() {
    const index = [1, 1];
    return this.option._series.map(yAxisIndex => {
      return this.colors[yAxisIndex][index[yAxisIndex]++];
    });
  }
  @Prop() option!: LineBarOption;
  get xData() {
    return this.source.map(({ x }) => x);
  }
  ranges() {
    const mins: number[] = [];
    const maxs: number[] = [];
    this.option._series.forEach((yAxisIndex, index) => {
      let floorMax = 0;
      let floorMin = 0;
      const data = this.source.map(({ y }) => y[index]);
      const curMax = Math.max.apply(this, data);
      switch (yAxisIndex) {
        case 0:
          floorMax = Math.floor(
            Math.max(curMax * 2, maxs[yAxisIndex] || 0) * 1.1
          );
          floorMin = Math.floor(
            Math.min(curMax * 2, mins[yAxisIndex] || 0) * 1.1
          );
          maxs[yAxisIndex] = floorMax;
          mins[yAxisIndex] = floorMin;
          break;
        case 1:
          floorMax = Math.floor(Math.max(curMax, maxs[yAxisIndex] || 0) * 1.1);
          mins[yAxisIndex] = -floorMax;
          maxs[yAxisIndex] = floorMax;
          break;
      }
    });
    return { mins, maxs };
  }
  get series() {
    const { legendData, _yAxis, _series } = this.option;
    const { averageLine, labelShow } = this;
    return legendData.map((name, index) => {
      return {
        name,
        type: ["bar", "line"][_series[index]],
        yAxisIndex: _series[index],
        axisLabel: {
          formatter: _yAxis[_series[index]].formatter
        },
        markLine: averageLine
          ? { ...markLine, lineStyle: { color: this.color[index] } }
          : {},
        markPoint: !labelShow ? markPoint : {},

        data: this.source.map(({ y }) => y[index]),
        label: {
          show: labelShow,
          position: "top",
          distance: 5
        },
        symbolSize: 10
      };
    });
  }
  partition!: boolean;
  get _option(): EChartOption {
    const { option, series, xData, color, partition } = this;
    const {
      tooltipFormatter,
      titleText,
      xFormatter,
      xAxisName,
      legendData,
      _yAxis
    } = option;
    const { mins, maxs } = partition ? this.ranges() : { mins: [], maxs: [] };
    return {
      color,
      backgroundColor,
      toolbox: toolbox(),
      dataZoom,
      grid,
      tooltip: {
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        },
        formatter: tooltipFormatter
      },
      title: titleTemlate(titleText),
      xAxis: {
        type: "category",
        axisLabel: {
          formatter: xFormatter
        },
        axisPointer: {
          type: "shadow"
        },
        data: xData,
        name: xAxisName
      },
      yAxis: _yAxis.map(({ formatter, name, min, max }, i) => {
        const _min = partition ? min || mins[i] : undefined;
        const _max = partition ? max || maxs[i] : undefined;
        const color = this.colors[i][0];
        return {
          axisLabel: {
            formatter
          },
          name,
          axisLine: {
            lineStyle: {
              color
            }
          },
          splitNumber: 1,
          splitLine: {
            show: !partition,
            lineStyle: {
              color,
              type: "dotted",
              opacicy: 0.5
            }
          },
          min: _min,
          max: _max
        };
      }),
      legend: {
        ...legendPosition,
        data: legendData
      },
      series
    };
  }
}
