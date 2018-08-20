const fs = require('fs')

const billing = require('../billing/invoices')
const utils = require('../../utils/utils')

const dirMission = utils.dirMission
const dirSystems = utils.dirSystems
const dirUnits = utils.dirUnits

const checkTypeUnit = utils.checkTypeUnit
const checkUnitExist = utils.checkUnitExist
const convertUnit = utils.convertUnit
const fetchData = utils.fetchData
const totalArea = utils.totalArea
const flightDistance = utils.flightDistance
const writeData = utils.writeData

//Show all mission
const listData = () => {
  return fetchData(dirMission)
}

// Convert measurement following system.
const convertMeasurement = (missionName, systemName) => {
  const missionData = fetchData(dirMission).find(m => m.missionName == missionName) //Get mission from mission name input
  const convertingSys = fetchData(dirSystems).find(system => system.name == systemName) //Get measurement system from system name input

  if (missionData && convertingSys) { // Check if mission and system exist.
    const useToConvert = {length: ['distance', 'altitude'], area: ['area', 'groupArea']}
    const system = convertingSys.unitDefault
    for (const key in missionData) { // iterating missionData through key (distance, altitude, area, groupArea)
      let type
      if (useToConvert.length.includes(key)) {
        type = Object.keys(system)[0]
        missionData[key] = convertUnit(type, missionData[key], system.length)
      } 
      else if (useToConvert.area.includes(key)) {
        type = Object.keys(system)[1]
        missionData[key] = convertUnit(type, missionData[key], system.area)
      }
    }
    return missionData
  } 
  else { return undefined } // Not found the mission or measurement system.
}

//Display by following specific function and unit.
const displaySpecificUnit = (missionName, fn, unit) => {
  if (!checkUnitExist(unit)) {
    console.log(`Unit: ${unit} not exist.`)
    return []
  }
  if (fn.toLowerCase() === 'charging rate') { //If display charging rate, it not require mission
    return billing.chargingRate(unit) ? {chargingRate: billing.chargingRate(unit)} : []
  }
  missionObj = fetchData(dirMission).find(mission => mission.missionName == missionName)
  if (missionObj) {
    if (fn.toLowerCase() === 'total area') {
      return {area: totalArea(missionObj, unit).value.toFixed(2)}
    } 
    else if (fn.toLowerCase() === 'flight distance') {
      return {distance: flightDistance(missionObj, unit).value.toFixed(2)}
    }
    else if (fn.toLowerCase() === 'invoice report') {
      return {bill: billing.invoiceReport(missionObj, unit)}
    } 
    else { console.log(`Function: ${fn} not exist.`) }
  } 
  else { 
    console.log(`Mission: ${missionName} not exist.`) 
  }
  
}

//Add more units
const addUnit = (unit, type, valueRef) => {
  const units = fetchData(dirUnits)
  if (units && !checkUnitExist(unit) && checkTypeUnit(type)) {
    units.find(unitObj => unitObj.name == type).unit[unit.toLowerCase()] = valueRef
    const message = writeData(dirUnits, units)
    if (message) {
      console.log(`Unit: "${unit}" ${message}`)
    }
  } 
  else { 
    console.log('unit has already exist or type not found.')
  }
}

const addSystem = (systemName, length, area) => {
  const systems = fetchData(dirSystems)
  const checkSystemExist = systems.find(sysObj => sysObj.name == systemName)
  if (!checkSystemExist && checkUnitExist(length) && checkUnitExist(area)) {
    const system = {
      name: systemName,
      unitDefault: {
        length: length,
        area: area
      }
    }
    systems.push(system)
    const message = writeData(dirSystems, systems)
    if (message) {
      console.log(`System: "${system.name}" ${message}`)
    }
  }
  else {
    console.log(`System "${systemName}" has already exist or Unit: ${length} or ${area} not found.`)
  }
}

module.exports = {
  addSystem,
  addUnit,
  convertMeasurement,
  displaySpecificUnit,
  listData,
}
