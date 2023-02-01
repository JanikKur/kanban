import React from "react";
import kanban from "../data";
import "../styles/layouts/side_navigation.css";
import { CiViewTable } from "react-icons/ci";

export default function SideNavigation({
  showAddNewBoardModal,
}: {
  showAddNewBoardModal: () => void;
}) {
  function BoardSelection() {
    return (
      <div className="boards">
        <label>All Boards ({kanban.boards.length})</label>
        {kanban.boards.map(({ title }) => {
          return (
            <button className="board-selection-btn">
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
