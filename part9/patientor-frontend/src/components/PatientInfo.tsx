import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Patient, HospitalEntry } from "../types";
import EntryDetails from "./EntryDetails";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";
import { useStateValue } from "../state";
import { addEntry } from "../state/reducer";

interface PatientProps {
  patient: Patient | null;
}

const PatientInfo = ({ patient }: PatientProps) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (patient) {
    const submitNewEntry = async (values: any) => {
      try {
        const { data: newEntry } = await axios.post<HospitalEntry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry));
        closeModal();
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
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Patient</Button>
      </div>
    );
  }
  return <></>;
};

export default PatientInfo;
