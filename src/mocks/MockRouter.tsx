import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MockRouter(element: JSX.Element): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={element} />
      </Routes>
    </BrowserRouter>
  );
}
