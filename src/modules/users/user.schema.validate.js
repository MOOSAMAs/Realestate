import Joi from 'joi'

export const userValidationSchema = Joi.object({
    name:Joi.string().min(2).max(20).trim().required(),
    email:Joi.string().email().trim().required(),
    password:Joi.string().min(8).max(30).pattern(/^[A-Z][a-z0-9]{3,30}$/).required(),
    repassword:Joi.ref('password'),
    phoneNum:Joi.number()
})