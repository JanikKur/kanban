import React from "react";
import { TaskType } from "../App";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import "../styles/layouts/task_modal.css";

export default function TaskModal({
  show,
  task,
  handleClose,
}: {
  show: boolean;
  task: TaskType | null;
  handleClose: () => void;
}) {
  function getNumberOfCompletedSubTasks() {
    return task?.subtasks.filter((subtask) => subtask.checked).length ?? 0;
  }

  if (!task) return null;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      className="add-modal task-modal"
    >
      <div className="modal-title">
        <h2>{task.title}</h2>
      </div>
      <p>{task.description}</p>
      <div className="subtasks">
        <label>
          Subtasks ({getNumberOfCompletedSubTasks()} of {task.subtasks.length})
        </label>
        {task.subtasks.map((subtask) => {
          return (
            <div className="subtask">
              <input type="checkbox" checked={subtask.checked} />{" "}
              {subtask.title}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
