import * as Joi from 'joi';

export const balanceSchema = Joi.object({
  address: Joi.string().alphanum().min(25).max(35).required(),
});
