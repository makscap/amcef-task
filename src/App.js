import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/List";
import Todos from "./components/Todos";
import Header from "./components/Header";
import ListView from "./views/ListView";
import TodosView from "./views/TodosView";
import DetailView from "./views/DetailView";
import "./App.css";

function App() {
  // const arr = [
  //   {
  //     id: 1,
  //     name: "My list",
  //     todos: [
  //       {
  //         id: 1,
  //         name: "Task 1",
  //         desc: "Lorem lorem",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Work List",
  //     todos: [],
  //   },
  // ];

  // const [data, setData] = useState([]);
  // console.log("🚀 ~ file: App.tsx:11 ~ App ~ data:", data);

  // useEffect(() => {
  //   let isUnmount = false;

  //   fetch("https://641f31fead55ae01ccb85f06.mockapi.io/api/list", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!isUnmount) {
  //         setData(data);
  //       }
  //     });

  //   return () => {
  //     isUnmount = true;
  //   };
  // }, []);

  // function createTodo() {
  //   fetch("https://641f31fead55ae01ccb85f06.mockapi.io/api/list", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: "My test",
  //       desc: "lorem lorem lorem",
  //       todos: [
  //         {
  //           id: 1,
  //           name: "TODO 1",
  //         },
  //       ],
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {});
  // }

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
