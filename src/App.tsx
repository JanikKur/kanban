import { useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddStatusModal from "./layouts/AddStatusModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";
import kanban from "./data";

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

  return (
    <div className="App">
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
          showAddNewStatusModal={() => setShowAddStatusModal(true)}
        />
      </main>
    </div>
  );
}
