"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype))
      return cb(null, true);

    return cb(new _multer2.default.MulterError('Arquivo  precisa ser PNG ou JPG'));
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, 'images', __dirname, '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}_${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
