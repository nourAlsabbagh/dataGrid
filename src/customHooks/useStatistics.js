import { useState, useEffect, useRef } from 'react'
const types = {
  string: 'text',
  number: 'number',
  boolean: 'boolean'
}
const useStatistics = data => {
  // options:{}
  //dataType : ['csv' thats means it is csv,'server'thats means it is api response]
  const statistics = useRef()

  const getStatistics = data => {
    if (data.length == 0) return null
    var statisticsObject = {}
    Object.entries(data[0]).forEach(([key, value], index) => {
      if (index == 0)
        statisticsObject[key] = getTotalOf(data.map(row => row[key]))
      else statisticsObject[key] = getPercentageOf(data.map(row => row[key]))
    })
    statistics.current = statisticsObject
  }
  const getTotalOf = data => {
    return data.length
  }
  const getPercentageOf = data => {
    const tally = tallyOf(data)
    const finalResult = {}
    if (Object.keys(tally).length == data.length)
      return { 'The pct of each value is': 1 } //if column's values are unique no need for statistics
    Object.keys(tally).forEach(i => {
      tally[i] = (tally[i] * 100) / data.length
    })

    Object.entries(tally)
      .sort()
      .map(m => m.at())

    finalResult[`others (${getCountOfOthers(Object.keys(tally))})`] = parseInt(Object.keys(
      tally
    ).reduce((a, b, index) => {
      if (index >= 2) {
        return a + tally[b]
      }
      finalResult[b] = parseInt(tally[b])==0 ? tally[b]:parseInt(tally[b])
      return 0
    }, 0))
    return finalResult
  }
  const getCountOfOthers = data => {
    if (data.length == 2) return data.length - 1
    else if (data.length > 2) return data.length - 2
    else return 0
  }
  const tallyOf = data => {
    const tally = {}
    for (var i = 0; i < data.length; i++) {
      if (data[i] != null)
        tally[data[i]] = tally[data[i]] ? tally[data[i]] + 1 : 1
    }
    return tally
  }
  return [statistics, getStatistics]
}

export default useStatistics
