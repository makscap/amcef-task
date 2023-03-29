import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import List from "../components/List";
import { AiOutlineCloseCircle } from "react-icons/ai";

function ListView() {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    let isUnmount = false;

    fetch(`${process.env.REACT_APP_BASE_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmount) {
          setData(data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isUnmount = true;
    };
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  function createTodo() {
    fetch(process.env.REACT_APP_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        todos: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  }

  function deleteList(id) {
    fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header />
      <div className="flex justify-between items-center mb-[20px] px-[20px]">
        <p className="text-center text-[18px] font-medium  ">
          Choose your list!
        </p>
        <button
          className="btn btn-outline btn-success btn-sm"
          onClick={() => setIsOpenModal(true)}
        >
          ADD LIST
        </button>
      </div>

      <div className="flex justify-center">
        <List data={data} deleteList={deleteList} />
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
                Create your list!
              </h2>
              <label className="text-[12px] text-white">
                <span className="mr-[10px]">Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  onChange={handleChange}
                  minLength="3"
                  maxLength="20"
                  className="text-[12px] text-black px-[10px] py-[6px] mr-[10px] bg-white"
                />
              </label>
              <button onClick={createTodo} className="text-white">
                CREATE
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ListView;
