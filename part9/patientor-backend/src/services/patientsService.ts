import { NonSensitivePatient, Patient } from "../types";
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

const addPatient = (object: any): Patient => {
  const { name, ssn, dateOfBirth, occupation, gender } = object;
  const newPatient = {
    id: uuidv4(),
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  };
  patients = [...patients, newPatient];
  return newPatient;
};

export default { getPatients, addPatient };
