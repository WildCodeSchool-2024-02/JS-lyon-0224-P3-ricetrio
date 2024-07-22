const Joi = require("joi");

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

const signInSchema = Joi.object({
  pseudo: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required(),
  hashedPassword: Joi.string().required(), // Cette ligne si "hashedPassword" doit être validé
});

const validateSignIn = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true });

  if (error !== null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};
module.exports = validateSignIn;
