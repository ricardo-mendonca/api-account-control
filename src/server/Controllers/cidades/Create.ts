import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ICidade } from '../../database/models';
import { validation } from '../../shared/middleware';

interface IBodyProps extends Omit<ICidade,'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    return res.status(StatusCodes.CREATED).json(12);
};

/* exemplo de IFilter

interface ICidade {
    nome: string;
    estado: string;
}
interface IFilter {
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(2),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().required().min(3),
    })),
}));
*/