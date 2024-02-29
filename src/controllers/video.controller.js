import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Fetch all video")
    )
})

const publishVideo = asyncHandler(async(req,res)=>{
    
})


export{
    getAllVideos
}