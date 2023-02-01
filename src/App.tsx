import { useEffect, useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddStatusModal from "./layouts/AddStatusModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";
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
  const [showSideNav, setShowSideNav] = useState(false);

  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditStatusesModal, setShowEditStatusesModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [data, setData] = useState<DataType>(null!);
  const [currentBoard, setCurrentBoard] = useState("");
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const savedDataString = localStorage.getItem("data") ?? "";

    if (!savedDataString) {
      setData({ boards: [] });
      return;
    }
    const data = JSON.parse(savedDataString);
    if (data.boards?.length) {
      setCurrentBoard(data.boards[0].title);
    }
    setData(data);
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [{ ...data }]);

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
    setCurrentTask((prev) => {
      if (prev) {
        const subIdx = prev.subtasks.findIndex(
          (t) => t.title === subtask.title
        );
        prev.subtasks[subIdx].checked = value;
        return { ...prev };
      }
      return prev;
    });
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
    setCurrentTask((prev) => {
      if (prev) {
        prev.status = status;
        return { ...prev };
      }
      return prev;
    });
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

  function deleteTask(taskTitle: string) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );
      data.boards[boardIdx].tasks = data.boards[boardIdx].tasks.filter(
        (task) => task.title !== taskTitle
      );
      return { ...data };
    });
  }

  function updateTask(title: string, newData: any) {
    setData(() => {
      const boardIdx = data.boards.findIndex(
        (board) => board.title === currentBoard
      );

      const taskIdx = data.boards[boardIdx].tasks.findIndex(
        (status) => status.title === title
      );

      data.boards[boardIdx].tasks[taskIdx] = {
        ...data.boards[boardIdx].tasks[taskIdx],
        ...newData,
      };

      return { ...data };
    });
  }

  function saveBoard() {
    const board = data.boards.find((board) => board.title === currentBoard);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([JSON.stringify(board)], { type: "application/json" })
    );
    link.download = "board";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function loadBoard() {
    const fileUpload = document.createElement("input");
    fileUpload.type = "file";
    document.body.appendChild(fileUpload);
    fileUpload.click();
    fileUpload.addEventListener("change", (e: any) => {
      const reader = new FileReader();

      reader.onload = function () {
        const newBoard = JSON.parse(reader?.result as string);
        if(data.boards.find(board => board.title === newBoard.title)){
          alert("You already have a board with this title!");
          document.body.removeChild(fileUpload);
          return;
        }
        
        if(!newBoard.title || !newBoard.statuses || !newBoard.tasks){
          alert("The Document doesn't have the required specitication !");
          document.body.removeChild(fileUpload);
          return;
        }
        setData((prev) => {
          prev.boards.push(newBoard);
          return {
            ...prev,
          };
        });
      };
      if (e?.target?.files?.length) {
        reader.readAsText(e?.target?.files[0]);
      }

      document.body.removeChild(fileUpload);
    });
  }

  if (!data) return null;
  return (
    <div className="App">
      <EditTaskModal
        taskData={currentTask}
        show={showEditTaskModal}
        statuses={
          data.boards.find((board) => board.title === currentBoard)?.statuses ??
          []
        }
        handleDelete={deleteTask}
        handleSubmit={updateTask}
        handleClose={() => {
          setCurrentTask(null);
          setShowEditTaskModal(false);
        }}
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
        show={showSideNav}
        hideSideNav={() => setShowSideNav(false)}
        data={data}
        currentBoard={currentBoard}
        onSelect={(title) => setCurrentBoard(title)}
        showAddNewBoardModal={() => setShowAddBoardModal(true)}
      />
      <Header
        showSideNav={() => setShowSideNav(true)}
        currentBoard={currentBoard}
        deleteBoard={deleteBoard}
        saveBoard={saveBoard}
        loadBoard={loadBoard}
        showEditStatusesModal={() => setShowEditStatusesModal(true)}
        showAddNewTaskModal={() => setShowAddTaskModal(true)}
      />
      <main>
        <Board
          currentBoard={data.boards.find(
            (board) => board.title === currentBoard
          )}
          updateTask={updateTask}
          showAddTask={() => setShowAddTaskModal(true)}
          setCurrentTask={setCurrentTask}
          showTaskModal={() => setShowTaskModal(true)}
          showAddNewStatusModal={() => setShowAddStatusModal(true)}
        />
      </main>
    </div>
  );
}
