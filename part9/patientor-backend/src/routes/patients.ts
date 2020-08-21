import express from "express";
import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
