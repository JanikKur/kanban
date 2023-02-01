import React from "react";
import { TaskType } from "../App";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import "../styles/layouts/task_modal.css";
import { AiFillEdit } from "react-icons/ai";

export default function TaskModal({
  show,
  task,
  statuses,
  showEditTaskModal,
  toggleChecked,
  onStatusChange,
  handleClose,
}: {
  show: boolean;
  task: TaskType | null;
  statuses: { title: string; color: string }[];
  showEditTaskModal: () => void;
  toggleChecked: (
    taskTitle: string,
    subtask: { title: string; checked: boolean },
    value: boolean
  ) => void;
  onStatusChange: (taskTitle: string, status: string) => void;
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
        <button
          className="menu-btn"
          onClick={() => {
            showEditTaskModal();
            handleClose();
          }}
        >
          <AiFillEdit />
        </button>
      </div>
      <p>{task.description}</p>
      <div className="form-group">
        <label>
          Subtasks ({getNumberOfCompletedSubTasks()} of {task.subtasks.length})
        </label>
        {task.subtasks.map((subtask, idx) => {
          return (
            <div
              key={idx}
              className={`subtask ${subtask.checked ? "checked" : ""}`}
              onClick={() =>
                toggleChecked(task.title, subtask, !subtask.checked)
              }
            >
              <input
                type="checkbox"
                checked={subtask.checked}
              />{" "}
              {subtask.title}
            </div>
          );
        })}
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.title, e.target.value)}
        >
          {statuses.map((status, idx) => (
            <option key={idx} value={status.title}>
              {status.title}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
