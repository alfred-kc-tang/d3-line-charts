# [Force-Directed Graph](https://alfred-kctang.github.io/pca-crime/)

This project demonstrates how a force-directed graph with various features is created using the visualization library, D3.

## Table of Contents

* [Features](#features)
* [License](#license)

## Features

* The styling of edges differs by the value of the edge: if 0, the edge is black, thin and dashed; if 1, the edge is green, thick and solid.
* The radius of each node is scaled based on the degree of the node. The nodes with the more degree are colored darker red, the nodes with less degree are colored lighter red.
* Each node can be dragged by the user. When it is dragged by the user, its label moves along with it.
* Each node can be pinned by the user by double-clicking. Pinned nodes have thicker border than unpinned ones, and they are no longer modified by the graph layout algorithm as they were initially. Pinned nodes can still be dragged around by the user.
* Each pinned node can be unpinned by the user by double-clicking again.

## License

This repository is covered under the [MIT License](https://github.com/alfred-kctang/d3-force-directed-graph/blob/master/LICENSE).
