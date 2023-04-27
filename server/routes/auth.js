import  express  from "express";
import { signin, signup} from "../controllers/auth.js";

const router =express.Router();

//Signup
router.post("/signup",signup)

//Signin
router.post("/signin",signin)

//Google Auth
router.post("/google")



export default router