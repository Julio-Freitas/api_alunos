import multer from 'multer';
import multerConfig from '../config/multer';
import Foto from '../modlues/Fotos';
import Alunos from '../modlues/Alunos';

class FotoController {
  constructor() {
    this.uploadMulter = multer(multerConfig).single('fotos');
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

        const hasAluno = await Alunos.findByPk(Number(objeFotos.aluno_id));
        if (!hasAluno) {
          return res.status(400).json({
            erros: ['Aluno não encontrado para salva está foto!'],
          });
        }
        const fotoSaved = await Foto.create(objeFotos);
        return res.status(200).json(fotoSaved);
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  }
}

export default new FotoController();
