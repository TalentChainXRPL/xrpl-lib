export const validateCurrencyBalanceQuery = (
  address: string,
  currency: string,
) => {
  if (!address || address.length === 0 || !currency || currency.length === 0) {
    return false;
  } else {
    return true;
  }
};
