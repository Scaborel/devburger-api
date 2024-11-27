import * as yup from "yup";
import User from "../models/User";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPasswordIncorrect = () => {
      //primeiro vai validar se email é formato email e
      return response //acho que faltou o return aqui, por isso quebrou.//se a senha tem no mínimo 6 caracteres.
        .status(401)
        .json({ error: "Make sure your email or password are correct" });
    };

    if (!isValid) {
      //se não estão nos formatos especificados, mandar msg de erro.
      return emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email, //aqui vai procurar um email já cadastrado.
      },
    });

    if (!user) {
      //achou email cadastrado manda msg de erro.
      return emailOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);
    //aqui vai checar se a senha já é cadastrada.
    if (!isSamePassword) {
      //se já for cadastrada manda msg erro.
      return emailOrPasswordIncorrect();
    }

    return response.status(201).json({
      //Aqui vai cadastrar se estiver tudo certo, email e senha únicas.
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController(); /**/
