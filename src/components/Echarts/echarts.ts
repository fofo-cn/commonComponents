export interface EchartItem {
  x: string;
  y: number[];
}
export interface EchartEvent {
  seriesName: string;
  name: string;
  value: number | number[];
}

interface CommonOption {
  titleText?: string;
  tooltipFormatter?: string;
}
export interface LineBarOption extends LineOption {
  _series: (0 | 1)[];
  _yAxis: { formatter?: string; name: string; max?: number; min?: number }[];
}

// 折线图的interface
export interface LineOption extends CommonOption {
  xFormatter?: string;
  legendData: string[];
  yFormatter?: string;
  xAxisName?: string;
  yAxisName?: string;
  seriesFormatter?: string;
}
// 柱状图和折线图一样
export type BarOption = LineOption;
// 饼图的interface
export interface PieOption extends CommonOption {
  labelFormatter?: string;
  pieName: string[];
}

//[半径，圆心坐标[],title坐标[]]
export const pieSize = [
  [50, [[50, 50]], [[50, 10]]],
  [
    40,
    [
      [30, 50],
      [70, 50]
    ],
    [
      [30, 10],
      [70, 10]
    ]
  ],
  [
    40,
    [
      [25, 50],
      [50, 50],
      [75, 50]
    ],
    [
      [25, 10],
      [50, 10],
      [75, 10]
    ]
  ],
  [
    30,
    [
      [30, 25],
      [70, 25],
      [30, 75],
      [70, 75]
    ],
    [
      [30, 0],
      [70, 0],
      [30, 50],
      [70, 50]
    ]
  ],
  [
    25,
    [
      [25, 25],
      [50, 25],
      [75, 25],
      [33, 75],
      [66, 75]
    ],
    [
      [25, 5],
      [50, 5],
      [75, 5],
      [33, 55],
      [66, 55]
    ]
  ],
  [
    25,
    [
      [25, 25],
      [50, 25],
      [75, 25],
      [25, 75],
      [50, 75],
      [75, 75]
    ],
    [
      [25, 5],
      [50, 5],
      [75, 5],
      [25, 55],
      [50, 55],
      [75, 55]
    ]
  ]
];
