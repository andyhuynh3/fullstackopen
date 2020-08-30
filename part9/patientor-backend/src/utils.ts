/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  Diagnose,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isArray = (arr: any): boolean => {
  return Array.isArray(arr);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing gender: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseName = (name: string): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDate = (date: string): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSSN = (ssn: string): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: string): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseDescription = (description: string): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing occupation: ${description}`);
  }
  return description;
};

const parseEmployerName = (employerName: string): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing occupation: ${employerName}`);
  }
  return employerName;
};

const parseSpecialist = (specialist: string): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: Array<Diagnose["code"]>
): Array<Diagnose["code"]> => {
  if (!diagnosisCodes || !isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}`);
  }
  for (const code of diagnosisCodes) {
    if (!isString(code)) {
      throw new Error(`Incorrect diagnosisCode type: ${code}`);
    }
  }
  return diagnosisCodes;
};

const isDischarge = (param: any): param is Discharge => {
  return "date" in param && "criteria" in param;
};

const parseDischarge = (param: any): Discharge => {
  if (!param || !isDischarge(param)) {
    throw new Error(`Incorrect or missing discharge: ${param}`);
  }
  if (!isString(param.date) || !isDate(param.date)) {
    throw new Error(`Incorrect type for ${param.date} property of Discharge`);
  }
  if (!isString(param.criteria)) {
    throw new Error(
      `Incorrect type for ${param.criteria} property of Discharge`
    );
  }
  return param;
};

const isSickLeave = (param: any): param is SickLeave => {
  return "startDate" in param && "endDate" in param;
};

const parseSickLeave = (param: any): SickLeave => {
  if (!param || !isSickLeave(param)) {
    throw new Error(`Incorrect or missing SickLeave: ${param}`);
  }
  if (!isString(param.endDate) || !isDate(param.endDate)) {
    throw new Error(
      `Incorrect type for ${param.endDate} property of SickLeave`
    );
  }
  if (!isString(param.startDate) || !isDate(param.startDate)) {
    throw new Error(
      `Incorrect type for ${param.startDate} property of SickLeave`
    );
  }
  return param;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };
};

export const toNewOccupationalHealthcareEntry = (
  object: any
): NewOccupationalHealthcareEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    sickLeave: parseSickLeave(object.sickLeave),
    employerName: parseEmployerName(object.employerName),
  };
};

export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};
