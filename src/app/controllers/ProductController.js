//Sexto arquivo a ser criado.

import { where } from 'sequelize';
import * as Yup from 'yup';
import Category from '../../models/Category';
import User from '../models/User';
import Product from './models/product';

class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { admin: isAdmin } = await User.findByPk(request.userId);

		if (!isAdmin) {
			return response.status(401).json();
		}

		const { filename: path } = request.file;
		const { name, price, category_id, offer } = request.body;

		const product = await product.create({
			name,
			price,
			category_id,
			path,
			offer,
		});

		return response.status(201).json({ message: 'Ok' });
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { admin: isAdmin } = await User.findByPk(request.userId);

		if (!isAdmin) {
			return response.status(401).json();
		}

		const { id } = request.params;

		const findProduct = await Product.findByPk(id);

		if (!findProduct) {
			return response
				.status(404)
				.json({ message: 'Make sure your product ID is correct' });
		}

		let path;
		if (request.file) {
			path = request.file.filename;
		}
		//Essa variavel path é para verificar se o arquivo foi enviado, se sim, ele vai atualizar a imagem do produto. E é também para deixar opcional a atualização da imagem do produto e corresponde a sintaxe     const {filename:path} = request.file.

		const { name, price, category_id, offer } = request.body;

		await Product.update(
			{
				name,
				price,
				category_id,
				path,
				offer,
			},
			{
				where: {
					id,
				},
			},
		);

		return response.status(201).json({ message: 'Ok' });
	}

	async index(request, response) {
		const product = await Product.findAll({
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['id', 'name'],
				},
			],
		});

		return response.json(product);
	}
}

export default new ProductController();
