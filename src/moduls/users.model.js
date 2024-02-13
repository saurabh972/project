import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            loercase:true,
            trim:true,
            index:true
        }, 
        email:{
            type:String,
            required:true,
            unique:true,
            loercase:true,
            trim:true,
        }, 
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        }, 
        avatar:{
            type:String,//cloudinary url
            required:true,
        },
        coverImage:{
            type:String 
        },
        watchHistory:[
            {
                 type: Schema.Types.ObjectId,
                 ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

//password hash
userSchema.pre("save",async function(next){
    if(!this.modified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})

//create custom method for check password
userSchema.methods.isPasswordCorrct = async function(password){
    return await bcrypt.compare("password",this.password)
}

//generate token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}

//refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema)