import Board from "./layouts/Board";
import Header from "./layouts/Header";
import SideNavigation from "./layouts/SideNavigation";

export default function App() {
  return (
    <div className="App">
      <SideNavigation />
      <Header />
      <main>
        <Board />
      </main>
    </div>
  );
}
