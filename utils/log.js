
const logToScreen = (missionObj) => {
  console.log(`Mission: ${missionObj.missionName}`)
  console.log(`Drone: ${missionObj.droneModel}`)
  console.log(`Distance: ${missionObj.distance.value.toFixed(2)} ${missionObj.distance.unit}`)
  console.log(`Altitude: ${missionObj.altitude.value.toFixed(2)} ${missionObj.altitude.unit}`)
  console.log(`Area: ${missionObj.area.value.toFixed(3)} ${missionObj.area.unit}`)
  console.log(`Group Area: ${missionObj.groupArea.value.toFixed(3)} ${missionObj.groupArea.unit}`)
}

const logChargingRate = (chargingRate) => {
  const unit = chargingRate.unit.charAt(0).toUpperCase() + chargingRate.unit.slice(1) 
  const rateCharge = chargingRate.value.toFixed(6)
  console.log(`Charging Rate in ${unit} is ${rateCharge} THB/${unit}`)
}

const logFlightDistance = (distance) => {
  console.log(`Flight Distance: ${distance.value} ${distance.unit}`)
}

const logHeaderDetail = (argv) => {
  console.log(`Mission: "${argv.mission}" Function: "${argv.function}" Unit: "${argv.unit}"`)
}

const logInvoiceReport = (bill) => {
  if (bill.value) {
    const chargingRate = bill.value.chargingRate
    const totalCost = bill.value.cost.toFixed(2)
    const unit = bill.unit.charAt(0).toUpperCase() + bill.unit.slice(1) 
    console.log('Invoice Report')
    console.log(`Charging Rate: ${chargingRate.toFixed(2)} THB/${unit}`)
    console.log(`Total cost: ${totalCost.toFixed(2)} THB.`)
  }
}

const logTotalArea = (area) => {
  console.log(`Total Area: ${area.value} ${area.unit.charAt(0).toUpperCase()}${area.unit.slice(1)}`)
}

module.exports = {
  logChargingRate,
  logFlightDistance,
  logHeaderDetail,
  logInvoiceReport,
  logTotalArea,
  logToScreen,
}