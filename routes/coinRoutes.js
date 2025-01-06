import express from "express";
// import protectRoute  from "../middlewares/protectroute.js";
// import {signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile} from "../controllers/userController.js"
import { getCoins, convertCrypto } from "../controllers/coinsController.js";

const router = express.Router();


router.get("/coins", getCoins);
router.post('/convert', convertCrypto);


export default router;