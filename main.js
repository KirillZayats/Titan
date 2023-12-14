import "./style/style.scss";
import DOM from "./js/helpers/dom";
import { openModal, closeModal } from "./js/modal";
import {
  colorBackground,
  colorBar,
  colorPlan,
  colorPrognos,
  colorScatter,
  config,
  getLayout,
  nameLow,
  namePoint,
} from "./js/settingsPlotly";
import { Grafic } from "./js/grafic";

{
  const buttonPoint = DOM.searchById("buttonPoint");
  const buttonPlan = DOM.searchById("buttonPlan");
  const addData = DOM.searchById("addPoint");
  const grafic = new Grafic();
  let lastChoice;
  
  const getPoint = (event) => {
    let [size, time] = closeModal(event);
    grafic.setValue(size, time);
  };

  const getPlan = (event) => {
    let [planValue] = closeModal(event);
    grafic.setPlan(planValue);
  };

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
