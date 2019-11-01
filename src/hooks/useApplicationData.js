import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    const { day, days, appointments, interviewers, id, interview } = action;
    switch (action.type) {
      case SET_DAY:
        return { ...state, day };
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: interview ? { ...interview } : null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        console.log("action", action);
        console.log("state", { ...state, appointments, day, id });

        return { ...state, appointments, id };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  //  --useReducer
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //  --setDay
  const setDay = day => dispatch({ type: SET_DAY, day });

  //  --Hook
  useEffect(() => {
    const days = axios.get("/api/days");
    const appointments = axios.get("/api/appointments");
    const interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  //  --cancelInterview
  const cancelInterview = id => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      })
      .catch(error => {
        return error;
      });
  };

  // --bookInterview
  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(res => {
        if (res.status === 204) {
          dispatch({ type: SET_INTERVIEW, id, interview });
        }
      })
      .catch(error => {
        return error;
      });
  };

  // --spotsCounter
  const getSpotsForDay = (appointments, days, day) => {
    const targetDay = days.find(target => target.name === day);
    const appointmentList = [...targetDay.appointments];
    const totalSpots = appointmentList.length;
    const appointmentsSpread = { ...appointments };

    const filledSpots = Object.values(appointmentsSpread).reduce(
      (total, appointment) => {
        if (appointmentList.includes(appointment.id)) {
          if (appointment.interview) {
            return total + 1;
          }
        }
        return total;
      },
      0
    );
    return totalSpots - filledSpots;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    getSpotsForDay
  };
}
