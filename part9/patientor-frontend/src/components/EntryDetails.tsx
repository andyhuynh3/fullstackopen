import React from "react";
import {
  HealthCheckEntryProps,
  HospitalEntryProps,
  OccupationalHealthcareEntryProps,
  Entry,
} from "../types";
import { useStateValue } from "../state";

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({
  entry,
  diagnoses,
}) => (
  <div>
    <p>
      {entry.date} {entry.type}
    </p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode) => (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoses[diagnosisCode].name}
        </li>
      ))}
    </ul>
    {/* <p>{entry.specialist}</p>
    <p>{entry.healthCheckRating}</p> */}
  </div>
);

const OccupationalHealthcareEntry: React.FC<OccupationalHealthcareEntryProps> = ({
  entry,
  diagnoses,
}) => (
  <div>
    <p>
      {entry.date} {entry.type}
    </p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode) => (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoses[diagnosisCode].name}
        </li>
      ))}
    </ul>
    {/* <p>{entry.employerName}</p> */}
  </div>
);

const HospitalEntry: React.FC<HospitalEntryProps> = ({ entry, diagnoses }) => (
  <div>
    <p>
      {entry.date} {entry.type}
    </p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode) => (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoses[diagnosisCode].name}
        </li>
      ))}
    </ul>
    {/* <p>{entry.discharge}</p> */}
  </div>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
