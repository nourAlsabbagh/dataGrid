// here we can add any function we need to use it to read any file typ
// in task case i will add functions which help me to read csv file
import Papa from 'papaparse'

export const loadCsvFileData = async function (localPath) {
  var response = await fetch(localPath)
  var csvText = await response.text()
  var parsedData = await Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  })
  return parsedData.data
}
