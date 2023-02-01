import { useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddStatusModal from "./layouts/AddStatusModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";
import kanban from "./data";
import TaskModal from "./layouts/TaskModal";
import EditStatusesModal from "./layouts/EditStatusesModal";
import EditTaskModal from "./layouts/EditTaskModal";

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
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditStatusesModal, setShowEditStatusesModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
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
      const boardIdx = prev.boards.findIndex(
        (board) => board.title === currentBoard
      );
      if (prev.boards[boardIdx].tasks.find((task) => task.title === title)) {
        return prev;
      }
      prev.boards[boardIdx].tasks.push({
        title,
        description,
        status,
        subtasks: subTasks.map((task) => {
          return { title: task, checked: false };
        }),
      });
      return { ...prev };
    });
  }

  function addStatus(status: string, color: string) {
    setData((prev) => {
      const boardIdx = prev.boards.findIndex(
        (board) => board.title === currentBoard
      );

      if (
        prev.boards[boardIdx].statuses.find((stat) => stat.title === status)
      ) {
        return prev;
      }
      prev.boards[boardIdx].statuses.push({
        title: status,
        color: color,
      });
      return { ...prev };
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

  function deleteStatus(statusTitle: string) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );

      data.boards[boardIdx].statuses = data.boards[boardIdx].statuses.filter(
        (status) => status.title !== statusTitle
      );

      return { ...data };
    });
  }

  function updateStatus(statusTitle: string, newData: any) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );

      const statusIdx = data.boards[boardIdx].statuses.findIndex(
        (status) => status.title === statusTitle
      );

      data.boards[boardIdx].statuses[statusIdx] = {
        ...data.boards[boardIdx].statuses[statusIdx],
        ...newData,
      };

      return { ...data };
    });
  }

  function deleteBoard() {
    setData(() => {
      data.boards = data.boards.filter((board) => board.title !== currentBoard);
      setCurrentBoard("");
      return { ...data };
    });
  }

  return (
    <div className="App">
      <EditTaskModal
        taskData={currentTask}
        show={showEditTaskModal}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        handleSubmit={addTask}
        handleClose={() => setShowEditTaskModal(false)}
      />
      <EditStatusesModal
        show={showEditStatusesModal}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        handleChange={updateStatus}
        handleDelete={deleteStatus}
        handleClose={() => setShowEditStatusesModal(false)}
      />
      <TaskModal
        show={showTaskModal}
        task={currentTask}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        onStatusChange={onStatusChange}
        showEditTaskModal={() => setShowEditTaskModal(true)}
        toggleChecked={toggleChecked}
        handleClose={() => setShowTaskModal(false)}
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
        deleteBoard={deleteBoard}
        showEditStatusesModal={() => setShowEditStatusesModal(true)}
        showAddNewTaskModal={() => setShowAddTaskModal(true)}
      />
      <main>
        <Board
          currentBoard={data.boards.find(
            (board) => board.title === currentBoard
          )}
          setCurrentTask={setCurrentTask}
          showTaskModal={() => setShowTaskModal(true)}
          showAddNewStatusModal={() => setShowAddStatusModal(true)}
        />
      </main>
    </div>
  );
}
