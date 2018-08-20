# Unit Conversion For Flight Planning System

This system consist of four main function:
* Display a flight mission detail with specifying measurement system.
* Display a function detail such as Total area, Flight distance, Charging rate and Invoice report with specifying unit.
* Add more unit with specifying a value that compares with a default value of the system (compare with 1 km for length and 0.001 sq.km for area)
* Add more measurement system.

## Usage:
1. Clone this project repository to your local.
2. Install all dependency by type `npm install` in the directory that you have cloned.
3. Go to test each function.

## Help function.
Display all command you want to use `node app.js --help`
```
app.js [command]

Commands:
  app.js display     Display the mission flight.
  app.js list        Show all mission flights.
  app.js detail      Show a function detail such as Total area, Flight distance.
  app.js add_unit    Add more units.
  app.js add_system  Add more systems.

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```
## Test case
### Assumption:
* A mock-up data, you can see the mission data in [data/data.json](https://github.com/monthonmonthon993/unit-conversion-for-flight-planning-system/tree/master/data/data.json). It will show *Mission A* detail.
* Units data, you can see all units in [data/measurement_system/units.json](https://github.com/monthonmonthon993/unit-conversion-for-flight-planning-system/blob/master/data/measurement_system/units.json)
* Measurement system data, you can see all system in [data/measurement_system/systems.json](https://github.com/monthonmonthon993/unit-conversion-for-flight-planning-system/blob/master/data/measurement_system/systems.json)

### Command Testing:
__1. Display flight mission planning.__

Ex. _"Mission A"_ in _"Metric system"_.

`node app.js display --mission="Mission A" --system="metric"`
```
**In Metric System**
Mission: Mission A
Time: 9min/45min
Drone: Model A
Distance: 7000.00 m
Altitude: 5.00 m
Area: 93077.698 sq.m
Group Area: 18615.540 sq.m
```
Ex. _"Mission A"_ in _"Imperial system"_.

`node app.js display --mission="Mission A" --system="imperial"`
```
**In Imperial System**
Mission: Mission A
Time: 9min/45min
Drone: Model A
Distance: 22965.88 foot
Altitude: 16.40 foot
Area: 23.000 acre
Group Area: 4.600 acre
```
__2. Display a function detail with specifying unit.__

Ex. _"Total Area"_ function with area unit _"Acre"_ of "_Mission A_".

`node app.js detail --mission="Mission A" --function="total area" --unit="acre"`
```
Mission: "Mission A" Function: "Total area" Unit: "acre"
Total Area: 23.00 Acre
```
Ex. "_Flight Distance_" function with length unit "_m_" of "_Mission A_".

`node app.js detail --mission="Mission A" --function="flight distance" --unit="m"`
```
Mission: "Mission A" Function: "Flight distance" Unit: "m"
Flight Distance: 7000.00 m
```
Ex. "_Charging rate_" function with area unit "_Acre_" 

`node app.js detail --function="charging rate" --unit="acre"`
```
Charging Rate in Acre is 252.9 THB/Acre
```
with area unit "_Rai_"

`node app.js detail --function="charging rate" --unit="rai"`
```
Charging Rate in Rai is 100.0 THB/Rai
```
Ex. "_Invoice report_" function with area unit "_Acre_" of "_Mission A_"

`node app.js detail --mission="Mission A" --function="invoice report" --unit="acre"`
```
Mission: "Mission A" Function: "Invoice report" Unit: "acre"
****Invoice Report****
Charging Rate: 252.93 THB/Acre
Total area: 23 Acre
Total cost: 5817.36 THB.
```
__3. Add more units.__
Before we add new units such as Sq.wa and Ngan, We will test a function Total Area for those area units.

`node app.js detail --mission="Mission A" --function="total area" --unit="sq.wa"`

It will not work and show error like this...
```
Unit: sq.wa not exist.
```
So, we can add a unit "sq.wa" right now.
Let's check "sq.wa" value when compare with 0.001 sq.km or 1000 sq.m (it's default value, you can see in [data/measurement_system/units.json](https://github.com/monthonmonthon993/unit-conversion-for-flight-planning-system/blob/master/data/measurement_system/units.json))

The result:
```
250 ตารางวา (ไทย) = 1,000 ตารางเมตร
```
reference for check: [www.addnine.com](https://www.addnine.com/web/metric/aria/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B2-m2?btnConvertValue=1000)

Finally, We ready to add "sq.wa" to our system.

`node app.js add_unit --unit="sq.wa" --type="area" --value="250"`
```
Unit: "sq.wa" added successfully
```
Let's test with Total Area function of Mission A

`node app.js detail --mission="Mission A" --function="total area" --unit="sq.wa"`
```
Mission: "Mission A" Function: "Total area" Unit: "sq.wa"
Total Area: 23269.42 Sq.wa
```
__4. Add more measurement system.__

Test to display Mission A detail with _"Thai measurement system"_

`node app.js display --mission="Mission A" --system="Thai measurement system"`

and get error message:
```
Your system or your mission not exist.
```
So, let's add new measurement with specify length and area unit to be a default of system.
(Note: length and area unit must exist in our system. if not exist, let's add them to our system before.)

`node app.js add_system --system="Thai measurement system" --length="wa" --area="rai"`
```
System: "Thai measurement system" added successfully
```
Test to display Mission A again.

`node app.js display --mission="Mission A" --system="Thai measurement system"`
```
**In Thai measurement system System**
Mission: Mission A
Time: 9min/45min
Drone: Model A
Distance: 3500.00 wa
Altitude: 2.50 wa
Area: 58.174 rai
Group Area: 11.635 rai
```
