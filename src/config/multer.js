//Setimo arquivo a ser criado.

import multer from "multer";

import v4 from "uuid";

import { extname, resolve } from "node:path";

export default {
	storage: multer.diskStorage({
		destination: resolve(__dirname, "..", "..", "upload"),
		filename: (req, file, cb) =>
			callbackify(null, v4 + extname(file.originalname)),
	}),
};

//TODO: Fazer upload das imagens para a pasta upload.
//TODO: Atualizar o HTTPie para até a aula 22 da pt-1.
