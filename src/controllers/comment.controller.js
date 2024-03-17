import mongoose from "mongoose";
import { Comment } from "../moduls/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getVideoComment = asyncHandler(async(req,res)=>{
     //TODO: get all comments for a video
     const {videoId} = req.params
     console.log(videoId)
     const {page = 1, limit = 10} = req.query

     const pipeline = [
        {
            $match:{
                video: new mongoose.Types.ObjectId(videoId.replace(":",""))
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"userComment",
                pipeline:[
                    {
                        $project:{
                            _id:0,
                            username:1,
                        }
                    }
                ]
            }
        },
        {
            $project: {
               content:1,
               userComment:1
            }
        }
    ];

    // Create an aggregation object
    const aggregation = Comment.aggregate(pipeline);

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        // sort:{
        //     [sortBy] : sortType === 'asc' ? 1 : -1
        // }
    };
 
     // Paginate the results
     const result = await Comment.aggregatePaginate(aggregation, options);
console.log(result );
     return res
     .status(200)
     .json(
         new ApiResponse(200,result,"Comment added successfully")
     )
})

const addComment = asyncHandler(async(req,res)=>{
    const videoId  = req.params.videoId;
    const {content}= req.body;

    if([content].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"Content field are required")
    }

    if(videoId.replace(":","")){
        throw new ApiError(400 , "Video id is required")
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

    const commentId = req.params.commentId;
    if(!commentId.replace(":","")){
        throw new ApiError(400 , "Comment id is required")
    }

    const {content} = req.body;
    if(!content){
        throw new ApiError(400 , "Comment id is required")
    }
  

    const comment = await Comment.findByIdAndUpdate(
        commentId.replace(":",""),
        {
            $set:{
                content:content
            }
        },
        {
            new:true
        }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(200,comment,"Comment update successfully")
    )

})

const deleteComment = asyncHandler(async (req,res)=>{
    const commentId = req.params.commentId;
    if(!commentId.replace(":","")){
        throw new ApiError(400 , "Comment id is required")
    }

    const comment = await Comment.findByIdAndDelete(commentId.replace(":",""))
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,comment,"Comment delete successfully")
    )
})

export {
    getVideoComment,
    addComment,
    updateComment,
    deleteComment
}