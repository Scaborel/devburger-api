import { where } from 'sequelize';
import * as Yup from 'yup';
import User from '../models/User';
import Category from './models/product';

class CategoryController {
	async store(request, response) {
		const schema = yup.object({
			name: Yup.string().required(),
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

		const { name } = request.body;

		const categoryExists = await Category.findOne({
			where: {
				name,
			},
		});

		if (categoryExists) {
			return response.status(400).json({ error: 'Category already exists' });
		}

		const { id } = await Category.create({
			name,
			path,
		});
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
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

		const categoryExists = await Category.findByPk(id);

		if (!categoryExists) {
			return response
				.status(400)
				.json({ message: 'Make sure your category ID is correct.' });
		}

		let path;
		if (request.file) {
			path = request.file.filename;
		}

		const { name } = request.body;

		if (name) {
			const categoryNameExists = await Category.findOne({
				where: {
					name,
				},
			});

			//) id !== +id: 0 +id é prar transformar o id em um número, pois só id é uma string que vem do request.params.
			if (categoryNameExists && categoryNameExists.id !== +id) {
				return response.status(400).json({ error: 'Category already exists' });
			}
		}

		await Category.update(
			{
				name,
				path,
			},
			{
				where: {
					id,
				},
			},
		);

		return response.status(200).json();
	}

	async index(request, response) {
		const categories = await Category.findAll();

		return response.json(categories);
	}
}

export default new CategoryController();
