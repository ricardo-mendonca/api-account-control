import { ETableNames } from '../../ETableNames';
import { ICategoria } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, categoria: Omit<ICategoria, 'id'>): Promise<void | Error> => {
    try {
        //const [{ count }] = await Knex(ETableNames.usuario)
        //    .where('id', '=', categoria.usuarioId)
        //    .count<[{ count: number }]>('* as count');

        //if (count === 0) {
        //    return new Error('A cidade usada no cadastro não foi encontrada');
        //}

        const result = await Knex(ETableNames.categoria)
            .update(categoria)
            .where('id', '=', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};