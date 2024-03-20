import { Router } from "express";
import { addTweet, deleteTweet, updateTweet } from "../controllers/tweet.controller.js";

const router = Router();


router.route("/").post(addTweet)
router.route("/:tweetId").patch(updateTweet)
router.route("/:tweetId").delete(deleteTweet)

export default router