

export const validation = (schema)=>{
    return (req , res , next)=>{
        const inputs = { ...req.body , ...req.params , ...req.query }
        const {error} = schema.validate(inputs , {abortEarly:false})
        if(error){
            const errors = error.details.map(detail => detail.message )
            res.json(errors)
        }else{
            next()
        }
    }
}