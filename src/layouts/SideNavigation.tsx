import React from "react";
import "../styles/layouts/side_navigation.css";
import { BsGrid1X2 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { DataType } from "../App";

export default function SideNavigation({
  show,
  data,
  showAddNewBoardModal,
  hideSideNav,
  currentBoard,
  onSelect,
}: {
  show:boolean;
  data: DataType;
  hideSideNav: () => void;
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
              <BsGrid1X2 /> <span>{title}</span>
            </button>
          );
        })}
        <button
          onClick={() => showAddNewBoardModal()}
          className="board-selection-btn add-btn"
        >
          <BsGrid1X2 /> + <span>Create New Board</span>
        </button>
      </div>
    );
  }

  return (
    <nav className={`side-nav ${show ? "show" : ""}`}>
      <div className="user-interaction">
        <div className="logo">kanban</div>
        <button className="menu-btn mobile" onClick={hideSideNav}>
          <AiOutlineClose />
        </button>
      </div>
      <BoardSelection />
    </nav>
  );
}
