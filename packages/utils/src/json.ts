/**
 * JSON serializer
 */
export const jsonSerializer = {
  /**
   * Parse a JSON string
   * @param str - The JSON string to parse
   * @returns The parsed object
   */
  parse: JSON.parse,
  /**
   * Stringify an object
   * @param obj - The object to stringify
   * @returns The stringified object
   */
  stringify: (obj: unknown) => JSON.stringify(obj, (_key, value) => {
    if (typeof value === 'bigint') {
      return value.toString()
    }
    return value
  })
}
// Recursively convert specified fields to BigInt in an object or array
export function mapBigIntFields<T>(obj: T, fields: string[]): T {
  if (Array.isArray(obj)) {
    return obj.map(item => mapBigIntFields(item, fields)) as any;
  }
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (fields.includes(key) && typeof value === 'string' && value.match(/^-?\d+$/)) {
        result[key] = BigInt(value);
      } else if (Array.isArray(value) || (value && typeof value === 'object')) {
        result[key] = mapBigIntFields(value, fields);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  return obj;
}
