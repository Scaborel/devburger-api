//É a comunicação, o mapeamento, pra saber quais dados a model, o usuário, tem no bco de dados.

import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt"; //Isso é pra criptografar a senha.

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //existe somente na aplicação, não vai pro bco de dados.
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      //(user) => é uma função de callback,
      if (user.password) {
        //ou seja, função parametro de outra função.
        user.password_hash = await bcrypt.hash(user.password, 10);
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
