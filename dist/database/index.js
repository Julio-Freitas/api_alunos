"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Alunos = require('../modlues/Alunos'); var _Alunos2 = _interopRequireDefault(_Alunos);
var _Users = require('../modlues/Users'); var _Users2 = _interopRequireDefault(_Users);
var _Fotos = require('../modlues/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);

const models = [_Alunos2.default, _Users2.default, _Fotos2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));

models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
