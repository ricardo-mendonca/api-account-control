import { Router } from 'express';
import { ensureAuthenticated } from '../shared/middleware';
import { CategoriaController, CidadesController, PessoasController, UsuariosController, } from './../Controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá Curioso');
});

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);

router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.get('/categoria', ensureAuthenticated, CategoriaController.getAllValidation, CategoriaController.getAll);
router.post('/categoria', ensureAuthenticated, CategoriaController.createValidation, CategoriaController.create);
//router.get('/categoria/:id', ensureAuthenticated, CategoriaController.getByIdValidation, CategoriaController.getById);
//router.put('/categoria/:id', ensureAuthenticated, CategoriaController.updateByIdValidation, CategoriaController.updateById);
//router.delete('/categoria/:id', ensureAuthenticated, CategoriaController.deleteByIdValidation, CategoriaController.deleteById);



export { router };