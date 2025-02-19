import uniqueArray from "./uniqueArray";

 const uniqueElementsTwoArrays = <
  A1 extends Record<string, any>,
  A2 extends Record<string, any>,
>(
  array1: A1[],
  array2: A2[],
  K: keyof A1 | keyof A2,
) => {
  const arrays = [...array1, ...array2];
  return uniqueArray<any>(arrays, K);
};
export default uniqueElementsTwoArrays