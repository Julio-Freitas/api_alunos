import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {
  static init(sequelize) {
    const model = {
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio!',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio!',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.appUrl}/images/${this.getDataValue('filename')}`;
        },
      },
    };

    super.init(model, { sequelize });

    return this;
  }

  static associate(model) {
    this.belongsTo(model.Aluno, { foreignKey: 'aluno_id' });
  }
}
