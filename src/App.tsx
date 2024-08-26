import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm/RegisterForm";
import UserService from "./services/UserService";
import React from "react";
import EditFlashCardForm from "./components/forms/EditFlashCardForm/EditFlashCardForm";
import FlashCardService from "./services/FlashCardService";
import IFlashCard from "./interfaces/IFlashCard";

function App() {
  const [count, setCount] = useState(0);
  const flashCardTest: IFlashCard["FlashCard"] = {
    FlashCardID: 1,
    FlashCardQuestion: "What is React?",
    FlashCardAnswer: "A library for managing user interfaces",
    CreatedDate: new Date(),
  };
  return (
    <BrowserRouter>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        <Route
          path="/register"
          element={<RegisterForm userService={new UserService()} />}
        />
        <Route
          path="/edit-card"
          element={
            <EditFlashCardForm
              flashCardService={new FlashCardService()}
              flashCard={flashCardTest}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
