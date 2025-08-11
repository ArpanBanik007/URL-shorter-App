import { Router } from "express";
import { verifyJWT } from "../middlewires/auth.middlewire.js";
import { registerUser,
     loginUser, 
     logoutUser,
     getAllUsers, 
    
    
}
 from "../controllers/user.controller.js"; 


import { upload } from "../middlewires/multer.middlewires.js";


const router = Router();

// Register route
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

// Login route
router.route("/login").post( loginUser);


// Logout route
router.route("/logout").post(verifyJWT,logoutUser); 
router.route("/userDetails").get(verifyJWT,getAllUsers); 





export default router;