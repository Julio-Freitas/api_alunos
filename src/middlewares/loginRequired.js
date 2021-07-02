import { next } from 'sucrase/dist/parser/tokenizer';
import jwt from 'jsonwebtoken';
import Users from '../modlues/Users';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        erros: ['Precisa fazer login'],
      });
    }
    const [, token] = authorization.split(' ');
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    const findUser = await Users.findOne({
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
