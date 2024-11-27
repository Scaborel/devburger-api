//const express = require('express')
import express from "express";
import { resolve } from "node:path";
//const routes = require('./routes')
import routes from "./routes";
import cors from 'cors';

import "./database";

class App {
  constructor() {
    this.app = express();

    this.app.use(cors()); //Do jeito em que está, libera acesso geral.
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "upload"))
    );
    this.app.use(
      "/category-file",
      express.static(resolve(__dirname, "..", "upload"))
    );
  }
  routes() {
    this.app.use(routes);
  }
}

//module.exports = new App().app
export default new App().app;
