import React from "react";
import "./Homepage.css";
import homemapperLogo from "../images/Hopemapper_big_logo.png";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="Homepage flex h-screen w-screen bg-[#f5f6fa]">
      {/* Left 3/4: Centered Title */}
      <div className="flex-[3] flex flex-col items-center justify-center text-[#F1EFEF]">
        <img src={homemapperLogo} alt="Logo" className="w-[100px] h-[100px]" />
        <h1 className="text-5xl text-[#759a96] text-center">HopeMapper</h1>
      </div>

      {/* Right 1/4: Login Portal */}
      <div className="flex-1 bg-[#759a96] shadow-[ -2px_0_8px_rgba(0,0,0,0.05) ] flex items-center justify-center">
        <div className="w-4/5 p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-[#fafbfc]">
          <h2 className="text-[#08201E] font-bold mb-1">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[#08201E] text-left ">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full p-2 rounded border border-gray-300 text-[#08201E] bg-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-[#08201E] text-left">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-2 rounded border border-gray-300  text-[#08201E] text-left"
              />
            </div>

            <button
              className="w-full px-3 py-3 rounded bg-[#769A96] text-white font-bold text-lg cursor-pointer hover:bg-[#b6cbc5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#aabfb9]"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
