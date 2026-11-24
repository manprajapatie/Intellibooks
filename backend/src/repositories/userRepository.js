import { db } from "../prisma/db.js";

export const syncUser = async (clerkUserId, email) => {
    const user = await db.orm.public.User.upsert({
        create: {
            clerkUserId,
            email,
        },

        update: {
            email,
        },

        conflictOn: {
            clerkUserId,
        },
    });

    return user;
};