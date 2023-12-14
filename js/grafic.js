import {
  colorBar,
  colorPlan,
  colorPrognos,
  colorScatter,
  config,
  getLayout,
} from "./settingsPlotly";

class Grafic {
  constructor() {
    this.nowDate = new Date();
    this.arrayX = [];
    this.arrayY = [];
    this.arrayXDay = [];
    this.arrayYDay = [];
    this.arrayYDayCopy = [];
    this.arrayXPrognos = [];
    this.arrayYPrognos = [];
    this.data = [];
    this.layout = getLayout(this.#getNowDate, this.nowDate);
    this.plan = this.#createTrace(
      [
        `${this.#getNowDate(this.nowDate, -1)} 00:00:00`,
        `${this.#getNowDate(this.nowDate, 1)} 23:59:59`,
      ],
      [0, 0],
      "scatter",
      "Добыто (сутки)",
      colorPlan
    );
    this.data.push(this.plan);
    Plotly.newPlot("containerGraph", this.data, this.layout, config);
  }

  setValue = (value, date) => {
    if (value && date && value > 0) {
      this.data.splice(1, 1, this.#setValueHour(value, date));
      this.data.splice(2, 1, this.#setValueDay(value, date));
      const trace = this.#setPrognos();
      trace && this.data.splice(3, 1, trace);
      Plotly.update("containerGraph", this.data, this.layout, config);
    }
  };

  setPlan = (value) => {
    if (value && value > 0) {
      this.plan = this.#createTrace(
        [
          `${this.#getNowDate(this.nowDate, -1)} 00:00:00`,
          `${this.#getNowDate(this.nowDate, 1)} 23:59:59`,
        ],
        [value, value],
        "scatter",
        "Добыто (сутки)",
        colorPlan
      );
      this.data.shift();
      this.data.unshift(this.plan);
      Plotly.newPlot("containerGraph", this.data, this.layout, config);
    }
  };

  #getNowDate = (date, year = 0) => {
    return `${date.getFullYear() + year}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  };

  #createTrace = (arrayX, arrayY, type, name, color, text = "") => {
    return {
      x: [...arrayX],
      y: [...arrayY],
      name: name,
      type: type,
      mode: "lines+text",
      textposition: "top left",
      textfont: {
        family: "Inter, monospace",
        size: 14,
      },
      text:
        text && text.length > 1
          ? [`${text[0].toFixed(1)}`, `${text[1].toFixed(1)}`]
          : "",
      marker: {
        color: color,
      },
      line: {
        dash: type,
        width: 3,
      },
    };
  };

  #setValueHour = (value, date) => {
    this.arrayX.push(`${this.#getNowDate(this.nowDate)} ${date.split(":")[0]}`);
    this.arrayY.push(value);
    return this.#createTrace(
      this.arrayX,
      this.arrayY,
      "bar",
      "Добыто (час)",
      colorBar
    );
  };

  #sortValueDay = (value, date) => {
    let partsOld, partsNew;
    let isStatusSplice = false;
    for (let index = 0; index < this.arrayXDay.length; index++) {
      partsOld = this.arrayXDay[index].split(" ");
      partsOld = partsOld[partsOld.length - 1].split(":");
      partsNew = `${this.#getNowDate(this.nowDate)} ${date.split(":")[0]}`
        .toString()
        .split(" ");
      partsNew = partsNew[partsNew.length - 1].split(":");
      if (
        +partsOld[0] > +partsNew[0] ||
        (+partsOld[0] === +partsNew[0] &&
          +partsOld[partsOld.length - 1] > +partsNew[partsNew.length - 1])
      ) {
        this.arrayXDay.splice(index, 0, `${this.#getNowDate(this.nowDate)} ${date}`);
        this.arrayYDayCopy.splice(index, 0, value);
        index = this.arrayXDay.length;
        isStatusSplice = true;
      }
    }
    if (!isStatusSplice) {
        this.arrayXDay.push(`${this.#getNowDate(this.nowDate)} ${date}`);
        this.arrayYDayCopy.push(value);
    }
  };

  #setNormalValueDay = () => {
    this.arrayYDay.length = 0;
    this.arrayYDay.push(this.arrayYDayCopy[0]);
    for (let index = 1; index < this.arrayYDayCopy.length; index++) {
        this.arrayYDay.push(+this.arrayYDayCopy[index] + +this.arrayYDay[index - 1]);
    }
  };

  #setValueDay = (value, date) => {
    if (this.arrayXDay.length === 0) {
      this.arrayXDay.push(`${this.#getNowDate(this.nowDate)} ${date}`);
      this.arrayYDayCopy.push(value);
    } else {
      this.#sortValueDay(value, date);
    }
    this.#setNormalValueDay();
    return this.#createTrace(
      this.arrayXDay,
      this.arrayYDay,
      "scatter",
      "Добыто (сутки)",
      colorScatter
    );
  };

  #getDifferenceHours = (startDate, endDate) => {
    return (+endDate - +startDate) / 60 / 60 / 1000;
  };

  #fillArraysPrognos = (lastIndex, leftDate, leftSize) => {
    this.arrayXPrognos.length = 0;
    this.arrayYPrognos.length = 0;
    this.arrayXPrognos.push(this.arrayXDay[lastIndex]);
    this.arrayXPrognos.push(leftDate);
    this.arrayYPrognos.push(this.arrayYDay[lastIndex]);
    this.arrayYPrognos.push(leftSize);
  };

  #setPrognos = () => {
    if (this.arrayXDay.length >= 2) {
      const lastIndex = this.arrayXDay.length - 1;
      const hours = this.#getDifferenceHours(
        Date.parse(this.arrayXDay[lastIndex - 1]),
        Date.parse(this.arrayXDay[lastIndex])
      );
      const size = +this.arrayYDay[lastIndex] - +this.arrayYDay[lastIndex - 1];
      const sizeHour = size / hours;
      const leftDate = `${this.#getNowDate(this.nowDate)} 23:59:59`;
      const leftHours = this.#getDifferenceHours(
        Date.parse(this.arrayXDay[lastIndex]),
        Date.parse(leftDate)
      );
      const leftSize = +this.arrayYDay[lastIndex] + sizeHour * leftHours;
      this.#fillArraysPrognos(lastIndex, leftDate, leftSize);
    }
    return this.#createTrace(
      this.arrayXPrognos,
      this.arrayYPrognos,
      "dot",
      "Прогноз добычи",
      colorPrognos,
      this.arrayYPrognos
    );
  };
}

export { Grafic };
