import { resolve } from 'node:path';
import cors from 'cors';
//const express = require('express'). Sintaxe antes do sucrase.
import express from 'express';
//const routes = require('./routes'). Sintaxe antes do sucrase.
import routes from './routes.js';

import './database';

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
			'/product-file',
			express.static(resolve(__dirname, '..', 'upload')),
		);
		this.app.use(
			'/category-file',
			express.static(resolve(__dirname, '..', 'upload')),
		);
	}
	routes() {
		this.app.use(routes);
	}
}

//module.exports = new App().app. Sintaxe antes do sucrase.
export default new App().app;
