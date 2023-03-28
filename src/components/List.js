import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function List({ data, deleteList }) {
  return (
    <div className="w-[100%] mx-[20px]">
      {data.length <= 0 ? (
        <Spinner />
      ) : (
        <ul className="flex flex-col justofy-center items-center w-[100%] border border-[#152532] w-[100%]">
          {data.map((e) => (
            <li
              key={e.id}
              className="hover:bg-[#235243] hover:text-white w-[100%] border-b border-[#152532] last:border-none flex justify-between items-center"
            >
              <div>
                <Link to={e.id} className="p-[8px] block">
                  {e.name}
                </Link>
              </div>
              <button
                onClick={() => deleteList(e.id)}
                className="btn btn-outline btn-error btn-xs mr-[10px]"
              >
                DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
