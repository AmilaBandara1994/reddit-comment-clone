import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar">
        <div className="container  nav-c">

            <div className="logo">Reddit </div>
            <ul className="navList">
                <li className="navItem">
                    <Link to="/" className="navLink">Home</Link>
                </li>
                <li className="navItem">
                    <Link to="/posts" className="navLink">Posts</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header