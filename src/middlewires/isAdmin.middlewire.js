import asyncHandler from "../utiles/asyncHandler.js";

export const ReqAdmin = asyncHandler(async (req, res, next) => {
  const isAdmin =
    req.user?.role === "admin" || 
    req.user?.roles?.includes?.("admin"); 


  if (!isAdmin) {
    return res.status(403).json({ message: "Admins only" });
  }


  next();
});

