import React from "react";
import { CoursePart, ContentProps } from "../types";

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        {courseParts.map((coursePart: CoursePart) => (
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        ))}
      </p>
    </div>
  );
};

export default Content;
