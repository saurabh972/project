import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    addComment,
    deleteComment, 
    getVideoComment,
    updateComment 
} from "../controllers/comment.controller.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this fil

router.route("/:videoId").get(getVideoComment);
router.route("/:videoId").post(addComment)
router.route("/:commentId").delete(deleteComment);
router.route("/:commentId").patch(updateComment);

export default router;