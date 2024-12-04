import { ProcessedRow } from '../types/interfaces'

export function applyFilter<T>(
  rows: ProcessedRow<T>[],
  filterConfig: { field: string; value: any }
): ProcessedRow<T>[] {
  return rows.filter(row => {
    const value = row.dimensions[filterConfig.field] ?? row.measures[filterConfig.field]
    return value === filterConfig.value
  })
}

