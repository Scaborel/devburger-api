//Segundo arquivo a ser criado.
//Depois de criar o arquivo src/config/database.js, cria o arquivo src/database/index.js e a pasta migrations.

import mongoose from 'mongoose';
import Sequelize from 'sequelize';

import configDatabase from '../config/database.js';

import Category from '../app/models/Category';
import User from '../app/models/User';
import Product from '../app/models/product';

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			.map(
				//Era assim: (model) => model.associate && model.associate(this.connection.models).
				//O Biome sugeriu que corrigisse essa sintaxe para a que está abaixo.
				(model) => model.associate?.(this.connection.models),
			);
	}
	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://localhost:27017/devburger',
		);
	}
}

export default new Database();

//TODO: Parte 1 toda revisada. Agora testar a aplicação.
