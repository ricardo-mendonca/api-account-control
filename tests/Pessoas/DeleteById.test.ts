import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - DeleteById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'deleteById-pessoas@gmail.com';
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

    it('Apaga registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cidadeId,
                email: 'jucadelete@gmail.com',
                nome: 'Juca',
                sobrenome: 'Silva',
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar registro que não existe', async () => {
        const res1 = await testServer
            .delete('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});