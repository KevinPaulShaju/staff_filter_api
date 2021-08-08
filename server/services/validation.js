const Joi = require("joi");

const staffValidator = (data) => {
  const schema = Joi.object({
    personalTitle: Joi.string().length(2).required(),
    name: Joi.string().min(4).max(125).required(),
    email: Joi.string().min(6).max(125).required().email(),
    contact: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string(),
    address: Joi.string().min(10).max(180).required(),
    position: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = staffValidator;
