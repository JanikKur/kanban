import React from "react";
import "../styles/components/modal.css";

export default function Modal({
  show,
  handleClose,
  className,
  children,
}: {
  show: boolean;
  handleClose: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => handleClose()}
      className={`modal-wrapper ${show ? "show" : ""}`}
    >
      <aside className={`modal ${className}`}>{children}</aside>
    </div>
  );
}
