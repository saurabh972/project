import mongoose ,{Schema} from "mongoose";

const tweetSchema = new Schema(
    {
        owenr:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        content:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const Tweet = mongoose.model("Tweet",tweetSchema)