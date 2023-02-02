import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import "../styles/layouts/add_modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useData } from "../contexts/DataContext";

export default function EditTaskModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const statusRef = useRef<HTMLSelectElement>(null!);

  const {
    data,
    currentBoard,
    currentTask: taskData,
    updateTask,
    deleteTask,
  } = useData();

  const statuses =
    data.boards.find((board) => board.title === currentBoard)?.statuses ?? [];

  function updateSubTask(prevValue: string, newValue: string) {
    setSubTasks((prev) => [
      ...prev.filter((elem) => elem !== prevValue),
      newValue,
    ]);
  }

  useEffect(() => {
    setSubTasks(taskData?.subtasks.map((task) => task.title) ?? []);
  }, [taskData]);

  if (!taskData) return null;
  return (
    <>
      {show ? (
        <Modal show={show} handleClose={handleClose} className="add-modal">
          <h2>Edit Task</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              updateTask(taskData.title, {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                status: statusRef.current.value,
                subtasks: [
                  ...subTasks.map((task) => {
                    return {
                      title: task,
                      checked:
                        taskData.subtasks.find((t) => t.title === task)
                          ?.checked || false,
                    };
                  }),
                ],
              });
              handleClose();
            }}
          >
            <div className="form-group">
              <label>Title</label>
              <input
                autoFocus
                type="text"
                defaultValue={taskData.title}
                ref={titleRef}
                placeholder="e.g. Take coffee break"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                ref={descriptionRef}
                defaultValue={taskData.description}
                placeholder="e.g. It's always good to take a break. This 15 minute break will reacharge the batteries a little."
              />
            </div>
            <div className="form-group subtasks">
              <label>Subtasks</label>
              {subTasks
                .sort()
                .reverse()
                .map((subTask, idx) => (
                  <SubtaskInput
                    key={idx}
                    value={subTask}
                    onChange={(newText: string) =>
                      updateSubTask(subTask, newText)
                    }
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
              <select defaultValue={taskData.status} ref={statusRef}>
                {statuses.map((status, idx) => (
                  <option key={idx} value={status.title}>
                    {status.title}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary">
              Update Task
            </button>
            <button
              className="btn-primary delete"
              onClick={(e) => {
                e.preventDefault();
                deleteTask(taskData.title);
                handleClose();
              }}
            >
              Delete Task
            </button>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
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
        required
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
