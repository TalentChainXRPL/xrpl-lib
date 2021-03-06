import * as Joi from 'joi';

export const currencyPairOrderSchema = Joi.object({
  address: Joi.string().alphanum().min(25).max(35).required(),
  base: Joi.string().min(3).required(),
  counter: Joi.string().min(3).required(),
});
