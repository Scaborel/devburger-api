/*export const dialect = 'postgres';
export const host = 'localhost';
export const port = 5432;
export const username = 'postgres';
export const password = 'postgres';
export const database = 'devburger';
export const define = {
    timestamps: true, //registra quando a coluna foi criada e/ou atualizada.
    underscored: true, //nome das colunas em "snake_case", tudo minusculo separado por underline.
    underscoredAll: true,
};*/

/*Configuração do banco de dados.*/

 module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger',
    define: {
        timestamps: true, //registra quando a coluna foi criada (created_at) e/ou atualizada (updated_at).
        underscored: true, //nome das colunas em "snake_case", tudo minusculo separado por underline.
        underscoredAll: true,
    },
};
 