import { useEffect, useRef, useState, useContext } from "react";

import { Box, Typography } from "@mui/material";

// Import ColorContext
import { ColorContext } from "@/context/ColorContext";

// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { PieChart } from "echarts/charts";

// Import the title, tooltip, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

import ReactECharts from "echarts-for-react";

// Register the required components
echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default function Echart({
  title = "title",
  standardData,
  comparedData,
}) {
  const colorPalette = useContext(ColorContext);
  const chartRef = useRef();
  // const [options, setOptions] = useState(option);

  const amount =
    typeof standardData === "object"
      ? Object.values(standardData).reduce((prev, curr) => prev + curr, 0)
      : standardData;
  const standardAmount = amount
    ? amount
    : Object.values(comparedData).reduce((prev, curr) => prev + curr, 0);
  // console.log('total used amount: ', standardAmount)

  const dataSet = Object.keys(comparedData).map((category) => ({
    value: (comparedData[category] / standardAmount) * 100,
    name: category,
  }));

  // Calculate total filled value
  const totalFilled = dataSet.reduce((sum, item) => sum + item.value, 0);
  const restValue = 100 - totalFilled;

  // Add "Rest" section if there's any remaining space
  if (restValue > 0) {
    dataSet.push({
      value: restValue,
      name: "Rest",
      itemStyle: { color: "#E0E0E0" },
    });
  }

  const option = {
    title: {
      show: true,
      text: title,
      top: "center",
      left: "center",
      textStyle: {
        fontSize: 15,
        // width: '50%',
        rich: {
          title: {
            width: "50%",
            align: "center",
            lineHeight: 20,
            color: "#333",
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => `${params.name}: ${params.percent.toFixed(1)}%`,
    },
    series: [
      {
        data: dataSet,
        type: "pie",
        radius: ["50%", "70%"],
        label: {
          show: true,
          // position: "inside",
          color: "black",
          textBorderWidth: 1,
          textBorderColor: "white",
          // backgroundColor: 'gray'
        },
        color: colorPalette,
      },
    ],
    grid: {
      containLabel: true,
      left: "center",
      top: "center",
    },
  };

  return (
    <Box ref={chartRef} width={"25rem"} height={"20rem"} mx={"auto"}>
      <ReactECharts option={option} />
    </Box>
  );
}
