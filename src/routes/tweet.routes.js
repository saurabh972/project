import { Router } from "express";
import { addTweet } from "../controllers/tweet.controller.js";

const router = Router();


router.route("/").post(addTweet)

export default router