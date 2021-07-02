import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    const params = {
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail ja está sendo usado!',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido.',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        validate: {
          isInt: {
            msg: 'Idade precisa ser um número inteiro',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: null,
        validate: {
          isFloat: {
            msg: 'Peso precisa ser um número inteiro ou flutuante',
          },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: null,
        validate: {
          isFloat: {
            msg: 'Altura precisa ser um número inteiro ou flutuante',
          },
        },
      },
    };

    /** init's model */
    super.init(params, {
      sequelize,
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
