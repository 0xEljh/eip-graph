# Ethereum Improvement Protocols Graph Visualization

## About the project

Firebase hosted page has been deployed at [https://eip-graph.web.app/](https://eip-graph.web.app/).

This project was inspired by [PhABC's ehtereum token standards list](https://github.com/PhABC/ethereum-token-standards-list). While using this list to get familiar with token standards, I found myself going back and forth between the standards and the ones that they are related to. This led to the thought that a list might not be the best way capturing ethereum improvement protocools.

 This visualization is intended to help with understanding the various improvements that are proposed in the Ethereum Improvement Proposals (EIPs). I don't believe that anyone working with Ethereum should have to memorize any of the protocols or constantly keep up with them. The goal is have this graph become a tool to support developers to easily retrieve information about the EIPs that they need to work with.

## Features

### EIP Graph

The current approach to establishing relationships between the EIPs is to use their pre-requisites. These pre-requisites are scrapped from [the ethereum organization page on EIPs](https://eips.ethereum.org/). The summary and abstracts are also used to provide a quick overview of the protocol, displayed with a sidebar/menu. The scrapper used can be found in the data folder.
The [d3 force graph library for react used can also be found here](https://github.com/vasturiano/react-force-graph).
Currently, the names of EIPs are only displayed upon mouse hover. Displaying the full names of all the EIPs in the graph appeared to be messy, but there's likely an optimal middle ground to be found between the two. Perhaps in the future, the names will be displayed when the nodes are highlighted.


### Highlighting EIPs

It is currently possible to create a binary colorization of the grpah by selecting a highlight. This is done by selecting a category to highlight from the menu. In the future, multiple types of highlights will be supported: e.g. highlighting only EIPs that are both ERCs and finalized.
