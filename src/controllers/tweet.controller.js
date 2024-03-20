import { Tweet } from "../moduls/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTweet = asyncHandler(async(req,res)=>{
    //TODO: create tweet

    const {content} = req.body

    if(!content){
        throw new ApiError(400, "Content field is required");
    }
    const tweet = await Tweet.create(
        {
            content : content,
            owner : req.user?._id
        }
    );

    console.log(tweet);
    const createdTweet = await Tweet.findById(tweet._id);
     if(!createdTweet){
        throw new ApiError(500 , "Something went adding Tweet")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,createdTweet,"Tweet add successfully")
    )
})

const deleteTweet = asyncHandler(async(req,res)=>{

})

const updateTweet = asyncHandler(async(req,res)=>{
    //TODO: update tweet
    const tweetId  = req.params.tweetId;
    const {content}= req.body;
console.log(tweetId);
    if([content].some((field)=>field?.trim()==="")){
        throw new ApiError(400 , "Content field is required")
    }

    if(!tweetId.replace(":","")){
        throw new ApiError(400 , "Tweet id is required")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId.replace(":",""),
        {
            $set:{
                content:content
            }
        },{
            new:true
        }
    ) 

    return res
    .status(200)
    .json(
        new ApiResponse(200,tweet,"Tweet Update successfully")
    )
})


export{
    addTweet,
    updateTweet,
    deleteTweet
}