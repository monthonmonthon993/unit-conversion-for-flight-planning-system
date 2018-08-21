const fs = require('fs')

var dirMission = './data/data.json'
var dirSystems = './data/measurement_system/systems.json'
var dirUnits = './data/measurement_system/units.json'


var checkTypeUnit = (type) => {
  return fetchData(dirUnits).find(unitObj => unitObj.name == type)
}

var checkUnitExist = (unit) => {
  return fetchData(dirUnits).find(unitObj => Object.keys(unitObj.unit).includes(unit))
}

/**
 * Returns the object of unit consist of unit name and its value.
 * @param {string} type The type of unit. (Area, Length)
 * @param {Object} fromObj The object of a unit and its value for comparing.
 * @param {string} toUnit The name of unit that we want to convert.
 */
var convertUnit = (type, fromObj, toUnit) => {
  const value = fromObj.value
  const unit = fromObj.unit
  const unitRef = fetchData(dirUnits).find(unit => unit.name == type)
  if (unitRef) {
    const result = value * (unitRef.unit[toUnit]/unitRef.unit[unit])
    return { value: result, unit: toUnit } 
  } else { 
    console.log(`Unit reference ${toUnit} not exist.`)
    return []
  }
}

/**
 * Returns the array of data from the data json file.
 * @param {string} dir The path of directory of data. (data, units, systems)
 */
var fetchData = (dir) => {
  try {
    const data = fs.readFileSync(dir)
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

var flightDistance = (mission, unit) => {
  return convertUnit('length', mission.distance, unit)
}

var totalArea = (mission, unit) => {
  return convertUnit('area', mission.area, unit)
}

/**
 * Writes the data to our data json file.
 * @param {string} dir The path of directory of data (data, systems, units)
 * @param {Object} data The object that we want to write to our data json file.
 */
var writeData = (dir, data) => {
  try {
    fs.writeFileSync(dir, JSON.stringify(data))
    return 'added successfully'
  }
  catch (e) {
    console.log(e)
    return []
  }
}


module.exports = {
  checkTypeUnit,
  checkUnitExist,
  convertUnit,
  dirMission,
  dirSystems,
  dirUnits,
  fetchData,
  flightDistance,
  totalArea,
  writeData,
}