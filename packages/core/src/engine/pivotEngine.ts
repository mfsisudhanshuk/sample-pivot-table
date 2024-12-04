import { PivotTableConfig, PivotTableState, ProcessedRow } from '../types/interfaces'
import { processData } from './dataProcessor'
import { applySort } from './sorter'
import { applyFilter } from './filter'

export class PivotEngine<T> {
  private config: PivotTableConfig<T>
  private state: PivotTableState<T>

  constructor(config: PivotTableConfig<T>) {
    this.config = config
    this.state = {
      rows: [],
      columns: [],
      expandedNodes: new Set(),
      sortConfig: null,
      filterConfig: null
    }
    this.processData()
  }

  private processData() {
    this.state.rows = processData(this.config.data, this.config.dimensions, this.config.measures)
    this.applyStateChanges()
  }

  private applyStateChanges() {
    if (this.state.sortConfig) {
      this.state.rows = applySort(this.state.rows, this.state.sortConfig)
    }
    if (this.state.filterConfig) {
      this.state.rows = applyFilter(this.state.rows, this.state.filterConfig)
    }
  }

  public toggleExpand(rowId: string) {
    if (this.state.expandedNodes.has(rowId)) {
      this.state.expandedNodes.delete(rowId)
    } else {
      this.state.expandedNodes.add(rowId)
    }
    this.processData()
  }

  public sort(field: string, direction: 'asc' | 'desc') {
    this.state.sortConfig = { field, direction }
    this.applyStateChanges()
  }

  public filter(field: string, value: any) {
    this.state.filterConfig = { field, value }
    this.applyStateChanges()
  }

  public getState(): PivotTableState<T> {
    return { ...this.state }
  }
  
  public reset() {
    this.state.sortConfig = null
    this.state.filterConfig = null
    this.state.expandedNodes.clear()
    this.processData()
  }
}

