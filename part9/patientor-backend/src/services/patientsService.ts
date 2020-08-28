import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry,
} from "../types";
import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

let patients = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = {
    id: uuidv4(),
    entries: [],
    ...newPatient,
  };
  patients = [...patients, addedPatient];
  return addedPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const addedEntry = {
    id: uuidv4(),
    ...entry,
  };
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient) {
    patient.entries = [...patient?.entries, addedEntry];
    patients = patients.map((p) => (p.id === patientId ? patient : p));
    return addedEntry;
  } else {
    throw new Error(`Cannot find patient with ID ${patientId}`);
  }
};

export default { getPatients, addPatient, getPatient, addEntry };
