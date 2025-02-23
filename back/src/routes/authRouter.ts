import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController";
import authMiddleware from "../middleWare/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", authMiddleware, getCurrentUser);

export default router;
