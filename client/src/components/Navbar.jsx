import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = (props) => {
  return (
    <nav className='w-full bg-slate-700 grid grid-cols-2 lg:grid-cols-3 justify-between text-white py-3 px-5'>
        <div className='lg:col-span-2 text-2xl'>
            <Link to={'/'}>Pivony</Link>
        </div>
        <ul className='flex text-xl justify-between'>
            <li><Link to={'/dashboard'}>Dashboard</Link></li>
            <li><Link to={'/survey'}>Add a survey</Link></li>
            <li><LogoutButton {...props}/></li>
            <li></li>
        </ul>
    </nav>
  )
}

export default Navbar