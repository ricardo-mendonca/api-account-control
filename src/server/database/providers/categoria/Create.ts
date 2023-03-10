import { ETableNames } from '../../ETableNames';
import { ICategoria } from '../../models';
import { Knex } from '../../knex';


export const create = async (categoria: Omit<ICategoria, 'id'>): Promise<number | Error> => {
    try {

        const [result] = await Knex(ETableNames.categoria)
            .insert(categoria)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }
};