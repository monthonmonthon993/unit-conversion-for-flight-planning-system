/**
 * Displays the detail of flight mission planning.
 * @param {Object} missionObj The object of flight mission.
 */
const logMissionShowing = (missionObj) => {
  console.log(`Mission: ${missionObj.missionName}`)
  console.log(`Time: ${missionObj.time}`)
  console.log(`Drone: ${missionObj.droneModel}`)
  console.log(`Distance: ${missionObj.distance.value.toFixed(2)} ${missionObj.distance.unit}`)
  console.log(`Altitude: ${missionObj.altitude.value.toFixed(2)} ${missionObj.altitude.unit}`)
  console.log(`Area: ${missionObj.area.value.toFixed(3)} ${missionObj.area.unit}`)
  console.log(`Group Area: ${missionObj.groupArea.value.toFixed(3)} ${missionObj.groupArea.unit}`)
}

/**
 * Displays the detail of the charging rate.
 * @param {Object} chargingRate The object of charging rate consist of its unit and value.
 */
const logChargingRate = (chargingRate) => {
  const unit = chargingRate.unit.charAt(0).toUpperCase() + chargingRate.unit.slice(1)
  let rateCharge
  if (unit === 'Rai' || unit === 'Sq.m' || unit === 'Acre') {
    rateCharge = chargingRate.value.toFixed(1)
  }
  else {
    rateCharge = chargingRate.value.toFixed(6)
  }
  console.log(`Charging Rate in ${unit} is ${rateCharge} THB/${unit}`)
}

/**
 * Displays the detail of the flight distance.
 * @param {Object} distance The object of distance consist of its unit and value.
 */
const logFlightDistance = (distance) => {
  console.log(`Flight Distance: ${distance.value} ${distance.unit}`)
}

/**
 * Displays the header of function.
 * @param {Object} argv The object of input from command line consist of the name of mission, funtion and unit.
 */
const logHeaderDetail = (argv) => {
  const mesMission = `Mission: "${argv.mission}"`
  const mesFuntion = `Function: "${argv.function.charAt(0).toUpperCase()}${argv.function.slice(1)}"`
  const mesUnit = `Unit: "${argv.unit}"`
  console.log(mesMission, mesFuntion, mesUnit)
}

/**
 * Displays the detail of the invoice report.
 * @param {Object} bill The object of invoice report that consist of 
 * charging rate, total cost, total area and its unit.
 */
const logInvoiceReport = (bill) => {
  if (bill.value) {
    const chargingRate = bill.value.chargingRate
    const totalCost = bill.value.cost.toFixed(2)
    const totalArea = bill.value.totalArea
    const unit = bill.unit.charAt(0).toUpperCase() + bill.unit.slice(1) 
    console.log('****Invoice Report****')
    console.log(`Charging Rate: ${chargingRate.toFixed(2)} THB/${unit}`)
    console.log(`Total area: ${totalArea} ${unit}`)
    console.log(`Total cost: ${totalCost} THB.`)
  }
}

/**
 * Displays the total area.
 * @param {Object} area The object of area that consist of its unit and value.
 */
const logTotalArea = (area) => {
  console.log(`Total Area: ${area.value} ${area.unit.charAt(0).toUpperCase()}${area.unit.slice(1)}`)
}

module.exports = {
  logChargingRate,
  logFlightDistance,
  logHeaderDetail,
  logInvoiceReport,
  logMissionShowing,
  logTotalArea,
}