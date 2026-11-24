
import { db } from "../prisma/db.js";

export const createContract = async (contractData) => {
  return await db.orm.public.Contract.create(contractData);
};

export const findUserByClerkId = async (clerkUserId) => {
  return await db.orm.public.User
    .whereUnique({ clerkUserId })
    .first();
};

export const findContractById = async (contractId) => {
  return await db.orm.public.Contract
    .whereUnique({ id: contractId })
    .first();
};

export const findContractsByUserId = async (userId) => {
  return await db.orm.public.Contract
    .where({ userId })
    .all();
};

export const deleteContractById = async (contractId) => {
  return await db.orm.public.Contract
    .whereUnique({ id: contractId })
    .delete();
};