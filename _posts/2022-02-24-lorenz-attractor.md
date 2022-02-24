---
layout: inner
position: left
title: Lorenz Attractors with Plotly.js
date: 2022-02-24
tags: lorenz attractor javascript plotly
lead_text: 'Simulating the strange and chaotic Lorenz attractor with a 3D plot.'
featured_image: 'img/posts/2022/02-24_lorenz-attractor.png'
project_link: '2022/02/24/lorenz-attractor'
button_text: 'See full post'
---
# Lorenz Attractors with Plotly.js

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://cdn.plot.ly/plotly-2.8.3.min.js"></script>

My introduction to the world of strange attractors, and chaos theory at large, was James Gleick's [*Chaos: Making a New Science*](https://www.amazon.com/Chaos-Making-Science-James-Gleick/dp/0143113453){:target="_blank" rel="noopener"}. Gleick manages to carry readers through technical material in a way that's approachable for the chaos-curious yet mathematically untalented (e.g., myself). Luckily, the mystery and complexity of the subject matter does not seem lost in its popular audience translation. We're given a window into the work of early chaos figures including meteorologist Edward Lorenz who's considered modern chaos theory's founder.

While experimenting with computer simulation of weather systems, Lorenz simplified a series of fluid dynamics equations (the Naiver-Stokes equations) to create a stripped down mathematical model of atmospheric convection. Lorenz describes these equations in his famous 1963 paper [Deterministic Nonperiodic Flow](https://journals.ametsoc.org/view/journals/atsc/20/2/1520-0469_1963_020_0130_dnf_2_0_co_2.xml?tab_body=pdf){:target="_blank" rel="noopener"}. The Lorenz equations are:

<p>
  $$\frac{dx}{dt} = \sigma(y - x)$$
  $$\frac{dy}{dt} = x(\rho - z) - y$$
  $$\frac{dz}{dt} = xy - \beta z$$
</p>

Below is a plot that demonstrates a Lorenz system, generated with [Plotly.js](https://plotly.com/javascript/){:target="_blank" rel="noopener"}. The plot is initialized to the values Lorenz used, which give rise to the famous butterfly-shaped Lorenz attractor: σ = 10, ρ = 28, and β = 8/3. Two traces are initialized at different starting coordinates. Feel free to use the sliders to adjust the system's parameters, reset the plot, and see how it impacts its behavior.

---

<div style="background: #f8f8f8; border: solid 1px #384353;">
  <div style="width: 100%; margin: auto; display: flex; flex-direction: row; justify-content: space-evenly;">
    <div style="padding-top: 10px;">
      <input type="range" min="1" max="20" value="10" step="0.1" class="slider" id="sigmaValueSlider">
      <p style="text-align: center;">σ = <span id="sigmaValueText"></span></p>
    </div>
    <div style="padding-top: 10px;">
      <input type="range" min="1" max="40" value="28" step="0.1" class="slider" id="rhoValueSlider">
      <p style="text-align: center;">ρ = <span id="rhoValueText"></span></p>
    </div>
    <div style="padding-top: 10px;">
      <input type="range" min="1" max="10" value="2.7" step="0.1" class="slider" id="betaValueSlider">
      <p style="text-align: center;">β = <span id="betaValueText"></span></p>
    </div>
  </div>
  <div style="width: 80%; margin: auto; display: flex; flex-direction: row; justify-content: space-between;">
    <button class="btn btn-default" style="margin-top: 0px; margin-bottom: 0px;" id="resetPlotButton">Reset Plot</button>
    <span id="plotStoppedText" style="margin: auto; color: 2E4453; font-weight: 600; font-style: italic;">Plot Stopped</span>
    <button class="btn btn-default" style="margin-top: 0px; margin-bottom: 0px;" id="stopButton">Stop</button>
  </div>
  <div style="border: solid 1px #384353; margin: 10px;">
    <div id="plot"></div>
  </div>
</div>

<script src="/js/lorenz.js"></script>

<h2>Resources</h2>

<ul style="font-size: 1.3em; line-height: 1.8;">
<li><a href="https://www.stsci.edu/~lbradley/seminar/attractors.html" target="_blank" rel="noopener">Larry Bradley, "Strange Attractors"</a></li>
<li><a href="https://web.math.ucsb.edu/~jhateley/paper/lorenz.pdf" target="_blank" rel="noopener">James Hateley, "The Lorenz system"</a></li>
<li><a href="https://itp.uni-frankfurt.de/~gros/Vorlesungen/SO/simulation_example" target="_blank" rel="noopener">Hendrik Wernecke, "Lorenz system: An interactive simulation of a chaotic attractor"</a></li>
</ul>
