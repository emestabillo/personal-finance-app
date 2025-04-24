"use client";
import Login from "./LogIn";
import Register from "./Register";
import { useState } from "react";

export default function Auth() {
  const [showRegister, setShowRegister] = useState(false);

  const toggleAuthView = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <>
      {showRegister ? (
        <Register onToggle={toggleAuthView} />
      ) : (
        <Login onToggle={toggleAuthView} />
      )}
    </>
  );
}
