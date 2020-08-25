import React from "react";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";

interface PatientProps {
  patient: Patient | null;
}

const PatientInfo = ({ patient }: PatientProps) => {
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" ? (
            <Icon name="mars" />
          ) : (
            <Icon name="venus" />
          )}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  }
  return <></>;
};

export default PatientInfo;
