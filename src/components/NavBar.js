import React from 'react'
import { Link } from 'react-router-dom';
import { logOut } from '../utilities/users-service';

function NavBar({user, setUser}) {

const handleLogOut = () => {
  logOut();
  setUser(null)
}

  return (
        <nav>
           <Link to='/orders'>Order History</Link>
           &nbsp; | &nbsp;
           <Link to='/orders/new'> New Order</Link>
           &nbsp; | &nbsp;
           <span> Welcome, <em>{user.name}</em></span>
           &nbsp; | &nbsp;
           <Link to='' onClick={handleLogOut}>Log Out</Link>
        </nav>
  )
}

export default NavBar;