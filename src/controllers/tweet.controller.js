import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTweet = asyncHandler(async(req,res)=>{
    //TODO: create tweet

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Tweet add successfully")
    )
})

const updateTweet = asyncHandler(async(req,res)=>{
    //TODO: update tweet

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Tweet Update successfully")
    )
})


export{
    addTweet,
    updateTweet
}