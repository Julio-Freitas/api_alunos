"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Foto extends _sequelize.Model {
  static init(sequelize) {
    const model = {
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio!',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio!',
          },
        },
      },
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appConfig2.default.appUrl}/images/${this.getDataValue('filename')}`;
        },
      },
    };

    super.init(model, { sequelize });

    return this;
  }

  static associate(model) {
    this.belongsTo(model.Aluno, { foreignKey: 'aluno_id' });
  }
} exports.default = Foto;
