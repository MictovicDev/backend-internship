import express from "express";
import { getCoins, convertCrypto, convertCoins } from "../controllers/coinsController.js";

const router = express.Router();


router.get("/coins", getCoins);
router.post("/coins", convertCoins);
router.post("/crypto", convertCrypto);


export default router;