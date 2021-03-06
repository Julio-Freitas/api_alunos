import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../modlues/Alunos';
import User from '../modlues/Users';
import Foto from '../modlues/Fotos';

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
