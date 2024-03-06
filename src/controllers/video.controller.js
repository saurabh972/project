import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../moduls/video.model.js";
import mongoose from "mongoose";


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
    const pipeline = [
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                isPublished: 1,
                videoFile: 1,
                thumbnail: 1,
                owner:1
            }
        }
    ];

    // Create an aggregation object
    const aggregation = Video.aggregate(pipeline);

   
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort:{
            [sortBy] : sortType === 'asc' ? 1 : -1
        }
    };

    // Paginate the results
    const result = await Video.aggregatePaginate(aggregation, options);

    return res
    .status(200)
    .json(
        new ApiResponse(200,result,"Fetch all video")
    )
})

const publishVideo = asyncHandler(async(req,res)=>{

    const {title,description,isPublish}= req.body;

    if([title,description,isPublish].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All field are required")
    }


    const videoFilePath = req.files?.videoFile[0]?.path;
    const thumbnailPath = req.files?.thumbnail[0]?.path;

    if (!videoFilePath || !thumbnailPath) {
        throw new ApiError(400, "Video and thumbnail files are required");
    }

    //upload file in cloudinary
    const videoFile = await uploadOnCloudinary(videoFilePath)
    const thumbnail = await uploadOnCloudinary(thumbnailPath)
  
    if (!videoFile || !thumbnail) {
        throw new ApiError(400, "Error uploading files to Cloudinary");
    }

    const video = await Video.create(
        {
            title:title,
            description:description,
            isPublished:isPublish,
            owner :req.user?._id,
            duration:videoFile?.duration || "",
            videoFile:videoFile?.url || "",
            thumbnail:thumbnail?.url || ""
        }
    );

     //check video added or not
     const createdVideo = await Video.findById(video._id);
     if(!createdVideo){
        throw new ApiError(500 , "Something went worng while upload video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,createdVideo,"Video uploaded")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const videoId  = req.params.videoId;

    if(!videoId){
        throw new ApiError(400 , "Video id is required")
    }

    const video = await Video.findById(videoId.replace(":",""))

    if(!video){
        throw new ApiError(400 , "Video not available")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,video,"Video uploaded")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    //TODO: update video details like title, description, thumbnail
    const { videoId } = req.params;
    if(!videoId){
        throw new ApiError(400 , "Video id is required")
    }

    const {title,description} = req.body;

    if([title,description].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All field are required")
    }
    

    const thumbnailLocalPath = req.file?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400,"Thumbnail file missing")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if(!thumbnail.url){
        throw new ApiError(400,"Error while uploading on cover image")
    }

    const video = await Video.findByIdAndUpdate(
        videoId.replace(":",""),
        {
            $set:{
                title:title,
                description:description,
                thumbnail:thumbnail.url
            }
        },
        {
            new:true
        }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(200,video,"Video uploaded d")
    )
})

const deleteVideo = asyncHandler(async(req,res)=>{
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400 , "Video id is required")
    }

    const video = await Video.findByIdAndDelete(videoId.replace(":",""))
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,video,"Video uploaded d")
    )
})

export{
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo
}