export type SortDirection = 'asc' | 'desc'

export type Sortable = string | number | bigint

/**
 * Ordered sort
 * @param aVal - The first value
 * @param bVal - The second value
 * @param orderDirection - The order direction
 * @returns The sorted value
 */
export const orderedSort = (aVal: Sortable, bVal: Sortable, orderDirection: SortDirection): number => {
  if (typeof aVal === 'bigint' && typeof bVal === 'bigint') {
    const compareResult = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return orderDirection === 'asc' ? compareResult : -compareResult;
  } else if (typeof aVal === 'string' && typeof bVal === 'string') {
    const compareResult = aVal.localeCompare(bVal);
    return orderDirection === 'asc' ? compareResult : -compareResult;
  } else if (typeof aVal === 'number' && typeof bVal === 'number') {
    const compareResult = aVal - bVal;
    return orderDirection === 'asc' ? compareResult : -compareResult;
  } else {
    const compareResult = String(aVal).localeCompare(String(bVal));
    return orderDirection === 'asc' ? compareResult : -compareResult;
  }
}

/**
 * Ordered sort then by deposit ID
 * @param param0 - The parameters
 * @returns The sorted value
 */
export const orderedSortThenById = ({
  aVal,
  bVal,
  orderDirection,
  a,
  b,
}: {
  aVal: Sortable, bVal: Sortable, orderDirection: SortDirection,
  a: { depositId: bigint, transaction: { block: { timestamp: string } } },
  b: { depositId: bigint, transaction: { block: { timestamp: string } } },
}): number => {
  let result = orderedSort(aVal, bVal, orderDirection)
  if (result !== 0) return result
  result = orderedSort(BigInt(a.transaction.block.timestamp), BigInt(b.transaction.block.timestamp), 'asc')
  if (result !== 0) return result
  return orderedSort(a.depositId, b.depositId, 'asc')
}
