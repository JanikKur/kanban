import React, { useContext, useState, useEffect } from "react";
import { BoardType, DataType, TaskType } from "../App";

type DataContextType = {
  data: DataType;
  currentBoard: string;
  currentTask: TaskType | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
  addBoard: (title: string) => void;
  addTask: (
    title: string,
    description: string,
    status: string,
    subTasks: string[]
  ) => void;
  addStatus: (status: string, color: string) => void;
  toggleChecked: (
    taskTitle: string,
    subtask: { title: string; checked: boolean },
    value: boolean
  ) => void;
  onStatusChange: (taskTitle: string, status: string) => void;
  deleteStatus: (statusTitle: string) => void;
  updateStatus: (statusTitle: string, newData: any) => void;
  deleteBoard: () => void;
  deleteTask: (taskTitle: string) => void;
  updateTask: (title: string, newData: any) => void;
  saveBoard: () => void;
  loadBoard: () => void;
};

const DataContext = React.createContext<DataContextType>({
  data: null!,
  currentBoard: "",
  currentTask: null,
  setCurrentTask: () => {},
  setCurrentBoard: () => {},
  addBoard: () => {},
  addTask: () => {},
  addStatus: () => {},
  toggleChecked: () => {},
  onStatusChange: () => {},
  deleteStatus: () => {},
  updateStatus: () => {},
  deleteBoard: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  saveBoard: () => {},
  loadBoard: () => {},
});

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<DataType>(null!);
  const [currentBoard, setCurrentBoard] = useState("");
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
      setLoading(false);
    }
  }, [{ ...data }]);

  function addBoard(title: string) {
    setData((prev) => {
      if (!prev.boards.find((board) => board.title === title)) {
        prev.boards.push({ title: title, statuses: [], tasks: [] });
        setCurrentBoard(title);
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
      if (data.boards.length) {
        setCurrentBoard(data.boards[0].title);
      } else {
        setCurrentBoard("");
      }
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
        if (data.boards.find((board) => board.title === newBoard.title)) {
          alert("You already have a board with this title!");
          document.body.removeChild(fileUpload);
          return;
        }

        if (!newBoard.title || !newBoard.statuses || !newBoard.tasks) {
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
    });
    document.body.removeChild(fileUpload);
  }

  const value = {
    data,
    currentBoard,
    currentTask,
    setCurrentBoard,
    setCurrentTask,
    addBoard,
    addTask,
    addStatus,
    toggleChecked,
    onStatusChange,
    deleteStatus,
    updateStatus,
    deleteBoard,
    deleteTask,
    updateTask,
    saveBoard,
    loadBoard,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
