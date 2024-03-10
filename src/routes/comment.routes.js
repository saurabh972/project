import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment } from "../controllers/comment.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this fil

router.route("/").post(addComment)
