import DOM from "./helpers/dom";
import { nameLow, namePoint } from "./settingsPlotly";

const modalBg = DOM.search(".modal-bg");
const modal = DOM.search(".modal");
const modalField = DOM.search(".modal-field");
const dataY = DOM.searchById("size");
const dataX = DOM.searchById("time");
const plan = DOM.searchById("allSize");

const classActiveModalBg = "modal-bg__active";
const classActiveModalField = "modal-field__active";
const classFormPoint = "form__point";
const classFormLow = "form__low";
let isStatusOpenModal = false;
let open;

const toggleModal = () => {
  DOM.toggle(modalBg, classActiveModalBg);
  DOM.toggle(modalField, classActiveModalField);
  DOM.toggleScroll();
};

const setEventModal = () => {
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalField.addEventListener("click", () => {
    switch (open) {
      case namePoint:
        DOM.removeAttr(dataY, "required");
        DOM.removeAttr(dataX, "required");
        break;
      case nameLow:
        DOM.removeAttr(plan, "required");
        break;
    }
    toggleModal();
    isStatusOpenModal = false;
  });
};

setEventModal();

const toggleBlock = (className, status) => {
  const data = DOM.searchAll(`.${className}`);
  for (let index = 0; index < data.length; index++) {
    if (status) {
      DOM.addClass(data[index], "form__hide");
    } else {
      DOM.removeClass(data[index], "form__hide");
    }
  }
};

const openModal = (type) => {
  switch (type) {
    case namePoint:
      DOM.attr(dataY, "required", "required");
      DOM.attr(dataX, "required", "required");
      toggleBlock(classFormPoint, false);
      toggleBlock(classFormLow, true);
      break;
    case nameLow:
      DOM.attr(plan, "required", "required");
      toggleBlock(classFormPoint, true);
      toggleBlock(classFormLow, false);
      break;
  }
  isStatusOpenModal = true;
  open = type;
  toggleModal();
};

const closeModal = (event) => {
  let answer = [];
  switch (open) {
    case namePoint:
      let size = dataY.value;
      let time = dataX.value;
      if (size && time && size > 0) {
        DOM.removeAttr(dataY, "required");
        DOM.removeAttr(dataX, "required");
        toggleModal();
        isStatusOpenModal = false;
        answer = [size, time];
        event.preventDefault();
        dataY.value = "";
        dataX.value = "";
      }
      break;
    case nameLow:
      let planValue = plan.value;
      if (planValue && planValue > 0) {
        DOM.removeAttr(plan, "required");
        toggleModal();
        isStatusOpenModal = false;
        answer = [planValue];
        event.preventDefault();
        plan.value = "";
      }
      break;
  }
  return answer;
};

export { openModal, closeModal };
