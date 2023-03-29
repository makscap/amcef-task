import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DetailView() {
  const [selectedList, setSelectedList] = useState([]);
  const [nameTodo, setNameTodo] = useState("");
  const [textTodo, setTextTodo] = useState("");
  const [dateTodo, setDateTodo] = useState("");
  const [isCompleted, setIsCompleted] = useState("");

  const params = useParams();

  useEffect(() => {
    let isUnmount = false;

    fetch(process.env.REACT_APP_BASE_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmount) {
          let select = data[params.id - 1].todos.filter(
            (e) => e.id === params.todoId
          );

          let selectElem = data.filter((e) => e.id === params.id);

          setSelectedList(selectElem[0]);
          setNameTodo(select[0].name);
          setTextTodo(select[0].text);
          setDateTodo(select[0].date);
          setIsCompleted(select[0].isCompleted);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isUnmount = true;
    };
  }, [params]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  async function updateTodo(e) {
    e.preventDefault();

    const filterTodo = selectedList.todos.filter((e) => e.id !== params.todoId);

    const sortArr = [
      ...filterTodo,
      {
        id: params.todoId,
        name: nameTodo,
        text: textTodo,
        date: Date.parse(dateTodo),
        isCompleted: isCompleted,
      },
    ].sort((a, b) => a.id - b.id);

    await fetch(`${process.env.REACT_APP_BASE_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedList.name,
        todos: sortArr,
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));

    window.location.href = `/${params.id}`;
  }

  function deleteTodo() {
    const filterTodo = selectedList.todos.filter((e) => e.id !== params.todoId);

    fetch(`${process.env.REACT_APP_BASE_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...selectedList,
        todos: [...filterTodo],
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Header />
      <div className="px-[20px] mb-[20px]">
        <div className="flex justify-between mb-[10px] w-full">
          <button onClick={goBack} className="btn btn-outline btn-xs">
            BACK
          </button>
        </div>

        <form className="pt-[20px]">
          <div className="mb-[10px]">
            <label className="flex flex-col">
              <span className="w-[100px] inline-block">Name:</span>
              <input
                type="name"
                name="name"
                value={nameTodo}
                onChange={(e) => {
                  setNameTodo(e.target.value);
                }}
                className="bg-white border border-black p-[5px]"
              ></input>
            </label>
          </div>
          <div className="mb-[10px]">
            <label className="flex flex-col">
              <span className="w-[100px] inline-block">Text:</span>
              <textarea
                type="name"
                name="text"
                value={textTodo}
                onChange={(e) => {
                  setTextTodo(e.target.value);
                }}
                className="bg-white border border-black p-[5px]"
              ></textarea>
            </label>
          </div>

          <div className="mb-[20px]">
            <span className="w-[100px] inline-block">Date:</span>{" "}
            <DatePicker
              selected={dateTodo}
              onChange={(date) => setDateTodo(date)}
              showTimeSelect
              className="bg-white p-[5px] border"
            />
          </div>

          <div className="mb-[20px]">
            <label>
              <span className="w-[100px] inline-block">Completed:</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsCompleted(!isCompleted);
                }}
                checked={isCompleted}
                className="bg-white border border-black w-[15px] h-[15px]"
              ></input>
            </label>
          </div>

          <div>
            <button
              onClick={(e) => updateTodo(e)}
              className="btn btn-outline btn-info btn-sm mr-[10px]"
            >
              SAVE
            </button>
            <button
              onClick={deleteTodo}
              className="btn btn-outline btn-error btn-sm "
            >
              DELETE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DetailView;
