import { useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddStatusModal from "./layouts/AddStatusModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";
import kanban from "./data";
import TaskModal from "./layouts/TaskModal";

export type DataType = {
  boards: BoardType[];
};
export type BoardType = {
  title: string;
  statuses: { title: string; color: string }[];
  tasks: TaskType[];
};
export type TaskType = {
  title: string;
  description: string;
  subtasks: { title: string; checked: boolean }[];
  status: string;
};

export default function App() {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [data, setData] = useState<DataType>(kanban);
  const [currentBoard, setCurrentBoard] = useState("");
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  function addBoard(title: string) {
    setData((prev) => {
      if (!prev.boards.find((board) => board.title === title)) {
        prev.boards.push({ title: title, statuses: [], tasks: [] });
      }
      return prev;
    });
  }

  function addTask(
    title: string,
    description: string,
    status: string,
    subTasks: string[]
  ) {
    setData((prev) => {
      const newBoard = prev.boards.find(
        (board) => board.title === currentBoard
      );
      if (!newBoard) return prev;
      newBoard.tasks.push({
        title,
        description,
        status,
        subtasks: subTasks.map((task) => {
          return { title: task, checked: false };
        }),
      });
      const newBoards = prev.boards.filter(
        (board) => board.title !== currentBoard
      );
      newBoards.push(newBoard);
      prev.boards = newBoards;
      return prev;
    });
  }

  function addStatus(status: string, color: string) {
    setData((prev) => {
      const newBoard = prev.boards.find(
        (board) => board.title === currentBoard
      );
      if (!newBoard) return prev;
      if (newBoard.statuses.find((stat) => stat.title === status)) {
        return prev;
      }
      newBoard.statuses.push({
        title: status,
        color: color,
      });
      const newBoards = prev.boards.filter(
        (board) => board.title !== currentBoard
      );
      newBoards.push(newBoard);
      prev.boards = newBoards;
      console.log(prev);

      return prev;
    });
  }

  function toggleChecked(
    taskTitle: string,
    subtask: { title: string; checked: boolean },
    value: boolean
  ) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );

      const taskIdx = data.boards[boardIdx].tasks.findIndex(
        (task) => task.title === taskTitle
      );
      const subtaskIdx = data.boards[boardIdx].tasks[
        taskIdx
      ].subtasks.findIndex((stask) => stask.title === subtask.title);

      data.boards[boardIdx].tasks[taskIdx].subtasks[subtaskIdx].checked = value;

      return { ...data };
    });
  }

  function onStatusChange(taskTitle: string, status: string) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );

      const taskIdx = data.boards[boardIdx].tasks.findIndex(
        (task) => task.title === taskTitle
      );

      data.boards[boardIdx].tasks[taskIdx].status = status;

      return { ...data };
    });
  }

  return (
    <div className="App">
      <TaskModal
        show={currentTask ? true : false}
        task={currentTask}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        onStatusChange={onStatusChange}
        toggleChecked={toggleChecked}
        handleClose={() => setCurrentTask(null)}
      />
      <AddBoardModal
        show={showAddBoardModal}
        handleSubmit={addBoard}
        handleClose={() => setShowAddBoardModal(false)}
      />
      <AddStatusModal
        show={showAddStatusModal}
        handleSubmit={addStatus}
        handleClose={() => setShowAddStatusModal(false)}
      />
      <AddTaskModal
        show={showAddTaskModal}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        handleSubmit={addTask}
        handleClose={() => setShowAddTaskModal(false)}
      />
      <SideNavigation
        data={data}
        currentBoard={currentBoard}
        onSelect={(title) => setCurrentBoard(title)}
        showAddNewBoardModal={() => setShowAddBoardModal(true)}
      />
      <Header
        currentBoard={currentBoard}
        showAddNewTaskModal={() => setShowAddTaskModal(true)}
      />
      <main>
        <Board
          currentBoard={data.boards.find(
            (board) => board.title === currentBoard
          )}
          setCurrentTask={setCurrentTask}
          showAddNewStatusModal={() => setShowAddStatusModal(true)}
        />
      </main>
    </div>
  );
}
