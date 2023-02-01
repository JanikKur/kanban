import React from "react";
import "../styles/layouts/header.css";
import { AiOutlineMore } from "react-icons/ai";

export default function Header({
  currentBoard,
  showAddNewTaskModal,
}: {
  currentBoard: string;
  showAddNewTaskModal: () => void;
}) {
  return (
    <header className="main-header">
      <h1>{currentBoard}</h1>
      <div className="user-interaction">
        <button onClick={showAddNewTaskModal} className="add-task-btn">
          + Add New Task
        </button>
        <button className="menu-btn">
          <AiOutlineMore />
        </button>
      </div>
    </header>
  );
}
