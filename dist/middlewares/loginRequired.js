"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _tokenizer = require('sucrase/dist/parser/tokenizer');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Users = require('../modlues/Users'); var _Users2 = _interopRequireDefault(_Users);

exports. default = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        erros: ['Precisa fazer login'],
      });
    }
    const [, token] = authorization.split(' ');
    const { id, email } = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const findUser = await _Users2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!findUser) {
      return res.status(401).json({
        erros: ['Usuário está inválido!'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      erros: ['Token expirou ou está inválido!'],
    });
  }
};
