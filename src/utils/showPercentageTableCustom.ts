export const showPercentageTableCustom = <T extends Record<string, any>>(
  item: T,
) => {
  let result: string | number =
    item.percentage && !isNaN(item.percentage) ? item.percentage.toFixed(0) : 0;
  if (typeof item.percentage.valueOf() === 'string') {
    result = 0;
  }
  return `${result}%`;
};
