import React from "react";
import { BoardType, TaskType } from "../App";
import "../styles/layouts/board.css";

export default function Board({
  showAddNewStatusModal,
  setCurrentTask,
  currentBoard,
}: {
  showAddNewStatusModal: () => void;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
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
      {currentBoard.statuses.map((status, idx_b) => {
        return (
          <div className="col" key={idx_b}>
            <label className="col-title">
              <div
                className="color"
                style={{ backgroundColor: status.color }}
              ></div>
              {status.title} ({getTaskCountForStatus(status.title)})
            </label>
            {currentBoard.tasks
              .filter((task) => task.status === status.title)
              .map((task, idx) => {
                return (
                  <button
                    key={idx}
                    className="todo-btn"
                    onClick={() => setCurrentTask(task)}
                  >
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
