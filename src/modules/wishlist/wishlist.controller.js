import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middleware/handleError.js";
import { customError } from "../../utils/customError.js";

const addToWishlist = catchError(async(req , res , next)=>{
    const {property} = req.body
    const result = await userModel.findByIdAndUpdate(req.user.id , {$addToSet:{wishlist:property}} , {new:true})
    !result && next(new customError('Something went wrong' , 404))
    result && res.status(201).json({message:'Added to wishlist' , result:result.wishlist})
})

const deleteFromWishlist = catchError(async(req , res , next)=>{
    const {property} = req.body
    const result = await userModel.findByIdAndUpdate(req.user.id , {$pull:{wishlist:property}} , {new:true})
    !result && next(new customError('Something went wrong' , 404))
    result && res.status(201).json({message:'deleted to wishlist' , result:result.wishlist})
})

const getUserWishlist = catchError(async(req , res , next)=>{
    const result = await userModel.findOne({id:req.user.id}).populate('wishlist')
    !result && next(new customError('Something went wrong' , 404))
    result && res.status(201).json({message:'users wishlist' , result:result.wishlist})
})

export {
    addToWishlist,
    deleteFromWishlist,
    getUserWishlist
}