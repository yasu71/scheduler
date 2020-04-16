export function getAppointmentsForDay(state, providedDay) {
  // get the whole day obj
  const dayObj = state.days.find(day => {
    return day.name === providedDay
  })

  if (!dayObj) {
    return []
  }

  // populate the array with the appointment object
  return dayObj.appointments.map((appointmentID) => {
    return state.appointments[appointmentID]
  })


  // const filteredDays = state.days.filter(day => {
  //   const dayAppointments = []
  //   if (day.name === providedDay){
  //     for (const appointments of day.appointments) {
  //       for(const schedule in state.appointments){
  //         if (appointments === state.appointments[schedule].id) {
  //           dayAppointments.push(state.appointments[schedule]);
  //         } else {
  //           dayAppointments;
  //         }
  //       }
  //     }
  //     console.log("dayAppointments: ", dayAppointments)
  //     return dayAppointments;
  //   }
  // });
  // console.log("filteredDays: ",filteredDays)
  // return filteredDays;

}