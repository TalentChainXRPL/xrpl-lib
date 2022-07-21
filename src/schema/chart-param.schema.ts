import * as Joi from 'joi';

export const chartParametersSchema = Joi.object({
  period: Joi.string().alphanum().min(2).max(3).required(),
  from: Joi.string().required(),
  base: Joi.string().min(3).required(),
  counter: Joi.string().min(3).required(),
});
