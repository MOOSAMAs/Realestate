import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true,
        trim:true,
        minLength:2
    },
    price:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:['house' , 'apartment']
    },
    area:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        maxLength:300
    },
    images:{
        type:[String],
        required:true
    },
    backgroundImage:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
} , {
    timestamps:true
})

const propetiesModel = mongoose.model('properties' , propertiesSchema)