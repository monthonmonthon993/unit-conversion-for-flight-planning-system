const fs = require('fs')

const utils = require('../../utils/utils')

const dirUnits = utils.dirUnits

const convertUnit = utils.convertUnit
const fetchData = utils.fetchData

const defaultRate = 100 //100THB/Rai

/**
 * Returns the value of charging rate.
 * @param {string} u The unit that we want to represent for charging rate.
 */
const chargingRate = (u) => {
  const areaUnit = fetchData(dirUnits).find(unitObj => unitObj.name === 'area')

  if (areaUnit.unit['rai'] && areaUnit.unit[u]) {
    const resUnit = areaUnit.unit[u] / areaUnit.unit['rai'] // unit we want compare with value of acre in units.json.
    return defaultRate / resUnit //convert to rate.
  } 
  else {
    console.log(`The unit ${u} is wrong.`)
  }
  
}

/**
 * Returns the object of invoice report consist of 
 * the detail representing total cost, charging rate and total area.
 * @param {Object} missionObj The object of flight mission.
 * @param {string} unit The unit of area that you want to represent for invoice report.
 */
const invoiceReport = (missionObj, unit) => {
  missionObj.area = convertUnit('area', missionObj.area, unit)
  if (missionObj.area.value) {
    const rateCharge = chargingRate(unit) 
    const totalCost = rateCharge * missionObj.area.value
    return {cost: totalCost, chargingRate: rateCharge, totalArea: missionObj.area.value}
  } else {
    console.log(`"${unit}" is not area unit.`)
  }
}

module.exports = {
  chargingRate,
  invoiceReport
}