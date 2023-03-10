import { useState } from "react";
import AddBoardModal from "./layouts/AddBoardModal";
import AddStatusModal from "./layouts/AddStatusModal";
import AddTaskModal from "./layouts/AddTaskModal";
import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";
import TaskModal from "./layouts/TaskModal";
import EditStatusesModal from "./layouts/EditStatusesModal";
import EditTaskModal from "./layouts/EditTaskModal";
import { useData } from "./contexts/DataContext";
import TutorialModal from "./layouts/TutorialModal";

export default function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditStatusesModal, setShowEditStatusesModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const { data, setCurrentTask } = useData();
  const [showTutorialModal, setShowTutorialModal] = useState(
    data.boards.length <= 0
  );

  return (
    <div className="App">
      <TutorialModal
        show={showTutorialModal}
        handleClose={() => {
          setShowTutorialModal(false);
        }}
      />
      <EditTaskModal
        show={showEditTaskModal}
        handleClose={() => {
          setCurrentTask(null);
          setShowEditTaskModal(false);
        }}
      />
      <EditStatusesModal
        show={showEditStatusesModal}
        handleClose={() => setShowEditStatusesModal(false)}
      />
      <TaskModal
        show={showTaskModal}
        showEditTaskModal={() => setShowEditTaskModal(true)}
        handleClose={() => setShowTaskModal(false)}
      />
      <AddBoardModal
        show={showAddBoardModal}
        handleClose={() => setShowAddBoardModal(false)}
      />
      <AddStatusModal
        show={showAddStatusModal}
        handleClose={() => setShowAddStatusModal(false)}
      />
      <AddTaskModal
        show={showAddTaskModal}
        handleClose={() => setShowAddTaskModal(false)}
      />
      <SideNavigation
        show={showSideNav}
        hideSideNav={() => setShowSideNav(false)}
        showAddNewBoardModal={() => setShowAddBoardModal(true)}
      />
      <Header
        showSideNav={() => setShowSideNav(true)}
        showTutorial={() => setShowTutorialModal(true)}
        showEditStatusesModal={() => setShowEditStatusesModal(true)}
        showAddNewTaskModal={() => setShowAddTaskModal(true)}
      />
      <main>
        <Board
          showAddTask={() => setShowAddTaskModal(true)}
          setCurrentTask={setCurrentTask}
          showTaskModal={() => setShowTaskModal(true)}
          showAddNewStatusModal={() => setShowAddStatusModal(true)}
        />
      </main>
    </div>
  );
}
