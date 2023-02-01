import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import { SketchPicker, TwitterPicker } from 'react-color';
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
  const [color, setColor] = useState("");

  return (
    <Modal show={show} handleClose={handleClose} className="add-modal">
      <h2>Add New Column</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          
          handleSubmit(titleRef.current.value, color);
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
          <TwitterPicker color={color} className="test" onChange={e => setColor(e.hex)} styles={{}} />
        </div>
        <button type="submit" className="btn-primary">
          Add Column
        </button>
      </form>
    </Modal>
  );
}
