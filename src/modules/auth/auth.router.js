import express from 'express'
import * as auth from './auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { userValidationSchema } from '../users/user.schema.validate.js'

const authRouter = express.Router()

authRouter.route('/signup')
.post(validation(userValidationSchema) , auth.signUp)

authRouter.route('/login')
.post(auth.login)

export default authRouter