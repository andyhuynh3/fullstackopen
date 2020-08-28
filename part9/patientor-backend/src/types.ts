export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  Health = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export type NewEntry =
  | NewHealthCheckEntry
  | NewOccupationalHealthcareEntry
  | NewHospitalEntry;

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: SickLeave;
  employerName: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;
