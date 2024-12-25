import jwt from "jsonwebtoken"
import { userModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/handleError.js"
import { customError } from "../../utils/customError.js"
import { verifyEmail } from "../../mails/mail.verify.js"


const addUser = catchError(async(req , res , next)=>{
    const{email} = req.body
    const userExist = await userModel.findOne({email})
    if(userExist) return next(new customError('This email alreday used' , 401))
    const result = new userModel(req.body)
    await result.save()
    verifyEmail({email})
    res.status(201).json({message:'User added successfully' , result})
})

const getAllUsers = catchError(async(req , res , next)=>{
    const result = await userModel.find({})
    res.status(201).json({message:'List of users' , result})
})

const getOneUser = catchError(async(req , res , next)=>{
    const {id} = req.params
    const userExist = await userModel.findById(id)
    if(!userExist) return next(new customError('user not found' , 404))
    res.status(201).json({message:'Specific user' , userExist})
})

const verifyMail = catchError(async(req , res , next)=>{
    let {token} = req.params
    jwt.verify(token , process.env.MAIL_SECRET , async (err , decoded)=>{
        if (err) return res.json(err)
        await userModel.findOneAndUpdate({email:decoded.email} , {confirmedEmail:true})
    res.status(201).json({message:'Your email verified successfully'})
    })
})

const userProfile = catchError(async(req , res , next)=>{
    req.body.profilePic = req.file.filename
    const addProfilePic = await userModel.findByIdAndUpdate(req.user._id , req.body , {new:true})
    !addProfilePic && next(new customError('User Not Found' , 404))
    addProfilePic && res.status(201).json({message:'Profile Updated Successfully}' , addProfilePic})
})

const updateUser = catchError(async(req , res , next)=>{
    const result = await userModel.findByIdAndUpdate(req.user._id , req.body , {new:true})
    !result && next(new customError('User not found' , 404))
    result && res.status(201).json({message:'User Updated' , result})
})

const deleteUser = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await userModel.findByIdAndDelete(id)
    !result && next(new customError('User not found' , 404))
    result && res.status(201).json({message:'User Deleted' , result})
})

export{
    addUser,
    getAllUsers,
    getOneUser,
    verifyMail,
    userProfile,
    updateUser,
    deleteUser
}