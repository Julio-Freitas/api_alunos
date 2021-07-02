"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path');
_dotenv2.default.config();

require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunosRoutes = require('./routes/alunosRoutes'); var _alunosRoutes2 = _interopRequireDefault(_alunosRoutes);
var _fotosRoutes = require('./routes/fotosRoutes'); var _fotosRoutes2 = _interopRequireDefault(_fotosRoutes);

class App {
  constructor() {;App.prototype.__init.call(this);
    this.app = _express2.default.call(void 0, );
    this.middelwares();
    this.routes();
    this._whiteList = ['http://localhost:3000'];
  }

  __init() {this.corsOptions = {
    origin: (origin, callback) => {
      if (this._whiteList.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }}

  middelwares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_cors2.default.call(void 0, this.corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'src', 'uploads')));
  }

  routes() {
    this.app.use('/home', _homeRoutes2.default);
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/token', _tokenRoutes2.default);
    this.app.use('/alunos', _alunosRoutes2.default);
    this.app.use('/fotos', _fotosRoutes2.default);
  }
}

exports. default = new App().app;
