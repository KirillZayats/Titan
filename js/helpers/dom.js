export default class DOM {
    static create = (tagName) => {
        return document.createElement(tagName);
    }

    static attr = (element, nameAttr, valueAttr) => {
        element.setAttribute(nameAttr, valueAttr)
    }

    static removeAttr = (element, nameAttr) => {
        element.removeAttribute(nameAttr);
    }

    static html = (element, value) => {
        element.innerHTML = value;
    }

    static htmlClear = (element) => {
        element.innerHTML = " ";
    }

    static search = (selector) => {
        return document.querySelector(selector);
    }

    static searchById = (selector) => {
        return document.getElementById(selector);
    }

    static searchAll = (selector) => {
        return document.querySelectorAll(selector);
    }

    static addClass = (element, className) => {
        element.classList.add(className);
    }

    static removeClass = (element, className) => {
        element.classList.remove(className);
    }

    static toggle = (element, classList) => {
        element.classList.toggle(classList);
      };
      
    static toggleScroll = () => {
        document.querySelector("body").classList.toggle("noscroll");
    };

    static hasClass = (element, className) => {
        return element.classList.contains(className);
    }

    static append = (element, newElement, beforeElement) => {
        beforeElement ? element.insertBefore(newElement, beforeElement) :
                        element.appendChild(newElement);
    }

    static on = (element, eventName, funcName) => {
        element.addEventListener(eventName, funcName)
    }
}