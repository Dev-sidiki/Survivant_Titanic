import express from "express";
const router = express.Router();

import InscriptionController from "../controllers/inscription.js";
import LoginController from "../controllers/login.js";
import LogoutController from "../controllers/logout.js";

router.get("/", InscriptionController);
router.get("/login", LoginController);
router.get("/logout", LogoutController);

export default router;
