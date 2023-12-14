const namePoint = "point";
const nameLow = "low";
const config = {responsive: true}
const colorBar = '#76cc54';
const colorScatter = '#8b00ff';
const colorPlan = 'blue';
const colorBackground = "#ccdfff";
const colorText = '#000';


const getLayout = (getNowDate, nowDate) => {
  return {
    title: "Скважина 1-1",
    autosize: true,
    // width: 750,
    // height: 600,
    plot_bgcolor: colorBackground,
    legend: {"orientation": "h"},
    xaxis: {
      range: [
        `${getNowDate(nowDate)} 00:00:00`,
        `${getNowDate(nowDate)} 23:59:59`,
      ],
      title: {
        font: {
          family: "Inter, monospace",
          size: 18,
          color: colorText,
        },
      },
      exponentformat: "e",
      showexponent: "all",
    },
    yaxis: {
      ticksuffix: " тыс.м",
      range: [0, 100],
      automargin: true,
      title: {
        text: "Дебит",
        standoff: 0,
        font: {
          family: "Inter, monospace",
          size: 18,
          color: colorText,
        },
      },
    },
  };
};

export { getLayout, namePoint, nameLow, colorBar, colorScatter, colorPlan, colorBackground, config };
