'use strict';

const plot = document.getElementById('plot');

var resetPlot = false,
    stopped = false;

const resetPlotButton = document.getElementById('resetPlotButton');
resetPlotButton.addEventListener('click', function () {
  resetPlot = true;
  if (stopped){
    plotStoppedText.style.display = 'none';
    // restart recursive calls to update
    requestAnimationFrame(update);
  }
});

const plotStoppedText = document.getElementById('plotStoppedText');
plotStoppedText.style.display = 'none'; // hide text initially

function stopAnimation() {
  stopped = true;
  plotStoppedText.style.display = '';
}

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopAnimation);

const sigmaValueSlider = document.getElementById('sigmaValueSlider');
const sigmaValueText = document.getElementById('sigmaValueText')

sigmaValueText.innerHTML = sigmaValueSlider.value;
sigmaValueSlider.oninput = function () {
  sigmaValueText.innerHTML = this.value;
};

const rhoValueSlider = document.getElementById('rhoValueSlider');
const rhoValueText = document.getElementById('rhoValueText')

rhoValueText.innerHTML = rhoValueSlider.value;
rhoValueSlider.oninput = function () {
  rhoValueText.innerHTML = this.value;
};

const betaValueSlider = document.getElementById('betaValueSlider');
const betaValueText = document.getElementById('betaValueText')

betaValueText.innerHTML = betaValueSlider.value;
betaValueSlider.oninput = function () {
  betaValueText.innerHTML = this.value;
};

var layout = {
  paper_bgcolor: '#FFFFFF',
  showlegend: false,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0
  },
  scene: {
    camera: {
      center: {x: 0, y: 0, z: -0.2},
      eye: {x: -1.5, y: 1.5, z: 0.5}
    },
    xaxis: {
      autorange: false,
      range: [-40, 40]
    },
    yaxis: {
      autorange: false,
      range: [-40, 40]
    },
    zaxis: {
      autorange: false,
      range: [0, 60]
    },
    aspectmode: 'cube',
    dragmode: false
  }
};

var config = {
  responsive: true,
  displayModeBar: false
};

function getNextPoint(point, sigma, rho, beta, dt) {
  // Lorenz attractor equations
  let x_grad = sigma * (point.y - point.x),
      y_grad = point.x * (rho - point.z) - point.y,
      z_grad = point.x * point.y - beta * point.z;

  let x = point.x + dt * x_grad,
      y = point.y + dt * y_grad,
      z = point.z + dt * z_grad;

  return {x: x, y: y, z: z}
};

function hasTightRange(pointData) {
  // Certain parameters will cause traces to spiral into themselves
  // Prevent this from happening
  let xRange = Math.max(...pointData.x) - Math.min(...pointData.x),
      yRange = Math.max(...pointData.y) - Math.min(...pointData.y),
      zRange = Math.max(...pointData.z) - Math.min(...pointData.z);

  if (xRange < 1.5 & yRange < 1.5 & zRange < 1.5) {
    return true;
  }
  else {
    return false;
  }
};

function initPlot() {
  var pointData0 = {x: [], y: [], z: []},
      pointData1 = {x: [], y: [], z: []},
      sigma = sigmaValueText.innerHTML,
      rho = rhoValueText.innerHTML,
      beta = betaValueText.innerHTML,
      dt = 0.01;

  // Inital point0
  var point0 = {x: 20, y: 5, z: 5};
  pointData0.x.push(point0.x);
  pointData0.y.push(point0.y);
  pointData0.z.push(point0.z);

  // Inital point1
  var point1 = {x: 0, y: 20, z: 0};
  pointData1.x.push(point1.x);
  pointData1.y.push(point1.y);
  pointData1.z.push(point1.z);

  for (let i = 0; i < 149; i++) {
    var point0 = getNextPoint(point0, sigma, rho, beta, dt);
    pointData0.x.push(point0.x);
    pointData0.y.push(point0.y);
    pointData0.z.push(point0.z);

    var point1 = getNextPoint(point1, sigma, rho, beta, dt);
    pointData1.x.push(point1.x);
    pointData1.y.push(point1.y);
    pointData1.z.push(point1.z);
  }

  var trace0 = {
    type: 'scatter3d',
    mode: 'lines',
    x: pointData0.x,
    y: pointData0.y,
    z: pointData0.z
  };

  var trace1 = {
    type: 'scatter3d',
    mode: 'lines',
    x: pointData1.x,
    y: pointData1.y,
    z: pointData1.z
  };

  Plotly.newPlot(plot, [
    trace0,
    trace1
  ],
  layout,
  config);

  return [
    [pointData0, pointData1],
    sigma,
    rho,
    beta,
    dt
  ];
};

function update(){
  for (let i = 0; i < 2; i++){
    let lastPoint = {
      x: data[0][i].x.slice(-1)[0],
      y: data[0][i].y.slice(-1)[0],
      z: data[0][i].z.slice(-1)[0]
    };

    let point = getNextPoint(lastPoint, data[1], data[2], data[3], data[4]);
    data[0][i].x.push(point.x);
    data[0][i].y.push(point.y);
    data[0][i].z.push(point.z);

    data[0][i].x.shift();
    data[0][i].y.shift();
    data[0][i].z.shift();
  }

  Plotly.animate('plot', {
    data: [
      {x: data[0][0].x, y: data[0][0].y, z: data[0][0].z},
      {x: data[0][1].x, y: data[0][1].y, z: data[0][1].z}
    ]
  }, {
    transition: {
      duration: 0
    },
    frame: {
      duration: 0,
    }
  });

  if (resetPlot){
    // reinitialize
    data = initPlot();
    resetPlot = false;
    stopped = false;
  };

  if (hasTightRange(data[0][0]) | hasTightRange(data[0][1])){
    stopAnimation();
  };

  if (!stopped){
    requestAnimationFrame(update);
  };
};

// First plot initialization
var data = initPlot();
requestAnimationFrame(update);
