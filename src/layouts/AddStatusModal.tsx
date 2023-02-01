import React, { useRef } from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";

export default function AddStatusModal({
  show,
  handleSubmit,
  handleClose,
}: {
  show: boolean;
  handleSubmit: (title: string, color: string) => void;
  handleClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null!);
  const colorRef = useRef<HTMLInputElement>(null!);

  return (
    <Modal show={show} handleClose={handleClose} className="add-modal">
      <h2>Add New Column</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(titleRef.current.value, colorRef.current.value);
          titleRef.current.value = "";
          handleClose();
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input type="text" ref={titleRef} placeholder="e.g. Important" required/>
        </div>
        <div className="form-group">
          <label>Color</label>
          <input type="color" ref={colorRef} placeholder="e.g. Important" />
        </div>
        <button type="submit" className="btn-primary">
          Add Column
        </button>
      </form>
    </Modal>
  );
}
