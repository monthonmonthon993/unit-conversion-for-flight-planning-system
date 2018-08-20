const yargs = require('yargs')

const log = require('./utils/log')
const setting = require('./controller/setting/setting_mission')

const argv = yargs
  .command('display', 'Display the mission flight.', {
    mission: {
      describe: 'Find the mission flight following to mission specified.',
      demand: true
    },
    system: {
      describe: 'Convert all unit following to system specified.',
      demand: true
    },
  })
  .command('list', 'Show all mission flights.')
  .command('detail', 'Show a function detail such as Total area, Flight distance.', {
    mission: {
      describe: 'Find the mission flight following to mission specified.',
      demand: true,
      default: ""
    },
    function: {
      describe: 'Specify function for show detail.',
      demand: true
    },
    unit: {
      describe: 'Convert unit.',
      demand: true
    }
  }).command('add_unit', 'Add more units.', {
    unit: {
      describe: 'Add unit',
      demand: true
    },
    type: {
      describe: 'Specify Area or Length',
      demand: true
    },
    value: {
      describe: 'Compare this value with 1 kilometre for length and 0.001 sq.km for area.',
      demand: true
    }
  }).command('add_system', 'Add more systems.', {
    system: {
      describe: 'Add measurement system.',
      demand: true
    },
    length: {
      describe: 'Specify unit for length default.',
      demand: true
    },
    area: {
      describe: 'Specify unit for area default.',
      demand: true
    }
  })
  .help()
  .alias('h', 'help')
  .argv

const command = argv._[0]

if (command == 'list') {
  const listMission = setting.listData()
  console.log(listMission)
} 
else if (command == 'display') {
  const valueConverted = setting.convertMeasurement(argv.mission, argv.system)
  if (valueConverted) {
    console.log(`--In ${argv.system.charAt(0).toUpperCase()}${argv.system.slice(1)} System--`) //show measurement system.
    log.logToScreen(valueConverted) // display the detail mission to screen.
  } 
  else { 
    console.log('Your system or your mission not exist.') 
  }
  
} 
else if (command == 'detail') {
  const fnDisplay = setting.displaySpecificUnit(argv.mission, argv.function, argv.unit)
  if (fnDisplay) {
    if (Object.keys(fnDisplay).includes('area')) {
      log.logHeaderDetail(argv)
      const totalArea = {value: fnDisplay.area, unit: argv.unit}
      log.logTotalArea(totalArea)
    } 
    else if (Object.keys(fnDisplay).includes('distance')) {
      log.logHeaderDetail(argv)
      const fligthDistance = {value: fnDisplay.distance, unit: argv.unit}
      log.logFlightDistance(fligthDistance)
    }
    else if (Object.keys(fnDisplay).includes('chargingRate')) {
      const chargingRate = {value: fnDisplay.chargingRate, unit: argv.unit}
      log.logChargingRate(chargingRate)
    }
    else if (Object.keys(fnDisplay).includes('bill')) {
      log.logHeaderDetail(argv)
      const invoiceReport = {value: fnDisplay.bill, unit: argv.unit}
      log.logInvoiceReport(invoiceReport)
    }
  }
} else if (command == 'add_unit') {
  setting.addUnit(argv.unit, argv.type, argv.value)
} else if (command == 'add_system') {
  setting.addSystem(argv.system, argv.length, argv.area)
}

