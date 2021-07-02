import User from '../modlues/Users';

class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!!name && !!email && !!password) {
        await User.create({
          name,
          email,
          password,
        });
      }
      return res.status(200).json({
        success: 'Usuário cadastrado com sucesso',
      });
    } catch (e) {
      const erros = e.errors.map(({ message, path }) => ({ message, path }));
      return res.status(400).json({ erros });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      let user = null;
      if (id) {
        user = await User.findByPk(Number(id), {
          attributes: ['id', 'name', 'email'],
        });
      }

      if (user === null || !id || id === undefined) {
        throw new Error('Não foi possivél encontrar este usuário');
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { name, email } = req.body;
      const id = req.userId;

      if (id) {
        await User.update(
          { name, email },
          {
            where: { id: Number(id) },
          }
        );
        return res.status(200).json({
          sucess: 'Dados editados com sucesso!',
        });
      }

      throw new Error('Não foi possivél atuaizar este usuário');
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;

      if (!!id) {
        const findUser = await User.findByPk(Number(id));
        await findUser.destroy();
        return res.status(200).json({
          sucess: `${findUser.name} deletado com sucesso!`,
        });
      }
      throw new Error('Não foi possivél atuaizar este usuário');
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
