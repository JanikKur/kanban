import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

export default function AddTaskModal({
  show,
  handleSubmit,
  handleClose,
}: {
  show: boolean;
  handleSubmit: (title: string) => void;
  handleClose: () => void;
}) {
  const [subTasks, setSubTasks] = useState<string[]>([""]);

  function updateSubTask(prevValue: string, newValue: string) {
    setSubTasks((prev) => [
      ...prev.filter((elem) => elem !== prevValue),
      newValue,
    ]);
  }

  return (
    <Modal show={show} handleClose={handleClose} className="add-modal">
      <h2>Add New Task</h2>
      <form onSubmit={() => handleSubmit("")}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" placeholder="e.g. Take coffee break" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="e.g. It's always good to take a break. This 15 minute break will reacharge the batteries a little." />
        </div>
        <div className="form-group subtasks">
          <label>Subtasks</label>
          {subTasks.map((subTask) => (
            <SubtaskInput
              value={subTask}
              onChange={(newText: string) => updateSubTask(subTask, newText)}
              onDelete={(text) =>
                setSubTasks((prev: string[]) => [
                  ...prev.filter((task: string) => task !== text),
                ])
              }
            />
          ))}
          <button
            className="add-subclass-btn"
            onClick={(e) => {
              e.preventDefault();
              setSubTasks((prev) => [...prev, ""]);
            }}
          >
            + Add New Subtask
          </button>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select>
            <option>Todo</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">
          Create Task
        </button>
      </form>
    </Modal>
  );
}

function SubtaskInput({
  value,
  onChange,
  onDelete,
}: {
  value: string;
  onChange: (newText: string) => void;
  onDelete: (text: string) => void;
}) {
  return (
    <div className="subtask">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete(value);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
}
