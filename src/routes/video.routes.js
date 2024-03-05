import { Router } from "express";
import { getAllVideos, getVideoById, publishVideo, updateVideo } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.route("/get-all-video").get(getAllVideos)

router.route("/publish-video").post( 
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        }, 
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideo
)

router.route("/c:videoId").get(getVideoById)
// .patch(upload.single("thumbnail"), updateVideo);
router.route("/c:videoId").patch(upload.single("thumbnail"),updateVideo)

export default router;