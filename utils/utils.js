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

var convertUnit = (type, fromObj, toUnit) => {
  const value = fromObj.value
  const unit = fromObj.unit
  const unitRef = fetchData(dirUnits).find(unit => unit.name == type)
  if (unitRef) {
    const result = value * (unitRef.unit[toUnit]/unitRef.unit[unit])
    return { value: result, unit: toUnit } //return object that consist of value and unit.
  } else { 
    console.log(`Unit reference ${toUnit} not exist.`)
    return []
  }
}

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