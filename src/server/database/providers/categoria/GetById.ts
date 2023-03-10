import { ETableNames } from '../../ETableNames';
import { ICategoria } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number, usuarioId: number): Promise<ICategoria | Error> => {
    try {
        const result = await Knex(ETableNames.categoria)
            .select('*')
            .where('id', '=', id)
            .andWhere('usuarioId', '=', usuarioId)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
};