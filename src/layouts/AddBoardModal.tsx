import React, { useRef } from "react";
import Modal from "../components/Modal";
import { useData } from "../contexts/DataContext";
import "../styles/layouts/add_modal.css";

export default function AddBoardModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const { addBoard } = useData();

  const titleRef = useRef<HTMLInputElement>(null!);
  return (
    <>
      {show ? (
        <Modal show={show} handleClose={handleClose} className="add-modal">
          <h2>Add New Board</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addBoard(titleRef.current.value);
              titleRef.current.value = "";
              handleClose();
            }}
          >
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                ref={titleRef}
                autoFocus
                placeholder="e.g. Take coffee break"
              />
            </div>
            <button type="submit" className="btn-primary">
              Add Board
            </button>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
