import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';
import {CidadesController} from './../Controllers';

const router = Router();


router.get('/', (_, res) => {
    return res.send('Olá Curioso');
});

router.post('/cidades', CidadesController.create);



export { router };