import express, { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
