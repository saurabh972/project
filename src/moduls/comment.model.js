import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
        content:{
            type:String,
            required:ture,
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate);//add plugin
export const Comment = mongoose.model('Comment',commentSchema)
