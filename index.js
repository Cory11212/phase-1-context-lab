/* Your Code Here */
function createEmployeeRecord(array){
    const employeeRecord = {}
    employeeRecord.firstName = array[0]
    employeeRecord.familyName = array[1]
    employeeRecord.title = array[2]
    employeeRecord.payPerHour = array[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(array){
    const records = []
    for(const element of array){
        records.push(createEmployeeRecord(element))
    }
    return records
}

function createTimeInEvent(date){
    const timeEvent = {}
    timeEvent.type = "TimeIn"
    timeEvent.hour = parseInt(date.slice(11))
    timeEvent.date = date.slice(0, 10)
    this.timeInEvents.push(timeEvent)
    return this
}

function createTimeOutEvent(date){
    const timeEvent = {}
    timeEvent.type = "TimeOut"
    timeEvent.hour = parseInt(date.slice(11))
    timeEvent.date = date.slice(0, 10)
    this.timeOutEvents.push(timeEvent)
    return this
}

function hoursWorkedOnDate(date){
    let num1 = 0
    let num2 = 0
    this.timeInEvents.forEach(element => {
        if(element.date === date){
             num1 = element.hour/100
        }
    });

    this.timeOutEvents.forEach(element => {
        if(element.date === date){
             num2 = element.hour/100
        }
    });

    return num2 - num1
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, firstNameString){
    for(const element of array){
        if(element.firstName === firstNameString){
            return element
        }
    }
}

function calculatePayroll(array){
    let allPay = []
    for(const element of array){
        allPay.push(allWagesFor.call(element))
    }
    return allPay.reduce((accumulator, currentValue) => accumulator + currentValue)

}