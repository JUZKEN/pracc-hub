const Joi = require('joi');
const { regions } = require('../../constants');

exports.update = (req, res, next) => {
   const { error } = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).optional(),
      region: Joi.string().valid(...regions).optional(),
      socialLinks: Joi.object({
         twitter: Joi.string().optional(),
         website: Joi.string().optional()
      }).optional(),
      playerLinks: Joi.array().items({
         name: Joi.string().required(),
         link: Joi.string().required()
      }).optional()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.create = (req, res, next) => {
   const { error } = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      region: Joi.string().valid(...regions).required(),
      socialLinks: Joi.object({
         twitter: Joi.string().optional(),
         website: Joi.string().optional()
      }).optional(),
      playerLinks: Joi.array().items({
         name: Joi.string().required(),
         link: Joi.string().required()
      }).optional()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}