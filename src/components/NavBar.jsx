import React, { useState } from "react";
import { styles } from "../styles";
import { tourname } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { navOptions } from "../utils";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { grey } from "@mui/material/colors";
import { useAuth } from "../context/authContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div
      className={`${styles.paddingXNav} w-full flex justify-between items-center sticky top-0 text-white bg-primary_1 py-[15px]`}
      style={{ zIndex: 20 }}
    >
      <div>
        <img
          src={tourname}
          alt="Logo"
          className=" md:w-[200px] md:h-[50px] w-[120px] h-[30px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className={`${styles.headerNav} flex gap-14`}>
        {navOptions.map((option, index) => (
          <Link key={index} to={option.path}>
            {option.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {user ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`${styles.headerNav}`}>
              Hello, {user?.name || "User"}
            </div>
            {isDropdownVisible && (
              <div className="absolute top-10 bg-primary_1 rounded-lg shadow-lg w-[100%] p-2">
                <button
                  className="w-full text-left py-2 px-3 text-sm font-semibold hover:underline rounded-lg"
                  onClick={() => navigate("/Dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="w-full text-left py-2 px-3 text-sm font-semibold hover:underline rounded-lg"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <IconButton onClick={() => navigate("/login")}>
            <PersonOutlineIcon sx={{ color: grey[50] }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default NavBar;
