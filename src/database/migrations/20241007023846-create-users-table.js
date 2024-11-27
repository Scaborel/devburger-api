/** @type {import('sequelize-cli').Migration} */

/*module.exports = { 
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {*/

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("users");
};

/*async down(queryInterface) {
  await queryInterface.dropTable("users");
},*/



/*
Para rodar a migrate criada digita: yarn sequelize db:migrate => método up.
Para desfazer => método down, digita-se: yarn sequelize db:migrate:undo (para desfazer última alteração) ou
yarn sequelize db:migrate:undo:all (desfaz todas as tables, de baixo para cima).
*/