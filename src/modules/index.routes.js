import { globalError } from "../middleware/globalError.js"
import { customError } from "../utils/customError.js"
import authRouter from "./auth/auth.router.js"
import propertyRouter from "./properties/properties.router.js"
import userRouter from "./users/user.router.js"
import wishlistRouter from "./wishlist/wishlist.router.js"

export function init (app){

    app.use('/api/v1/auth' , authRouter)
    app.use('/api/v1/users' , userRouter)
    app.use('/api/v1/properties' , propertyRouter)
    app.use('/api/v1/wishlist' , wishlistRouter)

    app.all('/*splat' , (req , res , next)=>{
        next(new customError(`invalid url ${req.originalUrl}` , 404))
    })
    app.use(globalError)
}