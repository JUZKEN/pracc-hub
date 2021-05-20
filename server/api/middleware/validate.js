const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { regions } = require('../constants');

exports.updateTeam = (req, res, next) => {
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

exports.createTeam = (req, res, next) => {
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

exports.register = (req, res, next) => {
   const { error } = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: passwordComplexity()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.login = (req, res, next) => {
   const { error } = Joi.object({
      username: Joi.string().alphanum().required(),
      password: Joi.string().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.userUpdate = (req, res, next) => {
   const { error } = Joi.object({
      username: Joi.string().alphanum().min(2).max(30).optional()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.recover = (req, res, next) => {
   const { error } = Joi.object({
      email: Joi.string().email().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.resetPassword = (req, res, next) => {
   const { error } = Joi.object({
      password: passwordComplexity()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.resend = (req, res, next) => {
   const { error } = Joi.object({
      email: Joi.string().email().required()
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}

exports.revokeToken = (req, res, next) => {
   const { error } = Joi.object({
       token: Joi.string().empty('')
   }).validate(req.body);

   if (error) return res.status(400).json({message: error.details[0].message});
   next();
}