"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Alunos = require('../modlues/Alunos'); var _Alunos2 = _interopRequireDefault(_Alunos);

class HomeController {
  async index(req, res) {
    const novoALuno = await _Alunos2.default.create({
      nome: 'Julio Cesar ',
      sobrenome: 'Lemos De freitas',
      email: 'juliO@llive.com',
      idade: 37,
      peso: 85.6,
      altura: 1.75,
    });
    res.json(novoALuno);
  }
}

exports. default = new HomeController();
