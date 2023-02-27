import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Pessoas - UpdateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'getById_pessoas@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        accessToken = signInRes.body.accessToken;
    });

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Teste' });

        cidadeId = resCidade.body;
    });

    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucaupdate@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                nome: 'Juca',
                sobrenome: 'Silva',
                email: 'jucaupdates@gmail.com',
            });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {
        const res1 = await testServer
            .put('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'juca@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva',
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});