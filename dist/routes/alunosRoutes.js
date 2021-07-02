"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
const router = new (0, _express.Router)();

router.get('/', _AlunoController2.default.index);
router.post('/', _AlunoController2.default.create);
router.put('/:id', _AlunoController2.default.updated);
router.get('/:id', _AlunoController2.default.show.bind(_AlunoController2.default));
router.delete('/:id', _AlunoController2.default.delete);

exports. default = router;
