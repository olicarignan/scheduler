import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewerForDay
} from "helpers/selectors"; 

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    getSpotsForDay
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interviewers = getInterviewerForDay(state, state.day);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          getSpotsForDay={getSpotsForDay}
          appointments={state.appointments}
          days={state.days}
          day={state.day}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            selectedDay={state.day}
            setDay={setDay}
            getSpotsForDay={getSpotsForDay}
            appointments={state.appointments}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
