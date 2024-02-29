import { Router } from "express";
import { getAllVideos } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/get").get(getAllVideos);

export default router;