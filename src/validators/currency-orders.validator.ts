export const validateCurrencyOrdersQuery = (
  address: string,
  currency: string,
  issuer: string,
) => {
  if (
    !address ||
    address.length === 0 ||
    !currency ||
    currency.length === 0 ||
    !issuer ||
    issuer.length === 0
  ) {
    return false;
  } else {
    return true;
  }
};
