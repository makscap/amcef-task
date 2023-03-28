import React from "react";
import Spinner from "./Spinner";

function Todos({ data }) {
  return (
    <div className="flex  w-[100%] ">
      {data.length <= 0 ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <ul className="flex flex-col justofy-center items-center w-[100%] border border-[#152532] w-[100%]">
          {data.map((e) => (
            <li
              key={e.id}
              className="flex justify-between items-center  w-[100%] border-b border-[#152532] last:border-none"
            >
              <div
                className={
                  e.isCompleted
                    ? "p-[8px] line-through text-[#bdbdbd]"
                    : "p-[8px]"
                }
              >
                <p className="text-[12px]">{e.name}</p>
                <p className="text-[10px]">{e.text}</p>
                <p className="text-[8px]">
                  {new Date(e.date).toLocaleString()}
                </p>
              </div>
              <div className="mr-[10px]">
                <a
                  href={`${window.location.pathname}/${e.id}`}
                  className="btn btn-outline btn-warning btn-xs mr-[10px]"
                >
                  EDIT
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
