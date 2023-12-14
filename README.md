# Тестовое задание от компании "Титан"

## Задача
Реализовать с помощью библиотеки Plotly.js HTML-страницу для работы с графиком (**Добыча ресурсов за сутки**).

## Требования и детали
HTML-элемент должен быть реализован в виде HTML-страницы и поддерживать следующие JS интерфейсы для внешнего вызова:
- добавить точку на график - Добыто (сутки) - setValue(value,date);
- установить план добычи – setPlan(value);

Ось X ограничена одними сутками (00:00-23:59). Ось Y масштабируется в зависимости от
полученных значений.
График должен корректно масштабироваться (в 100%) при изменении размеров страницы.

## Как запустить проект
Для инициализации проекта установите зависимости с помощью команды:

```sh
npm install
```

Запустить локально проект:

```sh
npm run dev
```

**_Деплой сделан через Firebase._**
**_Ссылка на продакшен: [Titan grafic](https://titan-eb7a1.web.app/)_**

## Что было использовано:

- [x] Html;
- [x] Scss;
- [x] Javascript;
- [x] Lib "Plotly".