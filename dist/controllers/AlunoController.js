"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Alunos = require('../modlues/Alunos'); var _Alunos2 = _interopRequireDefault(_Alunos);
var _Fotos = require('../modlues/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);
class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Alunos2.default.findAll({
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'ASC'],
          [_Fotos2.default, 'id', 'DESC'],
        ],
        include: {
          model: _Fotos2.default,
          attributes: ['id', 'originalname', 'filename', 'url'],
        },
      });
      if (alunos.length > 0) {
        return res.status(200).json(alunos);
      }
      res.status(200).json({
        menssage: 'Nenhum aluno foi cadastrando ainda!',
      });
    } catch (error) {
      this.messageErros();
    }
  }

  async create(req, res) {
    try {
      await _Alunos2.default.create(req.body);
      res.status(200).json({
        sucess: 'Aluno criado com sucesso!',
      });
    } catch (resErr) {
      this.messageErros();
    }
  }

  async updated(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          erros: ['Falta ID'],
        });
      }
      const aluno = await _Alunos2.default.findByPk(Number(id));

      if (!aluno) {
        return res.status(400).json({
          erros: ['Aluno não encontrado'],
        });
      }

      await aluno.update(req.body);
      res.status(200).json(aluno);
    } catch (resErr) {
      this.messageErros();
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erros: ['Falta id'] });
      }
      const aluno = await _Alunos2.default.findByPk(Number(id), {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [[_Fotos2.default, 'id', 'DESC']],
        include: {
          model: _Fotos2.default,
          attributes: ['id', 'originalname', 'filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({ erros: ['Aluno não encontrado'] });
      }
      return res.status(200).json(aluno);
    } catch (error) {
      this.messageErros();
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erros: ['Falta id'] });
      }
      const aluno = await _Alunos2.default.findByPk(Number(id));

      if (!aluno) {
        return res.status(400).json({ erros: ['Aluno não encontrado'] });
      }
      aluno.destroy();
      return res.status(400).json({
        sucesso: 'Aluno deletado com sucesso!',
      });
    } catch (error) {
      this.messageErros();
    }
  }

  messageErros(arrayErros) {
    const erros = arrayErros.errors.map((err) => err.message);
    return res.status(400).json(erros);
  }
}

exports. default = new AlunoController();
