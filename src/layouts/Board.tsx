import React from "react";
import "../styles/layouts/board.css";

export default function Board() {
  return (
    <section className="board">
      <div className="col">
        <label className="col-title">
          <div className="color"></div>TODO (4)
        </label>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
      </div>
      <div className="col">
        <label className="col-title">
          <div className="color"></div> DOING (10)
        </label>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">
            Build UI for onboarding flow bacause live is garbage and im gonna
            take it out on you
          </span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
      </div>
      <div className="col">
        <label className="col-title">
          <div className="color"></div> DONE (7)
        </label>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
      </div>
      <div className="col">
        <label className="col-title">
          <div className="color"></div> DONE (7)
        </label>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
        <button className="todo-btn">
          <span className="title">Build UI for onboarding flow</span>
          <span className="subtasks">0 of 3 subtasks</span>
        </button>
      </div>
      <button className="col add-bol-btn">+ New Column</button>
    </section>
  );
}
