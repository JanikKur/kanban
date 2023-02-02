import React from "react";
import { TaskType, useData } from "../contexts/DataContext";
import "../styles/layouts/board.css";

export default function Board({
  showAddNewStatusModal,
  showTaskModal,
  setCurrentTask,
  showAddTask,
}: {
  showAddNewStatusModal: () => void;
  showTaskModal: () => void;
  showAddTask: () => void;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
}) {
  const { data, currentBoard: currentBoardString, updateTask } = useData();

  const currentBoard = data.boards.find(
    (board) => board.title === currentBoardString
  );

  function getTaskCountForStatus(status: string) {
    return (
      currentBoard?.tasks.filter((task) => task.status === status).length ?? 0
    );
  }

  function getNumberOfCompletedSubTasks(task: TaskType) {
    return task.subtasks.filter((subtask) => subtask.checked).length;
  }

  function handleOnDrag(e: React.DragEvent, task: TaskType) {
    e.dataTransfer.setData("task", JSON.stringify(task));
  }

  function handleOnDrop(e: React.DragEvent, status: string) {
    const task: TaskType = JSON.parse(e.dataTransfer.getData("task"));
    task.status = status;
    updateTask(task.title, task);
  }

  function handleOnDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  if (!currentBoard) return <h2>No Board Selected</h2>;
  return (
    <section className="board">
      {currentBoard.statuses.map((status, idx_b) => {
        return (
          <div
            className="col"
            key={idx_b}
            onDrop={(e) => handleOnDrop(e, status.title)}
            onDragOver={(e) => handleOnDragOver(e)}
          >
            <label className="col-title" tabIndex={0} onClick={showAddTask}>
              <div
                className="color"
                style={{ backgroundColor: status.color }}
              ></div>
              {status.title} ({getTaskCountForStatus(status.title)})
            </label>
            {!currentBoard.tasks.filter((task) => task.status === status.title)
              .length ? (
              <p className="no-tasks">No Tasks created yet</p>
            ) : (
              ""
            )}
            {currentBoard.tasks
              .filter((task) => task.status === status.title)
              .map((task, idx) => (
                <Task
                  key={idx}
                  taskData={task}
                  setCurrentTask={setCurrentTask}
                  showTaskModal={showTaskModal}
                  handleOnDrag={handleOnDrag}
                  completedSubTasks={getNumberOfCompletedSubTasks(task)}
                />
              ))}
          </div>
        );
      })}

      <button onClick={showAddNewStatusModal} className="col add-bol-btn">
        + New Column
      </button>
    </section>
  );
}

function Task({
  setCurrentTask,
  showTaskModal,
  handleOnDrag,
  taskData,
  completedSubTasks,
}: {
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  showTaskModal: () => void;
  completedSubTasks: number;
  taskData: TaskType;
  handleOnDrag: (e: React.DragEvent, taskData: TaskType) => void;
}) {
  return (
    <button
      draggable
      className="todo-btn"
      onDragStart={(e) => handleOnDrag(e, taskData)}
      onClick={() => {
        setCurrentTask(taskData);
        showTaskModal();
      }}
    >
      <span className="title">{taskData.title}</span>
      <span className="subtasks">
        {completedSubTasks} of {taskData.subtasks.length} subtasks
      </span>
    </button>
  );
}
