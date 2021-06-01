const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { regions, valorantMaps } = require('../../constants');

exports.validate = (req, res, next) => {
   const { error } = Joi.object({
      region: Joi.string().valid(...regions).required(),
      hub: Joi.objectId().required(),
      maps: Joi.array().items(Joi.string().valid(...valorantMaps).required()).required(),
      startsAt: Joi.date().min("now").optional()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.handleRequest = (req, res, next) => {
   const { error } = Joi.object({
      type: Joi.string().valid('accept', 'reject').required(),
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}