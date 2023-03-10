import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CategoriasProvider } from '../../database/providers/categoria';
import { validation } from '../../shared/middleware';
import { ICategoria } from '../../database/models';


interface IParamProps {
    id?: number;
}

interface IBodyProps extends ICategoria { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        descricao: yup.string().required().min(3),
        ativo: yup.string().required(),
        usuarioId: yup.number().notRequired(),
    })),

    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }
    const usuarioId = Number(req.headers.idUsuario);

    const result = await CategoriasProvider.updateById(req.params.id, req.body, usuarioId);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};