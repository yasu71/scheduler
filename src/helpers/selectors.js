export function getAppointmentsForDay(state, providedDay) {
  // get the whole day obj
  const dayObj = state.days.find(day => {
    return day.name === providedDay;
  })

  if (!dayObj) {
    return [];
  }

  // populate the array with the appointment object
  return dayObj.appointments.map((appointmentID) => {
    return state.appointments[appointmentID];
  })
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    for (const interviewer in state.interviewers) {
      if (parseInt(interviewer) === interview.interviewer) {
        interview.interviewer = state.interviewers[interviewer];
        return interview;
      }
    }
  }
};

export function getInterviewersForDay(state, providedDay) {
  // get the whole day obj
  const dayObj = state.days.find(day => {
    return day.name === providedDay;
  })

  if (!dayObj) {
    return [];
  }

  // populate the array with the appointment object
  return dayObj.interviewers.map((interviewerID) => {
    return state.interviewers[interviewerID];
  })
};
