import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";
import Header from "../components/Header";
import Todos from "../components/Todos";
import "react-datepicker/dist/react-datepicker.css";

function TodosView() {
  const [selectedTodo, setSelectedTodo] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameTodo, setNameTodo] = useState("Empty");
  const [textTodo, setTextTodo] = useState("Empty");
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const params = useParams();
  const unique_id = uuid();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let isUnmount = false;

    fetch(`${process.env.REACT_APP_BASE_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmount) {
          setSelectedTodo(data[params.id - 1]);
          setTodos(data[params.id - 1].todos);
          setFilteredResults(
            data[params.id - 1].todos.sort(
              (a, b) => a.isCompleted - b.isCompleted
            )
          );
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isUnmount = true;
    };
  }, [params]);

  const sortBy = (cause) => {
    switch (cause) {
      case "active":
        setFilteredResults(
          [...filteredResults].sort((a, b) => a.isCompleted - b.isCompleted)
        );
        break;
      case "completed":
        setFilteredResults(
          [...filteredResults].sort((a, b) => b.isCompleted - a.isCompleted)
        );
        break;
      default:
        setFilteredResults(
          [...filteredResults].sort((a, b) => b.date - a.date)
        );
        break;
    }
  };

  function createTodo(name) {
    fetch(`${process.env.REACT_APP_BASE_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedTodo.name,
        todos: [
          ...todos,
          {
            id: unique_id,
            name: nameTodo,
            text: textTodo,
            date: Date.parse(startDate),
            isCompleted: false,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setNameTodo(event.target.value);
  };
  const handleChangeText = (event) => {
    setTextTodo(event.target.value);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = todos.filter((item) => {
        return item.name.toLowerCase().match(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(todos);
    }
  };

  return (
    <div className="App ">
      <Header />

      <div className="px-[20px] mb-[20px]">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-sm w-full bg-white"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>

      <div className="px-[20px] mb-[20px]">
        <div className="flex justify-between items-center mb-[10px] w-full">
          <button onClick={goBack} className="btn btn-outline btn-xs">
            BACK
          </button>
          <div className="tabs mr-[10px]">
            <button className="tab tab-bordered tab-active" onClick={sortBy}>
              All
            </button>
            <button
              type="button"
              className="tab tab-bordered "
              onClick={() => sortBy("active")}
            >
              Active
            </button>
            <button
              type="button"
              className="tab tab-bordered"
              onClick={() => sortBy("completed")}
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="btn btn-outline btn-success btn-sm "
          >
            CREATE
          </button>
        </div>

        <div className="flex justify-center ">
          {todos && <Todos data={filteredResults} />}
        </div>
      </div>

      {isOpenModal && (
        <div className="fixed top-0 left-0  h-full w-full overflow-y-auto overflow-x-hidden outline-none flex justify-center items-center">
          <div className="relative w-[400px]  border border-black rounded-[8px] bg-[#235243] p-[20px]">
            <AiOutlineCloseCircle
              className="absolute top-[10px] right-[10px] w-[30px] h-[30px]"
              onClick={() => setIsOpenModal(false)}
            />
            <form>
              <h2 className="text-[16px] mb-[10px] text-white">
                Create your todo!
              </h2>
              <div className="mb-[10px]">
                <label className="flex flex-col">
                  <span className="w-[100px] inline-block text-white">
                    Name:
                  </span>
                  <input
                    type="text"
                    name="name"
                    minLength="3"
                    maxLength="20"
                    onChange={handleChange}
                    className="bg-white border border-black p-[5px]"
                  ></input>
                </label>
              </div>
              <div className="mb-[10px]">
                <label className="flex flex-col">
                  <span className="w-[100px] inline-block text-white">
                    Text:
                  </span>
                  <textarea
                    type="text"
                    name="text"
                    minLength="1"
                    onChange={handleChangeText}
                    className="bg-white border border-black p-[5px]"
                  ></textarea>
                </label>
              </div>
              <div className="mb-[20px]">
                <span className="w-[100px] inline-block text-white">Date:</span>{" "}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  className="bg-white p-[5px]"
                />
              </div>
              <button
                onClick={createTodo}
                className="btn btn-outline btn-info btn-sm mr-[10px]"
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodosView;
