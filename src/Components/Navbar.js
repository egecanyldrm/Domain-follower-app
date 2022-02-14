import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar  nav-background' >
      <Link className='navbar-brand container text-white ' to='/' > Domain Follower  </Link>
    </nav>
  )
}

export default Navbar