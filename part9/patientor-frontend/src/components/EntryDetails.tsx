import React from "react";
import {
  HealthCheckEntryProps,
  HospitalEntryProps,
  OccupationalHealthcareEntryProps,
  Entry,
} from "../types";
import { useStateValue } from "../state";
import { Segment, Icon } from "semantic-ui-react";

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({
  entry,
  diagnoses,
}) => (
  <Segment>
    <p>
      <b>{entry.date}</b> <Icon name="doctor" />
    </p>
    <p>{entry.description}</p>
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode) => (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoses[diagnosisCode].name}
        </li>
      ))}
    </ul>
    <p>
      {Number(entry.healthCheckRating) === 0 ? (
        <Icon name="heart" color="green" />
      ) : (
        <Icon name="heart" color="yellow" />
      )}
    </p>
  </Segment>
);

const OccupationalHealthcareEntry: React.FC<OccupationalHealthcareEntryProps> = ({
  entry,
  diagnoses,
}) => (
  <Segment>
    <p>
      <b>{entry.date}</b> <Icon name="first aid" />
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
  </Segment>
);

const HospitalEntry: React.FC<HospitalEntryProps> = ({ entry, diagnoses }) => (
  <Segment>
    <p>
      <b>{entry.date}</b> <Icon name="hospital" />
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
  </Segment>
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
