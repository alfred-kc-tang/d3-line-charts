# [Line Charts using D3](https://alfred-kctang.github.io/d3-line-charts/)

This project demonstrates how line charts with various characteristics are created using the visualization library, D3.

## Table of Contents

* [Characteristics](#characteristics)
* [License](#license)

## Characteristics

* The bottom three line charts are variants of the first line chart, which shows the number of worldwide earthquakes from 2000 to 2015 separated into four magnitude ranges.
* The sizes of the circles in the second, third and fourth line charts are proportional to estimated deaths from the data.
* The vertical scale of the third line chart is in square root scale.
* The vertical scale of the fourth line chart is in log scale.

We may want to use nonlinear scales such as square root and log when: (1) there is a skewness towards large values, where some data points are much larger than the bulk of the data, i.e. the numbers of earthquakes in "5_5.9"; (2) we want to visualize the percent change or multiplicator factors.

## License

This repository is covered under the [MIT License](https://github.com/alfred-kctang/d3-force-directed-graph/blob/master/LICENSE).
