import React from "react";
import { PartProps } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimaned union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
    case "Typescript course":
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercise Count: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercise Count: {coursePart.exerciseCount}</p>
          <p>Group Project Count: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>Name: {coursePart.name}</p>
          <p>Exercise Count: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
