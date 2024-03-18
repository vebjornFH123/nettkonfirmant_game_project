import React from "react";
import logo from "../assets/img/icons/logoNettkonf.webp";

function Navbar({ navigateInApp }) {
  return (
    <div className=" h-[60px] pl-2 pr-2 m-auto w-screen bg-[#B7CEFF] bg-opacity-70 flex justify-center items-center gap-10 backdrop-blur-[20px] fixed top-0 z-30">
      <button
        className="main-btn"
        onClick={() => {
          navigateInApp("game1");
        }}>
        Spill-1
      </button>
      <div className="flex justify-center items-center flex-row gap-1">
        <img className="object-contain h-10" alt="" src={logo} /> <span className="navbar-brand">Nettkonfirmant</span>
      </div>
      <button
        className="main-btn"
        onClick={() => {
          navigateInApp("game2");
        }}>
        Spill-2
      </button>
    </div>
  );
}

export default Navbar;
