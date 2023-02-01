import React from "react";
import "../styles/layouts/side_navigation.css";
import { CiViewTable } from "react-icons/ci";
import { DataType } from "../App";

export default function SideNavigation({
  data,
  showAddNewBoardModal,
  currentBoard,
  onSelect,
}: {
  data: DataType;
  showAddNewBoardModal: () => void;
  currentBoard: string;
  onSelect: (title: string) => void;
}) {
  function BoardSelection() {
    return (
      <div className="boards">
        <label>All Boards ({data.boards.length})</label>
        {data.boards.map(({ title }, idx) => {
          return (
            <button
              onClick={() => onSelect(title)}
              key={idx}
              className={`board-selection-btn ${
                currentBoard === title ? "selected" : ""
              }`}
            >
              <CiViewTable /> <span>{title}</span>
            </button>
          );
        })}
        <button
          onClick={() => showAddNewBoardModal()}
          className="board-selection-btn add-btn"
        >
          <CiViewTable /> + <span>Create New Board</span>
        </button>
      </div>
    );
  }

  return (
    <nav className="side-nav">
      <div className="logo">kanban</div>
      <BoardSelection />
    </nav>
  );
}
