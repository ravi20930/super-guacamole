import express, { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import candidateRoutes from "./candidateRoutes";
import { verifyAccessToken } from "../middlewares/auth";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", verifyAccessToken, userRoutes);
router.use("/user", verifyAccessToken, candidateRoutes);

export default router;
