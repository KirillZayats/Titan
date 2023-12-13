import './style/style.scss'

const createTrace = (arrayX, arrayY, type) => {
  return {
    x: [...arrayX],
    y: [...arrayY],
    type: type
  }
}



const trace1 = createTrace(['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'], [10, 15, 13, 17], 'scatter');
const trace3 = createTrace(['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'], [10, 15, 13, 17], 'bar');


const trace2 = {
  x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
  y: [16, 5, 11, 9],
  type: 'scatter'
};


const layout = {
  title: "Скважина 1-1",
  autosize: false,
  width: 700,
  height: 500,
  plot_bgcolor: '#ccdfff',
  xaxis: {
    title: {
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    exponentformat: 'e',
    showexponent: 'all',
  },
  yaxis: {
    title: {
      text: 'Дебит',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};

const data = [trace1, trace2, trace3];

Plotly.newPlot('containerGraph', data, layout);
