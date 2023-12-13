const namePoint = "point";
const nameLow = "low";
const colorBar = '#76cc54';
const colorScatter = '#8b00ff';
const colorPlan = 'blue';

const getLayout = (getNowDate, nowDate) => {
  return {
    title: "Скважина 1-1",
    autosize: false,
    width: 700,
    height: 500,
    plot_bgcolor: "#ccdfff",
    xaxis: {
      range: [
        `${getNowDate(nowDate)} 00:00:00`,
        `${getNowDate(nowDate)} 23:59:59`,
      ],
      title: {
        font: {
          family: "Inter, monospace",
          size: 18,
          color: "#000",
        },
      },
      exponentformat: "e",
      showexponent: "all",
    },
    yaxis: {
      ticksuffix: " тыс.м",
      range: [0, 100],
      title: {
        text: "Дебит",
        font: {
          family: "Inter, monospace",
          size: 18,
          color: "#000",
        },
      },
    },
  };
};

export { getLayout, namePoint, nameLow, colorBar, colorScatter, colorPlan };
