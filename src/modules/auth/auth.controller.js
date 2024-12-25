import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middleware/handleError.js";
import { customError } from "../../utils/customError.js";
import { verifyEmail } from '../../mails/mail.verify.js';

const signUp = catchError(async(req , res , next)=>{
    const{email} = req.body
    const userExist = await userModel.findOne({email})
    if(userExist) return next(new customError('This email alreday used' , 401))
    const result = new userModel(req.body)
    await result.save()
    verifyEmail({email})
    res.status(201).json({message:'User added successfully' , result})
})

const login = catchError(async(req , res , next)=>{
    const {email , password} = req.body
    const emailExist = await userModel.findOne({email})
    const passMatch = await bcrypt.compare(password , emailExist.password)
    if(emailExist && passMatch){
        const token = jwt.sign({email:emailExist.email , name:emailExist.name , userId:emailExist._id , role:emailExist.role} , process.env.JWT_SECRET_KEY)
        res.status(201).json({message:'Welcome To Realestate' , token})
    }
    return next(new customError('Email or password not correct' , 404))
})

const protectedRoutes = catchError(async(req , res , next)=>{
    const {token} = req.headers
    if(!token) return next(new customError('Token not valid' , 401))
    const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
    const user = await userModel.findById(decode.userId)
    if(!user) return next(new customError('You not authorized to this point' , 401))
    if(user.passwordChangedAt > decode.iat) return next(new customError('Token not valid' , 401))
    req.user = user
    next()
})

const allowedTo = (...roles)=>{
    return catchError(async(req , res , next)=>{
        if(!roles.includes(req.user.role)){
            return next(new customError('You cannot acess this point' , 401))
        }
        next()
    })
}

export{
    signUp,
    login,
    protectedRoutes,
    allowedTo
}