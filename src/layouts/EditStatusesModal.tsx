import React from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import { AiOutlineClose } from "react-icons/ai";

export default function EditStatusesModal({
  show,
  statuses,
  handleChange,
  handleDelete,
  handleClose,
}: {
  show: boolean;
  statuses: { title: string; color: string }[];
  handleChange: (title: string, newData: any) => void;
  handleDelete: (statusTitle: string) => void;
  handleClose: () => void;
}) {

  return (
    <Modal show={show} handleClose={handleClose} className="add-modal edit-statuses">
      <h2>Edit Columns</h2>
      <div className="form-group subtasks">
        {statuses.map((status, idx) => (
          <StatusInput
            key={idx}
            value={status.title}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </Modal>
  );
}
function StatusInput({
  value,
  onChange,
  onDelete,
}: {
  value: string;
  onChange: (title: string, newData: any) => void;
  onDelete: (text: string) => void;
}) {
  return (
    <div className="subtask">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(value, { title: e.target.value })}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(value);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}
