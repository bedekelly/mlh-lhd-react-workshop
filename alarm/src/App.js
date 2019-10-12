import React, { useState, useReducer, useEffect } from "react";
import "./App.css"

/*
Alarms: enabled/disabled
Door: open/closed
Alarms: triggered/silent

Enable/disable alarms
Open/close door
Reset
 */

const initialState = {
  alarmsTriggered: false,
  doorOpen: false,
  alarmsEnabled: false
};



// reducer : state, action => newState
function reducer(state, action) {
  switch(action.type) {
    case "ENABLE_ALARMS":
      return {...state, alarmsEnabled: true};
    case "DISABLE_ALARMS":
      return {...state, alarmsEnabled: false};
    case "RESET_ALARMS":
      return {...state, alarmsTriggered: false};
    case "CLOSE_DOOR":
      return {...state, doorOpen: false};

    case "OPEN_DOOR":
      if (state.alarmsEnabled) {
        return {...state, alarmsTriggered: true}
      } else {
        return {...state, doorOpen: true}
      }
    default:
      console.log(state, action);
  }
}

const enableAlarms = {
  type: "ENABLE_ALARMS"
};

const disableAlarms = {
  type: "DISABLE_ALARMS"
};

const reset = {
  type: "RESET_ALARMS"
};

const openDoor = {
  type: "OPEN_DOOR"
};

const closeDoor = {
  type: "CLOSE_DOOR"
};


export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { alarmsTriggered, doorOpen, alarmsEnabled } = state;


  useEffect(() => {
    document.title = alarmsTriggered ? "* ALARMS SOUNDING *" : "";
  }, [alarmsTriggered]);


  return <div className={alarmsTriggered ? "red": ""}>
    <h1>{ doorOpen ? "Door is Open" : "Door is shut" }</h1>
    {
      doorOpen ?
        <button onClick={() => dispatch(closeDoor)}>Close</button>
        : <button onClick={() => dispatch(openDoor)}>Open</button>
    }


    <h1>{ alarmsEnabled ? "Alarms enabled" : "Alarms disabled" }</h1>
    {
      alarmsEnabled ?
        <button onClick={() => dispatch(disableAlarms)}>Disable</button>
        : <button onClick={() => dispatch(enableAlarms)}>Enable</button>
    }

    { alarmsTriggered && <h1>Alarms sounding!</h1> }
    { alarmsTriggered && <button onClick={() => dispatch(reset)}>Reset</button> }
  </div>
}
