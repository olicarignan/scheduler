export function getAppointmentsForDay(state, day) {
  const appointmentsId = state.days
    .filter(e => e.name === day)
    .map(e => e.appointments)
    .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appointmentsId.forEach(e => {
    appointment.push(state.appointments[e]);
  });

  return appointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObject = { student, interviewer };
    return interviewObject;
  }
}

export function getInterviewerForDay(state, day) {
  const interviewerId = state.days
    .filter(e => e.name === day)
    .map(e => e.interviewers)
    .reduce((acc, val) => acc.concat(val), []);

  const interviewers = [];
  interviewerId.forEach(e => {
    interviewers.push(state.interviewers[e]);
  });

  return interviewers;
}
