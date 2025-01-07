import express from "express";
import { getCoins, convertCrypto, convertCoins } from "../controllers/coinsController.js";

const router = express.Router();


router.get("/coins", getCoins);
router.post("/coins/convert", convertCoins);
router.post("/crypto/convert", convertCrypto);


export default router;