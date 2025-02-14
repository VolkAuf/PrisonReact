import Router from "express";
import authRouter from "./authRouter";

const router = Router();
router.use("/user", authRouter);

export default router;
