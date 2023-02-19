import { Router } from 'express';
import { CidadesController } from './../Controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá Curioso');
});

router.post('/cidades', CidadesController.createValidation, CidadesController.create);

export { router };