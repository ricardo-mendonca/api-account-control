import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Usuários - SignIn', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'signIn@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        accessToken = signInRes.body.accessToken;
    });

    beforeAll(async () => {
        await testServer
            .post('/cadastrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: 'Jorge',
                senha: '123456',
                email: 'jorge@gmail.com',
            });
    });

    it('Faz login', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '123456',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });
    it('Senha errada', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '1234567',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Email errado', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '123456',
                email: 'jorgeeeeeee@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Formato de email inválido', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '123456',
                email: 'jorge gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
    it('Senha muito pequena', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '12',
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
    it('Não informado a senha', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                email: 'jorge@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
    it('Não informado email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                senha: '123456',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
});