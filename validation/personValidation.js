const Joi = require("joi");

exports.personSchema = Joi.object({
    name: Joi.string().min(2).required(),
    party: Joi.string().min(2).required(),
    position: Joi.string().valid("minister", "formand").required(),
    startDate: Joi.date().optional()
});