import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { HospitalEntryFormValues } from "./AddHospitalEntryForm";
import { HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";
import { OccupationalHealthcareEntryFormValues } from "./AddOccupationalHealthcareEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit?: (
    values:
      | HospitalEntryFormValues
      | HealthCheckEntryFormValues
      | OccupationalHealthcareEntryFormValues
  ) => void;
  error?: string;
  child: React.ReactNode;
}

const AddEntryModal: React.FC<Props> = ({
  modalOpen,
  onClose,
  error,
  child,
}) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {child}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
