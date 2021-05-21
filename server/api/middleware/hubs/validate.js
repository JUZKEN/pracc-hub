const Joi = require('joi');
const { hubTypes } = require('../../constants');

exports.create = (req, res, next) => {
   const { error } = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      type: Joi.string().valid(...hubTypes).required(),
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}