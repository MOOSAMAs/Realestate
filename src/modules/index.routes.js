import { globalError } from "../middleware/globalError.js"
import { customError } from "../utils/customError.js"
import authRouter from "./auth/auth.router.js"
import userRouter from "./users/user.router.js"

export function init (app){

    app.use('/api/v1/auth' , authRouter)
    app.use('/api/v1/users' , userRouter)

    app.all('/*splat' , (req , res , next)=>{
        next(new customError(`invalid url ${req.originalUrl}` , 404))
    })
    app.use(globalError)
}