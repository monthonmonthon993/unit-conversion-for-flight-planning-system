const yargs = require('yargs')

const log = require('./utils/log')
const setting = require('./controller/setting/setting_mission')

const argv = yargs
  .command('display', 'Display the mission planning', {
    mission: {
      describe: 'The mission planning system.',
      demand: true
    },
    system: {
      describe: 'The measurement system',
      demand: true
    }
  })
  .command('list', 'List all mission.')
  .command('detail', 'Show detail specifying function ex. Total Area', {
    mission: {
      describe: 'The mission planning system.',
      demand: true,
      default: ""
    },
    function: {
      describe: 'show for: Total area, flight distance, Charging Rate, Invoice report',
      demand: true
    },
    unit: {
      describe: 'The unit you want to know.',
      demand: true
    }
  }).command('add_unit', 'Add more units', {
    unit: {
      describe: 'The unit you want to add',
      demand: true
    },
    type: {
      describe: 'Area or Length',
      demand: true
    },
    value: {
      describe: 'Value compare with 1 kilometre for length and 0.001 sq.km for area.',
      demand: true
    }
  }).command('add_system', 'Add more systems.', {
    system: {
      describe: 'The unit you want to add.',
      demand: true
    },
    length: {
      describe: 'Unit of length default.',
      demand: true
    },
    area: {
      describe: 'Unit of area default.',
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

