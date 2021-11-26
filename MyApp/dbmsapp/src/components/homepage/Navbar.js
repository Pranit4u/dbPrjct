import React, { Component } from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({logout,user}) => {
  return (
      
      <nav className="navbar  navbar-expand-lg" style={{backgroundColor:"transparent"}}>  
        <a style={{color:"white"}} className="nav-link"><strong>Home</strong></a>
        {user.isStud ? <Link to="/profile" style={{color:"white", marginLeft:"auto", marginRight:10}} className="nav-link">Profile</Link> : <div></div>}
        <button onClick={logout} style={{backgroundColor:"transparent" ,color:"white", marginLeft:10, marginRight:20, border:"none"}} className="nav-link">LogOut</button>
        
      </nav>
    );
}

export default Navbar

// // navbar-dark bg-dark