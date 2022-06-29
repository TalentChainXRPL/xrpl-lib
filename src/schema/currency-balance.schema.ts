import * as Joi from 'joi';

export const currencyBalanceSchema = Joi.object({
  address: Joi.string().alphanum().min(25).max(35).required(),
  currency: Joi.string().min(3).max(40).required(),
  issuer: Joi.string().alphanum().min(25).max(35).optional(),
});
