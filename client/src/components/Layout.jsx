import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div>
        <Navbar {...props}/>
        <div className='min-h-[80vh] p-5'>
            {props.children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout