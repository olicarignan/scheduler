import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {


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
