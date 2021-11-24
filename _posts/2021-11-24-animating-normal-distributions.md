---
layout: inner
position: left
title: Animating Normal Distributions with Python
date: 2021-11-24
tags: python manim normal distribution animation
lead_text: 'Animating univariate and bivariate normal distributions with the Manim Python library.'
featured_image: 'img/posts/2021/11-24_animating-normal-distributions-rho.jpg'
project_link: '2021/11/24/animating-normal-distributions'
button_text: 'See full post'
---

# Animating Normal Distributions with Python

I've been fascinated by [3Blue1Brown's incredible math videos](https://www.youtube.com/c/3blue1brown){:target="_blank" rel="noopener"}, and was happy to learn that the engine Grant Sanderson uses to generate his elegant animations is an open-source Python library called ```manim```. To generate some animations of my own, I used the [Manim Community fork](https://github.com/ManimCommunity/manim/){:target="_blank" rel="noopener"} to explore of one of the core components of statistics: the normal distribution. More specifically, I animated the [probability density functions](https://en.wikipedia.org/wiki/Probability_density_function){:target="_blank" rel="noopener"} (PDFs) of normal distributions, observing how adjustments to the parameters of these distributions, such as mean and variance, influence their probability density functions. I started with two-dimensional plotting, exploring normal distributions of single variables ("univariate" normal distributions). But much more interesting was rendering three-dimensional probability density functions of bivariate normal distributions, where parameter adjustments to the distributions of two variables stretch and squish the resultant 3D surfaces.

## Univariate Normal Distribution

Starting in two-dimensions, we can observe what happens when adjustments are made to the mean and standard deviation of a univariate normal distribution. A general form of the PDF function can be defined:

```python
def PDF_normal(x, mu, sigma):
    '''
    General form of probability density function of univariate normal distribution
    '''
    return math.exp(-((x-mu)**2)/(2*sigma**2))/(sigma*math.sqrt(2*math.pi))
```

### Adjustments to Mean

Inheriting from the manim's ```Scene``` class, we can start constructing the first animation. A ```ValueTracker``` is defined to track that value of ```mu```, the normal distribution's mean.

```python
class AdjustMu(Scene):
    '''
    Scene to observe how adjustments to the mean of a normal distrubtion
    influences the shape of its probability density function
    '''

    def construct(self):
        ax = Axes(
            x_range = [-5, 5, 1],
            y_range = [0, 0.5, 0.1],
            axis_config = {'include_numbers':True}
        )

        # Initialize mu (distribution mean) ValueTracker to 0
        mu = ValueTracker(0)
```

Then, Latex text is defined and positioned in the scene. Note that this code would be a continuation of the ```construct``` function and the indentation should align accordingly:

```python
# Text to display distrubtion mean
mu_text = MathTex(r'\mu = ').next_to(ax, UP, buff=0.2).set_color(YELLOW)
# Always redraw the decimal value for mu for each frame
mu_value_text = always_redraw(
    lambda: DecimalNumber(num_decimal_places=2)
    .set_value(mu.get_value())
    .next_to(mu_text, RIGHT, buff=0.2)
    .set_color(YELLOW)
)
```

Notice that ```mu_value_text``` uses ```always_redraw()``` to ensure that the content is redrawn each frame, allowing for continuous animation. The line ```.set_value(mu.get_value())``` continuously grabs the current value for ```mu``` to write it in as a ```DecimalNumber```.

The ```always_redraw()``` function is used again to continuously animate the actual PDF curve:

```python
# Define PDF curve, always redraw for each frame
    curve = always_redraw(
        lambda: ax.plot(
            lambda x: PDF_normal(x, mu.get_value(), 1), color=YELLOW)
    )
```

The animation is all set up now. The actual animation visuals are then written, using ```mu.animate.set_value()``` to animate adjustments to ```mu```:

```python
# Start animation
self.add(ax, mu_text, mu_value_text)
self.play(Create(curve))
self.play(
    mu.animate.set_value(2), run_time=1,
    rate_func=rate_functions.smooth
)
self.wait()
self.play(
    mu.animate.set_value(-2), run_time=1.5,
    rate_func=rate_functions.smooth
)
self.wait()
self.play(
    mu.animate.set_value(0), run_time=1,
    rate_func=rate_functions.smooth
)
self.play(Uncreate(curve))
```

This is the resultant animation:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/YwtRSOt.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```AdjustMu``` 2D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/univariate.py#L12){:target="_blank" rel="noopener"}.


### Adjustments to Standard Deviation
A very similar approach can be taken to animate adjustments to the normal distribution's standard deviation. A different ```ValueTracker()``` can be initialized with:

```python
# Initialize sigma (distribution standard deviation) ValueTracker to 1
sigma = ValueTracker(1)
```

Different Latex is defined to animate the decimal number text, and the curve function is now:

```python
# Define PDF curve, always redraw for each frame
curve = always_redraw(
    lambda: ax.plot(
        lambda x: PDF_normal(x, 0, sigma.get_value()), color=YELLOW)
)
```

After writing out a few adjustments to ```sigma```, the resultant animation is:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/ZSt6loI.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```AdjustSigma``` 2D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/univariate.py#L64){:target="_blank" rel="noopener"}.


## Bivariate Normal Distribution

The bivariate normal distribution is a joint probability distribution of *two* variables that obey the normal distribution. These variables, say ```x_1``` and ```x_2```, each have their own mean and standard deviation. The correlation between the two variables, *ρ* (```rho```), is also accounted for.

The general PDF of the bivariate normal distribution can be written as:

![Bivariate Standard](/img/posts/2021/11-24_bivariate-normal.svg)

where *µ* (```mu```) represents the variable mean, *σ* (```sigma```) represents the variable standard deviation, and *ρ* (```rho```) represents the correlation between the two variables (-1 < *ρ* < 1).

In Python, this can be defined as:

```python
def PDF_bivariate_normal(x_1, x_2, mu_1=0, mu_2=0, sigma_1=1, sigma_2=1, rho=0):
    '''
    General form of probability density function of bivariate normal distribution
    '''
    normalizing_const = 1/(2 * math.pi * sigma_1 * sigma_2 * math.sqrt(1 - rho**2))
    exp_coeff = -(1/(2 * (1 - rho**2)))
    A = ((x_1 - mu_1)/sigma_1)**2
    B = -2 * rho * ((x_1 - mu_1)/sigma_1) * ((x_2 - mu_2)/sigma_2)
    C = ((x_2 - mu_2)/sigma_2)**2

    return normalizing_const * math.exp(exp_coeff*(A + B + C))
```

The ```PDF_bivariate_normal``` function can be used in three-dimensional ```manim``` renderings. Instead of inheriting from the ```Scene``` class, you can inherit from the ```ThreeDScene``` class and use ```ThreeDAxes```:

```python
class StandardBivariateNormal(ThreeDScene):
    '''
    Plots the surface of the probability density function of the standard
    bivariate normal distribution
    '''

    def construct(self):
        ax = ThreeDAxes(
            x_range = [-4, 4, 1],
            y_range = [-4, 4, 1],
            z_range = [0, 0.2, 0.1]
        )
        x_label = ax.get_x_axis_label(r'x_1')
        y_label = ax.get_y_axis_label(r'x_2', edge=UP, buff=0.2)
        z_label = ax.get_z_axis_label(r'\phi(x_1, x_2)', buff=0.2)
        axis_labels = VGroup(x_label, y_label, z_label)
```

### Standard Bivariate Normal
Note the default argument values for  ```PDF_bivariate_normal```; these represent the standard normal bivariate distribution where the two variables are fully independent. To animate this surface in ```manim```, a ```Surface``` object can be defined with:

```python
distribution = Surface(
    lambda u, v: ax.c2p(u, v, PDF_bivariate_normal(u, v)),
    resolution=(42, 42),
    u_range=[-3.5, 3.5],
    v_range=[-3.5, 3.5],
    fill_opacity=0.7
)
```

After coloring the surface with a cool-to-hot color ramp and animating adjustments to the camera angles, the resultant animation is:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/nI3R0jK.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```StandardBivariateNormal``` 3D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/bivariate.py#L27){:target="_blank" rel="noopener"}.


### Adjustments to Means

Similarly to the value adjustments made in the univariate normal distribution animations, ```ValueTracker``` objects can be used to animate adjustments to the surface. For example, to animate adjustments to the means of each variable:

```python
# Initialize ValueTrackers to adjust means
mu_1 = ValueTracker(0)
mu_2 = ValueTracker(0)
```

Then adjustments to both ```mu_1``` and ```mu_2``` can be made to see how each influences the resultant PDF surface:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/1bmRLaA.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```AdjustMu``` 3D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/bivariate.py#L77){:target="_blank" rel="noopener"}.

### Adjustments to Standard Deviations

Animations that alter values for ```sigma_1``` and ```sigma_2``` demonstrate how the standard deviations of each variable in the distribution play off each other to squeeze and stretch the surface:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/V1qzCsD.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```AdjustSigma``` 3D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/bivariate.py#L202){:target="_blank" rel="noopener"}.

### Adjustments to Correlation

Adjustments to the correlation value ```rho``` produce interesting results too, where correlations squeeze the surface and pull it at 45-degree angles:

<video loop="loop" autoplay="autoplay" controls>
  <source src="https://i.imgur.com/9IMDDmH.mp4" type="video/mp4" />
  Unfortunately your browser does not support the video tag.
</video>

See the full code for the [```AdjustRho``` 3D scene on GitHub](https://github.com/t-ott/manim-normal-distributions/blob/master/bivariate.py#L347){:target="_blank" rel="noopener"}.

## Closing Thoughts

Animations produced with ```manim``` can foster some visual intuition for complicated math concepts. Animating probability density functions can help demonstrate how normal distribution parameters influence the probability of certain value. These animations could easily be tweaked to represent real datasets, perhaps comparing empirical observations to the theoretical PDF surface. Picture a bunch of floating data points around a one of these three dimensional "bell curves"!

Prefer interactive visuals? [Here's a cool interactive bivariate distribution on geogebra prepared by Dovid Fein](https://www.geogebra.org/m/xch5fwrd){:target="_blank" rel="noopener"}.
