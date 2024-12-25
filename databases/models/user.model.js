import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:2
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    passwordChangedAt:Date,
    profilePic:String,
    isActive:{
        type:Boolean,
        default:true
    },
    birthDate: Date,
    address:String,
    aboutMe:{
        type:String,
        maxLength:100
    },
    confirmedEmail:{
        type:Boolean,
        default:false
    },
    phoneNum:String,
    gender:{
        type:String,
        enum:['male' , 'female']
    },
    role:{
        type:String,
        enum:['user' , 'admin'],
        default:'user'
    },
})

userSchema.pre('save' , function(){
    this.password = bcrypt.hashSync(this.password , 10)
})

userSchema.pre('findOneAndUpdate' , function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 10)
})

userSchema.post('init' , function (doc){
    doc.profilePic = process.env.BASE_URL + "/profileImages/" + doc.profilePic
})

export const userModel = mongoose.model('user' , userSchema)