import { ETableNames } from '../../ETableNames';
import { ICategoria } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, categoria: ICategoria, usuarioId: number): Promise<void | Error> => {
    try {

        const result = await Knex(ETableNames.categoria)
            .update(categoria)
            .where('id', '=', id)
            .andWhere('usuarioId', '=', usuarioId);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};