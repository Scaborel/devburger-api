//Quarto arquivo a ser criado.

/**Métodos padrão de controllers:
 
 * store => cadastrar/adicionar
 * index => listar vários
 * show => listar um
 * update => atualizar
 * delete => deletar
 */
/* yup serve pra validar dados, por ex.: acusar se for cadastrar email duplicado.*/

import { v4 } from 'uuid';

import * as yup from 'yup';

import User from '../models/User';

class UserController {
	async store(request, response) {
		//projeto da API.
		const schema = yup.object({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(6).required(),
			admin: yup.boolean(),
		});
		//{abortEarly: false}, acusa todos os erros existentes.
		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name, email, password, admin } = request.body;

		const userExists = await User.findOne({
			// vai vreificar se o email ja existe e vai retornar uma mensagem.
			where: {
				email,
			},
		});

		if (userExists) {
			return response.status(400).json({ error: 'User already exists' }); //Aqui para o fluxo da aplicação.
		}

		const user = await User.create({
			id: v4(),
			name,
			email,
			password,
			admin,
		});

		return response.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		});
	}
}

export default new UserController();
