export const validateBalanceQuery = (address: string) => {
  if (!address || address.length === 0) {
    return false;
  } else {
    return true;
  }
};
