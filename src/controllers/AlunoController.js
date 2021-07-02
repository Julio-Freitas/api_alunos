import Alunos from '../modlues/Alunos';
import Foto from '../modlues/Fotos';
class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Alunos.findAll({
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
          [Foto, 'id', 'DESC'],
        ],
        include: {
          model: Foto,
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
      return res.status(400).json(error);
    }
  }

  async create(req, res) {
    try {
      await Alunos.create(req.body);
      res.status(200).json({
        sucess: 'Aluno criado com sucesso!',
      });
    } catch (resErr) {
      return res.status(400).json(error);
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
      const aluno = await Alunos.findByPk(Number(id));

      if (!aluno) {
        return res.status(400).json({
          erros: ['Aluno não encontrado'],
        });
      }

      await aluno.update(req.body);
      res.status(200).json(aluno);
    } catch (resErr) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erros: ['Falta id'] });
      }
      const aluno = await Alunos.findByPk(Number(id), {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [[Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['id', 'originalname', 'filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({ erros: ['Aluno não encontrado'] });
      }
      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erros: ['Falta id'] });
      }
      const aluno = await Alunos.findByPk(Number(id));

      if (!aluno) {
        return res.status(400).json({ erros: ['Aluno não encontrado'] });
      }
      aluno.destroy();
      return res.status(400).json({
        sucesso: 'Aluno deletado com sucesso!',
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  messageErros(arrayErros) {
    const erros = arrayErros.errors.map((err) => err.message);
    return res.status(400).json(erros);
  }
}

export default new AlunoController();
