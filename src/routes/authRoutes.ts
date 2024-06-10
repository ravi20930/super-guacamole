import express, { Router } from "express";
import { normalSignIn, signUp } from "../controllers/authController";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", normalSignIn);

export default router;
