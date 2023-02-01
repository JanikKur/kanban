import React, { useRef, useState } from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

export default function AddTaskModal({
  show,
  statuses,
  handleSubmit,
  handleClose,
}: {
  show: boolean;
  statuses: { title: string; color: string }[];
  handleSubmit: (
    title: string,
    description: string,
    status: string,
    subTasks: string[]
  ) => void;
  handleClose: () => void;
}) {
  const [subTasks, setSubTasks] = useState<string[]>([""]);
  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const statusRef = useRef<HTMLSelectElement>(null!);

  function updateSubTask(prevValue: string, newValue: string) {
    setSubTasks((prev) => [
      ...prev.filter((elem) => elem !== prevValue),
      newValue,
    ]);
  }

  return (
    <Modal show={show} handleClose={handleClose} className="add-modal">
      <h2>Add New Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(
            titleRef.current.value,
            descriptionRef.current.value,
            statusRef.current.value,
            subTasks
          );
          handleClose();
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            ref={titleRef}
            placeholder="e.g. Take coffee break"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            ref={descriptionRef}
            placeholder="e.g. It's always good to take a break. This 15 minute break will reacharge the batteries a little."
          />
        </div>
        <div className="form-group subtasks">
          <label>Subtasks</label>
          {subTasks.map((subTask, idx) => (
            <SubtaskInput
              key={idx}
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
          <select ref={statusRef}>
            {statuses.map((status, idx) => (
              <option key={idx} value={status.title}>
                {status.title}
              </option>
            ))}
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
