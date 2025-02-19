//Terceiro arquivo a ser criado. É o model, que é a representação de uma tabela no bco de dados.
//É a comunicação, o mapeamento, pra saber quais dados a model, o usuário, tem no bco de dados.

import bcrypt from 'bcrypt'; //Isso é pra criptografar a senha.
import Sequelize, { Model } from 'sequelize';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL, //existe somente na aplicação, não vai pro //bco de dados p não ficar visivel.
				password_hash: Sequelize.STRING,
				admin: Sequelize.BOOLEAN,
			},
			{
				sequelize,
			},
		);

		this.addHook('beforeSave', async (user) => {
			//(user) => é uma função de callback, que é chamada antes de salvar no bco de dados. //ou seja, função parametro de outra função.

			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10); //10 é o nível de criptografia.
			}
		});
		return this;
	}

	async checkPassword(password) {
		//aqui vai criptografar a senha.
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
