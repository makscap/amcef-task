import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="h-[50px] flex justify-between items-center px-[20px] bg-[#235243] text-white mb-[20px]">
      <Link to="/">TODO App</Link>
      <nav className="">
        <p className="text-[8px]">waxiw@ukr.net</p>
        <p className="text-[8px]">Borysov Maksym</p>
        <p className="text-[8px]">Technical task</p>
      </nav>
    </header>
  );
}

export default Header;
