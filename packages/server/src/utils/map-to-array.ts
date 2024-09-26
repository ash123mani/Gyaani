export function mapToArrayValues(map: Map<any, any>) {
  return Array.from(map, ([, value]) => value);
}
