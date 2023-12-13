import "./style/style.scss";
import DOM from "./js/helpers/dom";
import { openModal, closeModal } from "./js/modal";
import { colorBar, colorScatter, getLayout, nameLow, namePoint } from "./js/settingsPlotly";

{
  const createTrace = (arrayX, arrayY, type, name, color) => {
    return {
      x: [...arrayX],
      y: [...arrayY],
      name: name,
      type: type,
      marker: {
        color: color,
      },
      line: {
        width: 3,
      },
    };
  };

  const buttonPoint = DOM.searchById("buttonPoint");
  const buttonPlan = DOM.searchById("buttonPlan");
  const addData = DOM.searchById("addPoint");

  let lastChoice;
  const nowDate = new Date();
  const getNowDate = (date, year = 0) => {
    return `${date.getFullYear() + year}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  };
  let arrayX = [];
  let arrayY = [];
  let arrayXDay = [];
  let arrayYDay = [];
  let arrayYDayCopy = [];
  let data = [];
  let layout = getLayout(getNowDate, nowDate);
  let plan = createTrace(
    [
      `${getNowDate(nowDate, -1)} 00:00:00`,
      `${getNowDate(nowDate, 1)} 23:59:59`,
    ],
    [0, 0],
    "scatter",
    "Добыто (сутки)",
    "blue"
  );
  data.push(plan);
  Plotly.newPlot("containerGraph", data, layout);

  buttonPoint.addEventListener("click", () => {
    lastChoice = namePoint;
    openModal(lastChoice);
    DOM.html(addData, "Добавить точку");
  });

  buttonPlan.addEventListener("click", () => {
    lastChoice = nameLow;
    openModal(lastChoice);
    DOM.html(addData, "Добавить план");
  });

  const setValueHour = (value, date) => {
    arrayX.push(`${getNowDate(nowDate)} ${date.split(":")[0]}`);
    arrayY.push(value);

    return createTrace(arrayX, arrayY, "bar", "Добыто (час)", colorBar);
  };

  const sortValueDay = (value, date) => {
    let partsOld, partsNew;
    let isStatusSplice = false;
    for (let index = 0; index < arrayXDay.length; index++) {
      partsOld = arrayXDay[index].split(" ");
      partsOld = partsOld[partsOld.length - 1].split(":");
      partsNew = `${getNowDate(nowDate)} ${date.split(":")[0]}`
        .toString()
        .split(" ");
      partsNew = partsNew[partsNew.length - 1].split(":");
      if (
        +partsOld[0] > +partsNew[0] ||
        (+partsOld[0] === +partsNew[0] &&
          +partsOld[partsOld.length - 1] > +partsNew[partsNew.length - 1])
      ) {
        arrayXDay.splice(index, 0, `${getNowDate(nowDate)} ${date}`);
        arrayYDayCopy.splice(index, 0, value);
        index = arrayXDay.length;
        isStatusSplice = true;
      }
    }
    if (!isStatusSplice) {
      arrayXDay.push(`${getNowDate(nowDate)} ${date}`);
      arrayYDayCopy.push(value);
    }
  }

  const setNormalValueDay = () => {
    arrayYDay.length = 0;
    arrayYDay.push(arrayYDayCopy[0]);
    for (let index = 1; index < arrayYDayCopy.length; index++) {
      arrayYDay.push(+arrayYDayCopy[index] + +arrayYDay[index - 1]);
    }
  }

  const setValueDay = (value, date) => {
    if (arrayXDay.length === 0) {
      arrayXDay.push(`${getNowDate(nowDate)} ${date}`);
      arrayYDayCopy.push(value);
    } else {
      sortValueDay(value, date);
    }
    setNormalValueDay();
    return createTrace(
      arrayXDay,
      arrayYDay,
      "scatter",
      "Добыто (сутки)",
      colorScatter
    );
  };

  const setValue = (value, date) => {
    if (value && date && value > 0) {
      data.splice(1, 1, setValueHour(value, date));
      data.splice(2, 1, setValueDay(value, date));
      Plotly.update("containerGraph", data, layout);
    }
  };

  const setPlan = (value) => {
    if (value && value > 0) {
      plan = createTrace(
        [
          `${getNowDate(nowDate, -1)} 00:00:00`,
          `${getNowDate(nowDate, 1)} 23:59:59`,
        ],
        [value, value],
        "scatter",
        "Добыто (сутки)",
        colorPlan
      );
      data.shift();
      data.unshift(plan);
      layout.yaxis.range[1] = +value + 30;
      Plotly.newPlot("containerGraph", data, layout);
    }
  };

  const getPoint = (event) => {
    let [size, time] = closeModal(event);
    setValue(size, time);
  };

  const getPlan = (event) => {
    let [planValue] = closeModal(event);
    setPlan(planValue);
  };

  addData.addEventListener("click", (event) => {
    switch (lastChoice) {
      case namePoint:
        getPoint(event);
        break;
      case nameLow:
        getPlan(event);
        break;
    }
  });
}
