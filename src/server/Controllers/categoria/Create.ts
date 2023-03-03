import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { CategoriasProvider } from './../../database/providers/categoria';
import { validation } from '../../shared/middleware';
import { ICategoria } from './../../database/models';


interface IBodyProps extends Omit<ICategoria, 'id'> { }

export const createValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        descricao: yup.string().required().min(3),
        ativo: yup.boolean().required(),
        
    })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    //usuarioId
    req.body.usuarioId = Number(req.headers.idUsuario);

    const result = await CategoriasProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};