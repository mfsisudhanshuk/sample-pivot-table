// import React from 'react'
// import { PivotTable } from './components/PivotTable'
// import type { Column } from '@pivothead/core'

// interface SalesData {
//   date: string
//   product: string
//   region: string
//   sales: number
//   quantity: number
// }

// const data: SalesData[] = [
//   { date: '2024-01-01', product: 'Widget A', region: 'North', sales: 1000, quantity: 50 },
//   { date: '2024-01-01', product: 'Widget B', region: 'South', sales: 1500, quantity: 75 },
//   { date: '2024-01-02', product: 'Widget A', region: 'East', sales: 1200, quantity: 60 },
//   { date: '2024-01-02', product: 'Widget C', region: 'West', sales: 800, quantity: 40 },
//   { date: '2024-01-03', product: 'Widget B', region: 'North', sales: 1800, quantity: 90 },
//   { date: '2024-01-03', product: 'Widget C', region: 'South', sales: 1100, quantity: 55 },
//   { date: '2024-01-04', product: 'Widget A', region: 'West', sales: 1300, quantity: 65 },
//   { date: '2024-01-04', product: 'Widget B', region: 'East', sales: 1600, quantity: 80 },
// ]

// const columns: Column[] = [
//   { field: 'date', label: 'Date' },
//   { field: 'product', label: 'Product' },
//   { field: 'region', label: 'Region' },
//   { field: 'sales', label: 'Sales' },
//   { field: 'quantity', label: 'Quantity' }
// ]

// export default function Example() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
//       <PivotTable
//         data={data}
//         columns={columns}
//         className="max-w-4xl mx-auto"
//         onRowClick={(row) => console.log('Row clicked:', row)}
//         onCellClick={(row, field) => console.log('Cell clicked:', field, row)}
//       />
//     </div>
//   )
// }

