import { findUserByClerkId } from "../repositories/contractRepository.js";

export const requireAdmin = async (req, res, next) => {
    try {
        const user = await findUserByClerkId(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access denied. Admin permission required.",
            });
        }

        req.dbUser = user;

        next();
    } catch (error) {
        console.error("Admin authorization error:", error);

        return res.status(500).json({
            message: "Unable to verify admin permissions.",
        });
    }
};