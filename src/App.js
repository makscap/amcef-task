import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListView from "./views/ListView";
import TodosView from "./views/TodosView";
import DetailView from "./views/DetailView";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/:id" element={<TodosView />} />
          <Route path="/:id/:todoId" element={<DetailView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
