import  express  from "express";
import { googleAuth, signin, signup} from "../api/auth.js";

const router =express.Router();

//Signup
router.post("/signup",signup)

//Signin
router.post("/signin",signin)

//Google Auth
router.post("/google",googleAuth)



export default router