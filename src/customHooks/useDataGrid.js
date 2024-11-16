import { useState, useEffect } from 'react'
import { loadCsvFileData } from '../Helpers/filesHelper'
import editableColumnName from '../components/grid/editableColumnName'
import useStatistics from './useStatistics'

const types = {
  string: 'text',
  number: 'number',
  boolean: 'boolean',
  object: 'object'
}
const useDataGrid = () => {
  // options:{}
  //dataType : ['csv' thats means it is csv,'server'thats means it is api response]
  const [error, setError] = useState(false)

  const [rows, setRows] = useState(null)
  const [cols, setCols] = useState(null)
  const [defaultColDef, setDefaultColDef] = useState(null)
  const [statistics, getStatistics] = useStatistics(rows)

  const fetchData = async (dataType, DataSource) => {
    try {
      var collection, columns, defaults
      switch (dataType) {
        case 'csv':
          collection = await loadCsvFileData(DataSource)
          break
        case 'server':
          collection = DataSource
          break
      }
      await setRows(collection)
      await getStatistics(collection)
      setDefaultColDef(agGetDefaultColDef())
      setCols(await agGetColsDefention(collection))
    } catch {
      console.log('error in loading data')
      setError(true)
    }
  }
  const agGetColsDefention = data => {
    if (data && data.length == 0) return null
    var cols = []
    for (const [key, value] of Object.entries(data[0])) {
      cols.push({
        headerName: key,
        valueGetter: row => {
          return types[typeof row.data[key]] == 'object'
            ? JSON.stringify(row.data[key])
            : row.data[key]
        },
        tooltipValueGetter: row => {
          return types[typeof row.data[key]] == 'object'
            ? JSON.stringify(row.data[key])
            : row.data[key]
        },
        headerComponentParams: {
          type_of: types[typeof value],
          statistics: statistics.current[key],
          
        }
      })
    }
    return cols
  }

  const agGetDefaultColDef = () => {
    return {
      flex: 1,
      minWidth: 180,
      sortable: true,
      headerComponent: editableColumnName,
      suppressHeaderKeyboardEvent: params => {
        return true
      }
    }
  }

  return [rows, cols, defaultColDef, error, fetchData]
}

export default useDataGrid
