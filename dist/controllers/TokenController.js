"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Users = require('../modlues/Users'); var _Users2 = _interopRequireDefault(_Users);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async create(req, res) {
    try {
      const { email, password } = req.body; // get data users sends body request

      if (!email || !password)
        throw new Error('Campos email ou senha não podem ficar vazios!');

      // find  user through email
      const findUser = await _Users2.default.findOne({
        where: {
          email,
        },
      });

      if (findUser === null) throw new Error('Email ou senha incorretos!');

      const validPassword = await findUser.passwordIsValid(password);

      if (!validPassword) throw new Error('Email ou senha incorretos!'); // check password

      const { id } = findUser;

      // create json web token
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIREIN,
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({
        erros: error.message,
      });
    }
  }
}

exports. default = new TokenController();
