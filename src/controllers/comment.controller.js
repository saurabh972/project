import { Comment } from "../moduls/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addComment = asyncHandler(async(req,res)=>{
    const videoId  = req.params.videoId;
    const {content}= req.body;

    if([content].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"Content field are required")
    }

    const comment = await Comment.create(
        {
            content:content,
            owner :req.user?._id,
            video: videoId.replace(":","")
        }
    );

    //check video added or not
    const createdComment = await Comment.findById(comment._id);
     if(!createdComment){
        throw new ApiError(500 , "Something went adding comment")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,createdComment,"Comment added successfully")
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

export {
    addComment,
    updateComment
}