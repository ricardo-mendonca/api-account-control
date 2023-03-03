import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Categoria - Create', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-Categoria@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        accessToken = signInRes.body.accessToken;
    });


    it('Criar sem usar token de autenticação', async () => {
        const res1 = await testServer
            .post('/categoria')
            .send({
                usuarioId: 1,
                descricao: 'teste de cadastro',
                ativo: '1',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Cria registro', async () => {
        const res2 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId: 1,
                descricao: 'teste de cadastro',
                ativo: '1',
            });

        expect(res2.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res2.body).toEqual('number');
    });
    it('Cadastra registro 2', async () => {
        const res3 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId: 1,
                descricao: 'teste de cadastro',
                ativo: '1',
            });

        expect(res3.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res3.body).toEqual('number');
    });
    it('Tenta criar registro', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId: 1,
                descricao: 'teste de cadastro',
                ativo: '1',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

       
    });
    it('Tenta criar registro com descricao muito curto', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId: 1,
                descricao: 'te',
                ativo: '1',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });
    it('Tenta criar registro sem descricao', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId:1,
                email: 'juca@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });
    it('Tenta criar registro sem descricao', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId:1,
                ativo: '1',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });
   
    it('Tenta criar registro sem usuarioId', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                descricao: 'teste de cadastro',
                ativo: '1',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.usuarioId');
    });
    it('Tenta criar registro com usuarioId inválido', async () => {
        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                usuarioId: 'teste',
                descricao: 'teste de cadastro',
                ativo: '1',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.usuarioId');
    });
    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/categoria')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.usuarioId');
        expect(res1.body).toHaveProperty('errors.body.descricao');
        expect(res1.body).toHaveProperty('errors.body.ativo');
    });
});