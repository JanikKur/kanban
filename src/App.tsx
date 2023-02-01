import { useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";

export default function App() {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  function addBoard(title: string) {}

  function addTask(title: string) {}

  return (
    <div className="App">
      <AddBoardModal
        show={showAddBoardModal}
        handleSubmit={addBoard}
        handleClose={() => setShowAddBoardModal(false)}
      />
      <AddTaskModal
        show={showAddTaskModal}
        handleSubmit={addBoard}
        handleClose={() => setShowAddTaskModal(false)}
      />
      <SideNavigation showAddNewBoardModal={() => setShowAddBoardModal(true)} />
      <Header showAddNewTaskModal={() => setShowAddTaskModal(true)} />
      <main>
        <Board />
      </main>
    </div>
  );
}
