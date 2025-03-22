// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}  


function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type : "TimeIn",
        date : date,
        hour : parseInt(hour)
    });

    return employee
}

function createTimeOutEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type : "TimeOut",
        date : date,
        hour : parseInt(hour)
    });

    return employee
}
function hoursWorkedOnDate(employee, date) {

    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return ((timeOut.hour - timeIn.hour)/100);
}

function wagesEarnedOnDate(employee, date){
   let hours = hoursWorkedOnDate(employee, date)

  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(e => e.date);

    const totalWage = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);

    return totalWage;
}

function calculatePayroll(employees) {
    return employees.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
}

