import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number, usuarioId: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.categoria)
            .where('id', '=', id)
            .andWhere('usuarioId', '=', usuarioId)
            .del();

        if (result > 0) return;

        return new Error('Erro ao apagar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao apagar o registro');
    }
};
