import { db } from "../prisma/db.js";


export const createMainContract = async (contractData) => {
    return await db.orm.public.MainContract.create(contractData);
};

export const findMainContract = async () => {
    return await db.orm.public.MainContract.all();
};

export const deleteMainContract = async (id) => {
    return await db.orm.public.MainContract
        .whereUnique({ id })
        .delete();
};