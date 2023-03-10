import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CategoriasProvider } from '../../database/providers/categoria';
import { validation } from '../../shared/middleware';


interface IParamProps {
    id?: number;
}
export const getByIdValidation = validation(get => ({
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        usuarioId: yup.number().notRequired(),
    })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }
    const usuarioId = Number(req.headers.idUsuario);
    
    const result = await CategoriasProvider.getById(req.params.id, usuarioId);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    return res.status(StatusCodes.OK).json(result);
};