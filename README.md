# Weathery

Weather application with dynamic backgrounds created using HTML, CSS, JavaScript, Bootstrap, Rust, Node.js, and WebAssembly. It calls the OpenWeatherMap API to get the weather information and is compiled through the Second State Virtual Machine (SSVM) using Docker. This app calls Rust functions in SSVM from JavaScript. You can check it out in the video below. This application was created by myself and submitted to the Hack the 6ix 2020 hackathon. [Devpost Link to Submission](https://devpost.com/software/weathery)

## Prerequisites

If you have not done so already, follow these simple instructions to [install Rust, Node.js, SSVM, and ssvmup](https://www.secondstate.io/articles/setup-rust-nodejs/).

## Build the application

```
$ ssvmup build
```

## Start the node.js server

```
$ cd node
$ node server.js
Listening at http://localhost:8080
```

Then, go to `http://localhost:8080` in your browser to test out the weather app.

## Video

[![Weathery: Hack The 6ix 2020](http://img.youtube.com/vi/D3IwIw-ezSI/0.jpg)](http://www.youtube.com/watch?v=D3IwIw-ezSI "Weathery: Hack The 6ix 2020")

