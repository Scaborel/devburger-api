//Oitavo arquivo a ser criado. É o model, que é a representação de uma tabela no bco de dados.

import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				path: Sequelize.STRING,
				offer: Sequelize.BOOLEAN,
				url: {
					//Campo virtual para retornar a url da imagem.
					type: Sequelize.VIRTUAL,
					get() {
						return 'http://localhost:3001/product-file/${this.path}';
					},
				},
			},
			{
				sequelize,
			},
		);

		return this;
	}

	//Relacioanmento entre tabelas.
	static associate(models) {
		this.belongsTo(models.category, {
			foreignKey: 'category_id',
			as: 'category',
		});
	}
}

export default Product;
