import { Router } from "express";
import { verifyJWT } from "../middlewires/auth.middlewire.js";
import { CreateShortcode, getAllCollection, getShortcode } from "../controllers/url.controller.js";
import { ReqAdmin } from "../middlewires/isAdmin.middlewire.js";

const router = Router()



router.route("/shorten").post(CreateShortcode)
router.route("/admin/urls").get(verifyJWT,ReqAdmin,getAllCollection)



export default router;