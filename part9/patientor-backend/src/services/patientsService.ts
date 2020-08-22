import { NonSensitivePatient, Patient, NewPatient } from "../types";
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

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = {
    id: uuidv4(),
    ...newPatient,
  };
  patients = [...patients, addedPatient];
  return addedPatient;
};

export default { getPatients, addPatient };
