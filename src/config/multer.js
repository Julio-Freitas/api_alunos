import multer from 'multer';
import { resolve, extname } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype))
      return cb(null, true);

    return cb(new multer.MulterError('Arquivo  precisa ser PNG ou JPG'));
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve('images', __dirname, '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}_${extname(file.originalname)}`);
    },
  }),
};
