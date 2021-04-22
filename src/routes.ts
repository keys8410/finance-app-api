import { Router } from 'express';
import { uploads } from './config/multer';
import AuthController from './controller/AuthController';
import CategoriaController from './controller/CategoriaController';
import CorCategoriaController from './controller/CorCategoriaController';
import LancamentoController from './controller/LancamentoController';
import UsuarioController from './controller/UsuarioController';
import authMiddleware from './middleware/authMiddleware';
import salvarCategoriaValidator from './validator/categoria.validator';
import {
  editarCorCategoriaValidator,
  salvarCorCategoriaValidator,
} from './validator/corCategoria.validator';
import salvarLancamentoValidator from './validator/lancamento.validator';
import salvarUsuarioValidator from './validator/usuario.validator';
require('dotenv').config();

const router = Router();

router.use(authMiddleware);

/** usuário */
router.get(
  `${process.env.API}/usuario/lancamentos`,
  UsuarioController.listarLancamentosUsuarioTodos
);
router.get(
  `${process.env.API}/usuario/lancamento/:id`,
  UsuarioController.listarLancamentoUsuarioDetalhes
);
router.get(
  `${process.env.API}/usuario/stats/categoria`,
  UsuarioController.estatisticasCategoria
);
router.get(
  `${process.env.API}/usuario/stats/data`,
  UsuarioController.estatisticasData
);

router.delete(`${process.env.API}/usuario/:id`, UsuarioController.deletar);

/** categoria */
router.post(
  `${process.env.API}/categoria`,
  salvarCategoriaValidator,
  uploads.single(`file`),
  CategoriaController.salvar
);
router.get(
  `${process.env.API}/categorias`,
  CategoriaController.listarCategorias
);
router.get(
  `${process.env.API}/categoria/:categoriaId/detalhes`,
  CategoriaController.listarCategoriaDetalhes
);

router.post(
  `${process.env.API}/categoria/:categoriaId/cor`,
  CategoriaController.buscarUm,
  salvarCorCategoriaValidator,
  CorCategoriaController.salvar
);

router.patch(
  `${process.env.API}/categoria/:categoriaId/cor`,
  CategoriaController.buscarUm,
  editarCorCategoriaValidator,
  CorCategoriaController.editar
);

/** lançamento */
router.post(
  `${process.env.API}/lancamento`,
  CategoriaController.buscarUm,
  salvarLancamentoValidator,
  LancamentoController.salvar
);
router.patch(
  `${process.env.API}/lancamento/:id`,
  salvarLancamentoValidator,
  CategoriaController.buscarUm,
  LancamentoController.editar
);
router.get(`${process.env.API}/lancamento/:id`, LancamentoController.listarUm);
router.delete(
  `${process.env.API}/lancamento/:id`,
  LancamentoController.deletarUm
);
router.delete(
  `${process.env.API}/lancamentos`,
  LancamentoController.deletarVarios
);

/** autenticação de usuário */
router.post(`${process.env.API}/auth/sign-in`, AuthController.autenticacao);
router.post(
  `${process.env.API}/auth/sign-up`,
  salvarUsuarioValidator,
  UsuarioController.salvar
);

export default router;
