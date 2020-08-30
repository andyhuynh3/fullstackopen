export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Health" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave: SickLeave;
  employerName: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
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
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const SET_CURRENT_PATIENT = "SET_CURRENT_PATIENT";
export const SET_DIAGNOSES_LIST = "SET_DIAGNOSES_LIST";
export const ADD_ENTRY = "ADD_ENTRY";
export interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

export interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

export interface AddEntryAction {
  type: typeof ADD_ENTRY;
  payload: Entry;
}

export interface SetCurrentPatientAction {
  type: typeof SET_CURRENT_PATIENT;
  payload: Patient;
}

export interface SetDiagnosesListAction {
  type: typeof SET_DIAGNOSES_LIST;
  payload: Diagnosis[];
}

export interface PatientsState {
  [id: string]: Patient;
}

export interface DiagnosesState {
  [code: string]: Diagnosis;
}

export type State = {
  patients: PatientsState;
  currentPatient: Patient | null;
  diagnoses: DiagnosesState;
};

export interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: DiagnosesState;
}

export interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: DiagnosesState;
}

export interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: DiagnosesState;
}
