import { Ascending, Descending } from "./TableConstant";


/**
 * A comparator function for sorting objects in descending order based on a specified property.
 *
 * @param a - The first object to compare.
 * @param b - The second object to compare.
 * @param orderBy - The key of the property in the objects `a` and `b` that will be used for comparison.
 *
 * @returns A negative number if `b[orderBy]` is less than `a[orderBy]`,
 *          a positive number if `b[orderBy]` is greater than `a[orderBy]`,
 *          or zero if they are equal.
 *
 * This function is useful for sorting arrays of objects where the sort order is determined
 * by a specific property in descending order. It can be used with array sorting methods
 * that accept a comparator function, such as Array.prototype.sort().
 */
const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/**
 * Generates a comparator function for sorting objects based on a specified property and order.
 *
 * @param order - The sorting order, which determines whether to sort in ascending or descending order.
 *                It should be one of the values defined in the `OrderDirection` enum.
 * @param orderBy - The key of the property in the objects that will be used for comparison.
 *
 * @returns A comparator function that takes two objects `a` and `b` and returns:
 *          - A negative number if `a` should come before `b`,
 *          - A positive number if `b` should come before `a`,
 *          - Zero if they are considered equal based on the specified property.
 *
 * This function is useful for dynamically generating sorting logic based on user preferences
 * or other criteria. It can be used with array sorting methods that accept a comparator function,
 * such as Array.prototype.sort().
 */
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: {[key in Key]:  number | string | any}, b: {[key in Key]: any}) => number {
  return order === OrderDirection[1]
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
/**
 * Performs a stable sort on an array using a provided comparator function.
 *
 * @param array - A read-only array of elements of type T that will be sorted.
 * @param comparator - A function that defines the sort order. It takes two elements of type T
 *                    and returns:
 *                    - A negative number if the first element should come before the second,
 *                    - A positive number if the second element should come before the first,
 *                    - Zero if they are considered equal in terms of sorting.
 *
 * @returns A new array containing the sorted elements in the same type as the input array.
 *
 * This function ensures that elements with equal values maintain their original relative order
 * in the sorted output (stability). It achieves this by pairing each element with its original
 * index and using that index to break ties when elements are considered equal by the comparator.
 *
 * Example usage:
 * const sortedArray = stableSort(array, (a, b) => a.value - b.value);
 */
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const OrderDirection = [Ascending, Descending] as const;
export type Order = (typeof OrderDirection)[number];

export {getComparator, stableSort};
