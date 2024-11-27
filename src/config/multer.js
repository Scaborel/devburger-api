import multer from "multer";

import v4 from "uuid";

import {extname, resolve} from "node:path";

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'upload'),
        filename: (req, file, cb) => callbackify(null, v4 + extname(file.originalname)), 
})
}