const Joi= require('joi')
const validate= {
  registerVal: (data)=> {
      const schema= Joi.object({
          email: Joi.string()
          .email()
          .required(),
          password: Joi.string().min(3).required(),
          role: Joi.string().min(3).required()
      })
      return schema.validate(data)
  }  ,
  newLoadValidate: (data)=> {
      const schema= Joi.object({
         name: Joi.string().min(3).required(),
          payload: Joi.number().required(),
          pickup_address: Joi.string().required(),
          delivery_address: Joi.string().required(),
          dimensions: Joi.object({
              width: Joi.number().required(),
              length: Joi.number().required(),
              height: Joi.number().required(),
          })
      })
      return schema.validate(data);
  }
}
module.exports= validate;