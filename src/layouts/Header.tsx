import React, { useState } from "react";
import "../styles/layouts/header.css";
import { AiOutlineMore, AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Header({
  currentBoard,
  showEditStatusesModal,
  deleteBoard,
  showAddNewTaskModal,
}: {
  currentBoard: string;
  deleteBoard: () => void;
  showEditStatusesModal: () => void;
  showAddNewTaskModal: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  function Menu({ show }: { show: boolean }) {
    return (
      <div className={`menu ${show ? "show" : ""}`}>
        <button
          className="menu-icon-btn"
          onClick={() => {
            if (confirm("Are you sure you want to delete the Board?")) {
              deleteBoard();
            }
          }}
        >
          <AiFillDelete /> <span>Delete Board</span>
        </button>
        <button className="menu-icon-btn" onClick={showEditStatusesModal}>
          <AiFillEdit /> <span>Edit Columns</span>
        </button>
      </div>
    );
  }

  return (
    <header className="main-header">
      <h1>{currentBoard}</h1>
      {currentBoard ? (
        <>
          <div className="user-interaction">
            <button onClick={showAddNewTaskModal} className="add-task-btn">
              + Add New Task
            </button>
            <button
              className="menu-btn"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <AiOutlineMore />
            </button>
          </div>
          <Menu show={showMenu} />
        </>
      ) : (
        ""
      )}
    </header>
  );
}
