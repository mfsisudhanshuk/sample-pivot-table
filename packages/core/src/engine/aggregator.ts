import { AggregationType } from '../types/interfaces'

export function aggregate<T>(data: T[], field: string, type: AggregationType): number {
  const values = data.map(item => (item as any)[field] as number)

  switch (type) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0)
    case 'avg':
      return values.reduce((a, b) => a + b, 0) / values.length
    case 'count':
      return values.length
    case 'min':
      return Math.min(...values)
    case 'max':
      return Math.max(...values)
    default:
      throw new Error(`Unsupported aggregation type: ${type}`)
  }
}

