import Aluno from '../modlues/Alunos';

class HomeController {
  async index(req, res) {
    const novoALuno = await Aluno.create({
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

export default new HomeController();
