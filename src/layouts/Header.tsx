import React, { useState } from "react";
import "../styles/layouts/header.css";
import {
  AiOutlineMore,
  AiFillDelete,
  AiFillEdit,
  AiOutlineMenu,
  AiOutlineDownload
} from "react-icons/ai";

export default function Header({
  currentBoard,
  showSideNav,
  showEditStatusesModal,
  deleteBoard,
  showAddNewTaskModal,
  saveBoard
}: {
  currentBoard: string;
  showSideNav: () => void;
  deleteBoard: () => void;
  showEditStatusesModal: () => void;
  showAddNewTaskModal: () => void;
  saveBoard: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  function Menu() {
    return (
      <div className={`menu ${showMenu ? "show" : ""}`}>
        <button
          className="menu-icon-btn"
          onClick={() => {
            setShowMenu(false);
            if (confirm("Are you sure you want to delete the Board?")) {
              deleteBoard();
            }
          }}
        >
          <AiFillDelete /> <span>Delete Board</span>
        </button>
        <button
          className="menu-icon-btn"
          onClick={() => {
            setShowMenu(false);
            showEditStatusesModal();
          }}
        >
          <AiFillEdit /> <span>Edit Columns</span>
        </button>
        <button
          className="menu-icon-btn"
          onClick={() => {
            setShowMenu(false);
            saveBoard();
          }}
        >
          <AiOutlineDownload /> <span>Save Board</span>
        </button>
      </div>
    );
  }

  return (
    <header className="main-header">
      <div className="user-interaction">
        <button onClick={showSideNav} className="menu-btn mobile">
          <AiOutlineMenu />
        </button>
        <h1>{currentBoard}</h1>
      </div>
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
          <Menu />
        </>
      ) : (
        ""
      )}
    </header>
  );
}
