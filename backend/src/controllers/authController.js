import { clerkClient } from "@clerk/express";
import { syncUser } from "../repositories/userRepository.js";

export const getCurrentUser = async (req, res) => {
    try {
        // Get user details using the verified Clerk user ID
        const clerkUser = await clerkClient.users.getUser(req.userId);

        // Find the primary email
        const primaryEmail = clerkUser.emailAddresses.find(
            (email) => email.id === clerkUser.primaryEmailAddressId
        );

        const email = primaryEmail?.emailAddress;

        if (!email) {
            return res.status(400).json({
                message: "No primary email found in Clerk account",
            });
        }

        // Create or update the user in PostgreSQL
        const user = await syncUser(req.userId, email);

        res.status(200).json({
            message: "User synchronized successfully",
            user: {
                id: user.id,
                clerkUserId: user.clerkUserId,
                email: user.email,
                createdAt: user.createdAt,
            },
        });

    } catch (error) {
        console.error("User synchronization error:", error);

        res.status(500).json({
            message: "Unable to synchronize user",
        });
    }
};