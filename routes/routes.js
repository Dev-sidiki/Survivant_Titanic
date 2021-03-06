import express from "express";
import InscriptionController from "../controllers/inscription.js";
import LoginController from "../controllers/login.js";
import LogoutController from "../controllers/logout.js";
import AboutController from "../controllers/about.js";
import { AnalysePassengersController } from "../controllers/passengers.js";
import {
  CreateUserController,
  LoginUserController,
} from "../controllers/user.js";
import DashboardController from "../controllers/dashboard.js";
import { authMiddleware } from "../middlewares.js";

const router = express.Router();
router.get("/", AboutController);
router.get("/inscription", InscriptionController);
router.get("/login", LoginController);
router.get("/logout", LogoutController);
router.get("/dashboard", authMiddleware, DashboardController);

router.post("/inscription", CreateUserController);
router.post("/login", LoginUserController);
// on appel le middleware dans le post dashboard pour garder la session utilisateur
router.post("/dashboard", authMiddleware, AnalysePassengersController);
export default router;
