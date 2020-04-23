import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  
  function bookInterview(appointmentId, interview) {
    // console.log("interview", interview)
    const appointment = {
      ...state.appointments[appointmentId],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };
    // getting remaining spots
    // 1. getting the day that an appointment is saved
    const getDay = state.days.filter(day => {
      for (const id of day.appointments) {
        if (id === appointmentId) {
          return true;
        }
      } 
      return false;
    })[0];
    // 2. getting a spot of the day
    let spots;
    if (!state.appointments[appointmentId].interview) {
      spots = getDay.spots - 1;
    } else {
      spots = getDay.spots;
    }
    // 3. needs to update a spot value of the day by changing to the day
    const days = state.days.map(day => {
      if (day.id === getDay.id) {
        return {...day, spots};
      } else {
        return day;
      }
    });
    
    return axios.put(`http://localhost:8001/api/appointments/${appointment.id}`, appointment)
    .then(() => {
      setState({...state, appointments, days});
    })
  };

  function cancelInterview(appointmentId) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };
    // getting remaining spots
    const getDay = state.days.filter(day => {
      for (const id of day.appointments) {
        if (id === appointmentId) {
          return true;
        }
      } 
      return false;
    })[0];

    const spots = getDay.spots + 1;

    const days = state.days.map(day => {
      if (day.id === getDay.id) {
        return {...day, spots};
      } else {
        return day;
      }
    })
    return axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`, appointment)
    .then(() => {
      setState({...state, appointments, days});
    })
  };

  return { state, setDay, bookInterview, cancelInterview }
};