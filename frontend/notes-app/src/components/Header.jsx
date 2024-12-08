import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";


function Header({ userName, handleLogoutUser, searchVal, setSearchVal, handleSearch }) {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    if (menu == false) {
      setMenu(true);
    }
    else if (menu == true) {
      setMenu(false)
    }
  }

  const clearSearch = () => {
    setSearchVal("");
  }
  const nameTag = userName
    .split(" ")
    .map(word => word[0])
    .join("");
  return (
    <nav className='navbar'>
      <h1>Notes</h1>
      <div className='input-box'>
        <input onChange={(e) => setSearchVal(e.target.value)} value={searchVal} type="text" placeholder='Search Notes' />
        {searchVal !== "" && <IoIosClose onClick={clearSearch} size={20} color='white' />
        }
        <CiSearch onClick={handleSearch} size={20} color='white' />
      </div>
      <div className="user" style={{display:menu ? "none" : "flex"}}>
        <div className='user-tag'>
          <p>{nameTag}</p>
        </div>
        <div className='username'>
          <p>{userName}</p>
          <button onClick={handleLogoutUser} className='logout-btn'>Logout</button>
        </div>
      </div>
      <div onClick={handleMenu}>
        <FaUserCircle id='user' />
      </div>
    </nav>
  )
}

export default Header