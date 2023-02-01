import React from "react";
import { BoardType, TaskType } from "../App";
import "../styles/layouts/board.css";

export default function Board({
  showAddNewStatusModal,
  currentBoard,
}: {
  showAddNewStatusModal: () => void;
  currentBoard: BoardType | undefined;
}) {
  function getTaskCountForStatus(status: string) {
    return (
      currentBoard?.tasks.filter((task) => task.status === status).length ?? 0
    );
  }

  function getNumberOfCompletedSubTasks(task: TaskType) {
    return task.subtasks.filter((subtask) => subtask.checked).length;
  }

  if (!currentBoard) return <h2>No Board Selected</h2>;
  return (
    <section className="board">
      {currentBoard.statuses.map((status) => {
        return (
          <div className="col">
            <label className="col-title">
              <div
                className="color"
                style={{ backgroundColor: status.color }}
              ></div>
              {status.title} ({getTaskCountForStatus(status.title)})
            </label>
            {currentBoard.tasks
              .filter((task) => task.status === status.title)
              .map((task) => {
                return (
                  <button className="todo-btn">
                    <span className="title">{task.title}</span>
                    <span className="subtasks">
                      {getNumberOfCompletedSubTasks(task)} of{" "}
                      {task.subtasks.length} subtasks
                    </span>
                  </button>
                );
              })}
          </div>
        );
      })}

      <button onClick={showAddNewStatusModal} className="col add-bol-btn">
        + New Column
      </button>
    </section>
  );
}
