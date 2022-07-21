import * as Joi from 'joi';

export const marketStatSchema = Joi.object({
  base: Joi.string().min(3).required(),
  counter: Joi.string().min(3).required(),
});
