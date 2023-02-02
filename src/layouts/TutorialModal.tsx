import React, { useState } from "react";
import Modal from "../components/Modal";
import AddBoardImage from "../assets/images/addBoard.jpg";
import AddColumnImage from "../assets/images/addColumn.jpg";
import AddTaskImage from "../assets/images/addTask.jpg";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export default function TutorialModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const images = [AddBoardImage, AddColumnImage, AddTaskImage];
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      className="add-modal tut-modal"
    >
      <>
        <h1>Introduction</h1>
        <button
          onClick={() => setImgIdx((prev) => (prev + 1) % images.length)}
          className="img-btn right"
        >
          <AiOutlineRight />
        </button>
        <button
          className="img-btn left"
          onClick={() =>
            setImgIdx((prev) => {
              prev -= 1;
              if (prev < 0) {
                prev = images.length + prev;
              }
              return prev;
            })
          }
        >
          <AiOutlineLeft />
        </button>
        {images.map((image, idx) => {
          return (
            <img
              key={idx}
              src={image}
              className={`tut-img ${imgIdx === idx ? "show" : ""}`}
            />
          );
        })}
      </>
    </Modal>
  );
}
