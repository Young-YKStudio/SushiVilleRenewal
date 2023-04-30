import moment from 'moment-timezone'

export function determineDay(date) {
  let currentDay = moment(date).format('dddd')

  if(currentDay === 'Monday' || currentDay === 'Wednesday' || currentDay === 'Thursday' || currentDay === 'Sunday') {
    return 'regular hours'
  }
  if(currentDay === 'Friday' || currentDay === 'Saturday') {
    return 'longer hours'
  }
  if(currentDay === 'Tuesday') {
    return 'closed'
  }
} 

export function Timeformatter(time) {
  let formattedTime = moment(time).format('HHmm')
  let first2Digits = formattedTime.slice(0, 2)
  let last2Digits = formattedTime.slice(2, 4)
  let hoursToMinutes = Number(first2Digits) * 60 + Number(last2Digits)
  return hoursToMinutes
}

export const timeStringFormat = (string) => {
  let firstTwo = string.substring(0, 2)
  let lastTwo = string.substring(3, 5)
  let retrunString = (Number(firstTwo) * 60) + Number(lastTwo)
  return String(retrunString)
}

// 12pm ~ 9pm

// 12pm ~ 9:30pm on Friday and Saturday

// Closed at Tuesday.