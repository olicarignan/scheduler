import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; 
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );


  const cancel = (id) => {
    transition(DELETING);
    return props.cancelInterview(id, props.day)
                .then(() => transition(EMPTY))
                .catch(() => transition(ERROR_DELETE));
  }

  const save = (name, interviewer) => {
    if (!name || !interviewer) {
      transition(ERROR_SAVE);
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    return props.bookInterview(props.id, interview)
                .then(() => transition(SHOW))
                .catch(() => {transition(ERROR_SAVE)});
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
          />
        )}
        {mode === EDIT && (
          <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => {save(name, interviewer)}}
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
          message={"delete appointment?"}
          onConfirm={() => {cancel(props.id)}}
          onCancel={() => {back()}}
          />
        )}
        {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(name, interviewer) => {save(name, interviewer)}}
        />
      )}
      {mode === SAVING && (
        <Status 
        message='saving'
        />
      )}
      {mode === DELETING && (
        <Status 
        message='deleting'
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message="Could not save appointment"
        onClose={() => {back()}}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Could not delete appointment"
        onClose={() => {back()}}
        />
      )}
    </article>
  )
}