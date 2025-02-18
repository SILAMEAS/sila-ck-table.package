export const getExCustom = (expireDate?: number) => {
  if (expireDate) {
    return expireDate;
  }
  return undefined;
};
