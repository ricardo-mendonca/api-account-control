import { Router } from 'express';
import { CidadesController, PessoasController } from './../Controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá Curioso');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);


export { router };