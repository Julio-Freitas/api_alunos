"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Fotos = require('../modlues/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);
var _Alunos = require('../modlues/Alunos'); var _Alunos2 = _interopRequireDefault(_Alunos);

class FotoController {
  constructor() {
    this.uploadMulter = _multer2.default.call(void 0, _multer4.default).single('fotos');
  }

  async upload(req, res) {
    return this.uploadMulter(req, res, async (err) => {
      if (err)
        return res.status(400).json({
          erros: [err.code],
        });
      try {
        const { aluno_id } = req.body;

        if (!aluno_id)
          return res.status(400).json({
            erros: ['ID Aluno nao enviado!'],
          });

        const objeFotos = {
          filename: req.file.filename,
          originalname: req.file.originalname,
          aluno_id,
        };

        const hasAluno = await _Alunos2.default.findByPk(Number(objeFotos.aluno_id));
        if (!hasAluno) {
          return res.status(400).json({
            erros: ['Aluno não encontrado para salva está foto!'],
          });
        }
        const fotoSaved = await _Fotos2.default.create(objeFotos);
        return res.status(200).json(fotoSaved);
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  }
}

exports. default = new FotoController();
