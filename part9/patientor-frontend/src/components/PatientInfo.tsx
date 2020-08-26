import React from "react";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";

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
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
    );
  }
  return <></>;
};

export default PatientInfo;
