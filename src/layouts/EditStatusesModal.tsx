import React from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useData } from "../contexts/DataContext";

export default function EditStatusesModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const {
    data,
    currentBoard,
    currentTask: taskData,
    updateStatus,
    deleteStatus,
  } = useData();

  const statuses =
    data.boards.find((board) => board.title === currentBoard)?.statuses ?? [];

  return (
    <>
      {show ? (
        <Modal
          show={show}
          handleClose={handleClose}
          className="add-modal edit-statuses"
        >
          <h2>Edit Columns</h2>
          <div className="form-group subtasks">
            {!statuses.length ? <p>No Columns Created Yet</p> : ""}
            {statuses.map((status, idx) => (
              <StatusInput
                key={idx}
                value={status.title}
                onChange={updateStatus}
                onDelete={deleteStatus}
              />
            ))}
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
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
