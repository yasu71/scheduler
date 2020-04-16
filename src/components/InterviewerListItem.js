import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewListItem(props){

  const itemListClass = classNames("interviewers__item",{
    "interviewers__item--selected": props.selected
  });

  return (
    <li 
    className={itemListClass}
    onClick={props.setInterviewer}>
      <img 
        className="interviewers__item-image"
        // id={props.id}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
} 