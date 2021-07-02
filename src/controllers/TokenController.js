import Users from '../modlues/Users';
import jwt from 'jsonwebtoken';

class TokenController {
  async create(req, res) {
    try {
      const { email, password } = req.body; // get data users sends body request

      if (!email || !password)
        throw new Error('Campos email ou senha não podem ficar vazios!');

      // find  user through email
      const findUser = await Users.findOne({
        where: {
          email,
        },
      });

      if (findUser === null) throw new Error('Email ou senha incorretos!');

      const validPassword = await findUser.passwordIsValid(password);

      if (!validPassword) throw new Error('Email ou senha incorretos!'); // check password

      const { id } = findUser;

      // create json web token
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
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

export default new TokenController();
