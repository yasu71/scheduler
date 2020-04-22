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
        return { student: interview.student, interviewer: state.interviewers[interviewer]};
      }
    }
  }
};

export function getInterviewersForDay(state, providedDay) {
  const dayObj = state.days.find(day => {
    return day.name === providedDay;
  })
  
  if (!dayObj) {
    return [];
  }
  
  return dayObj.interviewers.map((interviewerID) => {
    return state.interviewers[interviewerID];
  })
};
