# Weather App With Rust, Node, and WebAssembly

This weather app calls Rust functions in SSVM from JavaScript.

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
