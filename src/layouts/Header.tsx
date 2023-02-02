import React, { useState } from "react";
import "../styles/layouts/header.css";
import {
  AiOutlineMore,
  AiFillDelete,
  AiFillEdit,
  AiOutlineMenu,
  AiOutlineDownload,
  AiOutlineUpload,
} from "react-icons/ai";
import { useData } from "../contexts/DataContext";

export default function Header({
  showSideNav,
  showEditStatusesModal,
  showAddNewTaskModal,
}: {
  showSideNav: () => void;
  showEditStatusesModal: () => void;
  showAddNewTaskModal: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const { currentBoard, deleteBoard, saveBoard, loadBoard } = useData();

  function Menu() {
    return (
      <div className={`menu ${showMenu ? "show" : ""}`}>
        {currentBoard ? (
          <>
            <button
              className="menu-icon-btn"
              tabIndex={showMenu ? 0 : -1}
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
              tabIndex={showMenu ? 0 : -1}
              onClick={() => {
                setShowMenu(false);
                showEditStatusesModal();
              }}
            >
              <AiFillEdit /> <span>Edit Columns</span>
            </button>
            <button
              className="menu-icon-btn"
              tabIndex={showMenu ? 0 : -1}
              onClick={() => {
                setShowMenu(false);
                saveBoard();
              }}
            >
              <AiOutlineUpload /> <span>Save Board</span>
            </button>{" "}
          </>
        ) : (
          ""
        )}
        <button
          className="menu-icon-btn"
          tabIndex={showMenu ? 0 : -1}
          onClick={() => {
            setShowMenu(false);
            loadBoard();
          }}
        >
          <AiOutlineDownload /> <span>Load Board</span>
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
      <>
        <div className="user-interaction">
          {currentBoard ? (
            <button onClick={showAddNewTaskModal} className="add-task-btn">
              + Add New Task
            </button>
          ) : (
            ""
          )}
          <button
            className="menu-btn"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <AiOutlineMore />
          </button>
        </div>
        <Menu />
      </>
    </header>
  );
}
