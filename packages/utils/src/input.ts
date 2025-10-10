
/**
 * Adjust the lowest decimal place directly on the string, preserving all trailing zeros
 * @param inputVal - The input value
 * @param direction - The direction to adjust the decimal place
 * @returns The adjusted value
 */
export const adjustLowestDecimal = (inputVal: string, direction: 1 | -1) => {
  let [whole, decimal = ''] = inputVal.split('.')
  // truncate the decimal to 18 decimals
  decimal = decimal.slice(0, 18)
  // If no decimals, treat as zero decimals
  const originalDecimals = decimal.length
  // Pad to 18 decimals for calculation
  const paddedDecimals = (decimal + '0'.repeat(18)).slice(0, 18)
  // Compose the full number as a string
  const fullNumberStr = whole + paddedDecimals
  let value = BigInt(fullNumberStr)
  // Determine which decimal place to operate on (last entered, or 18th if maxed)
  // idx will be -1 if it should be incrementing the whole number
  const idx = originalDecimals - 1
  // The amount to increment/decrement at the correct decimal place
  const delta = 10n ** BigInt(17 - idx)
  if (direction === 1) {
    value += delta
  } else if (value >= delta) {
    value -= delta
  }
  // Convert back to string, pad with zeros if needed
  let valueStr = value.toString().padStart(whole.length + 18, '0')
  let newWhole = BigInt(valueStr.slice(0, valueStr.length - 18) || '0').toString()
  let newDecimal = valueStr.slice(-18, -18 + originalDecimals)
  // If originalDecimals was 0, don't add a decimal point
  return originalDecimals > 0 ? `${newWhole}.${newDecimal}` : newWhole
}
