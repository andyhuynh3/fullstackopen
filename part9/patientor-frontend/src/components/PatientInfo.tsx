import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Patient, Entry } from "../types";
import EntryDetails from "./EntryDetails";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";
import { useStateValue } from "../state";
import { addEntry } from "../state/reducer";
import AddHospitalEntryForm from "../AddEntryModal/AddHospitalEntryForm";
import AddHealthCheckEntryForm from "../AddEntryModal/AddHealthCheckEntryForm";
import AddOccupationalHealthcareEntryForm from "../AddEntryModal/AddOccupationalHealthcareEntryForm";

interface PatientProps {
  patient: Patient | null;
}

const PatientInfo = ({ patient }: PatientProps) => {
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(
    false
  );
  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<
    boolean
  >(false);
  const [
    occupationalHealthcareModalOpen,
    setOccupationalHealthcareModalOpen,
  ] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [, dispatch] = useStateValue();

  const openHospitalModel = (): void => setHospitalModalOpen(true);
  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openOccupationalHealthcareModal = (): void =>
    setOccupationalHealthcareModalOpen(true);

  const closeHospitalModel = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };
  const closeOccupationalHealthcareModal = (): void => {
    setOccupationalHealthcareModalOpen(false);
    setError(undefined);
  };

  if (patient) {
    const submitNewEntry = async (values: any) => {
      try {
        console.log(values);
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry));
        closeHospitalModel();
        closeHealthCheckModal();
        closeOccupationalHealthcareModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    return (
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" ? (
            <Icon name="mars" />
          ) : (
            <Icon name="venus" />
          )}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        ))}
        <AddEntryModal
          modalOpen={hospitalModalOpen}
          error={error}
          onClose={closeHospitalModel}
          child={
            <AddHospitalEntryForm
              onSubmit={submitNewEntry}
              onCancel={closeHospitalModel}
            />
          }
        />
        <AddEntryModal
          modalOpen={healthCheckModalOpen}
          error={error}
          onClose={closeHealthCheckModal}
          child={
            <AddHealthCheckEntryForm
              onSubmit={submitNewEntry}
              onCancel={closeHealthCheckModal}
            />
          }
        />
        <AddEntryModal
          modalOpen={occupationalHealthcareModalOpen}
          error={error}
          onClose={closeHealthCheckModal}
          child={
            <AddOccupationalHealthcareEntryForm
              onSubmit={submitNewEntry}
              onCancel={closeOccupationalHealthcareModal}
            />
          }
        />
        <Button onClick={() => openHospitalModel()}>Add Hospital Entry</Button>
        <Button onClick={() => openHealthCheckModal()}>
          Add Health Check Entry
        </Button>
        <Button onClick={() => openOccupationalHealthcareModal()}>
          Add Occupational Healthcare Entry
        </Button>
      </div>
    );
  }
  return <></>;
};

export default PatientInfo;
