import express from "express";
import patientService from "../services/patientsService";
import { NewEntry } from "../types";
import {
  toNewPatient,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
  toNewHealthCheckEntry,
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log("in here");
  const addNewEntry = (entry: NewEntry) => {
    const addedEntry = patientService.addEntry(req.params.id, entry);
    res.json(addedEntry);
  };

  let entry = null;

  try {
    const { body } = req;
    switch (body.type) {
      case "HealthCheck":
        entry = toNewHealthCheckEntry(body);
        addNewEntry(entry);
        break;
      case "Hospital":
        entry = toNewHospitalEntry(body);
        addNewEntry(entry);
        break;
      case "OccupationalHealthcare":
        entry = toNewOccupationalHealthcareEntry(body);
        addNewEntry(entry);
        break;
      default:
        throw new Error(`${body.type} is not a valid type`);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
