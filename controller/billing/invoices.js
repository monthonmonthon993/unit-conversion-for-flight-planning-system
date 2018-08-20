const fs = require('fs')

const utils = require('../../utils/utils')

const dirMission = utils.dirMission
const dirUnits = utils.dirUnits

const convertUnit = utils.convertUnit
const fetchData = utils.fetchData

const defaultRate = 100 //THB per one Rai

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

const invoiceReport = (missionObj, unit) => {
  missionObj.area = convertUnit('area', missionObj.area, unit)
  if (missionObj.area.value) {
    const rateCharge = chargingRate(unit) 
    const totalCost = rateCharge * missionObj.area.value
    return {cost: totalCost, chargingRate: rateCharge}
  } else {
    console.log(`"${unit}" is not area unit.`)
  }
}

module.exports = {
  chargingRate,
  invoiceReport
}