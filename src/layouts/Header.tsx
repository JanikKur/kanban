import React from "react";
import "../styles/layouts/header.css";
import { AiOutlineMore } from "react-icons/ai";

export default function Header() {
  return (
    <header className="main-header">
      <h1>TEST</h1>
      <div className="user-interaction">
        <button className="add-task-btn">+ Add New Task</button>
        <button className="menu-btn">
          <AiOutlineMore />
        </button>
      </div>
    </header>
  );
}
