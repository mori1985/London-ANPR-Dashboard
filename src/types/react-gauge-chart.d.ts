declare module "react-gauge-chart" {
  import { Component } from "react";

  interface GaugeChartProps {
    id?: string;
    nrOfLevels?: number;
    colors?: string[];
    arcWidth?: number;
    percent?: number;
    textColor?: string;
    needleColor?: string;
    formatTextValue?: (value: number) => string;
    [key: string]: any;
  }

  export default class GaugeChart extends Component<GaugeChartProps> {}
}