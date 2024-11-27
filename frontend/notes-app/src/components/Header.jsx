import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

function Header({usename, handleLogoutUser}) {
  const [searchval, setsearchval] = useState("");

  const clearSearch = ()=>{
    setsearchval("");
  }
  const nameTag = usename
  .split(" ")    
  .map(word => word[0])
  .join("");   

  return (
    <nav className='navbar'>
        <h1>Notes</h1>
        <div className='input-box'>
          <input onChange={(e)=>setsearchval(e.target.value)} value={searchval} type="text" placeholder='Search Notes'/>
          {searchval !== "" && <IoIosClose onClick={clearSearch} size={20} color='black' />
        }
          <CiSearch size={20} />
        </div>
        <div className='user'>
          <div className='user-tag'>
            <p>{nameTag}</p>
          </div>
          <div className='username'>
            <p>{usename}</p>
            <button onClick={handleLogoutUser} className='logout-btn'>Logout</button>
          </div>
        </div>
    </nav>
  )
}

export default Header