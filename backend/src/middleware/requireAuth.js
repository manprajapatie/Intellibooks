import { getAuth } from "@clerk/express";

export const requireAuth = (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    return res.status(401).json({
      message: "Unauthorized. Please sign in."
    });
  }

  req.userId = userId;

  next();
};