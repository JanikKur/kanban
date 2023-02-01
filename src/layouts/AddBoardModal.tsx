import React, { useRef } from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";

export default function AddBoardModal({
  show,
  handleSubmit,
  handleClose,
}: {
  show: boolean;
  handleSubmit: (title: string) => void;
  handleClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null!);
  return (
    <Modal show={show} handleClose={handleClose} className="add-modal">
      <h2>Add New Board</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(titleRef.current.value);
          titleRef.current.value = "";
          handleClose();
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            ref={titleRef}
            placeholder="e.g. Take coffee break"
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Board
        </button>
      </form>
    </Modal>
  );
}
