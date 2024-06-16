import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex item-center px-4 justify-between h-14 pt-4 '>
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-400">&lt;</span>
          Dev
          <span className='text-green-400'>Pass/&gt;</span>
        </div>
      <ul>
        <li className='flex gap-4 text-green-500'>
          <div className='flex flex-row justify-center items-center gap-1 bg-green-400 text-slate-800 rounded-2xl ring-white ring-1'>
            <img src="/github.png" alt="GitHub" className="w-9" />
            <a href="https://github.com/rayyanbey" target='_blank' className='hover:font-bold duration-75 pr-2'>GitHub</a>
          </div>
          <div className='flex flex-row justify-center items-center gap-1 bg-green-400 text-slate-800 rounded-2xl  ring-white ring-1'>
            <img src="/linkedin.png" alt="Linkedin" className="w-9 pl-1" />
            <a href="https://www.linkedin.com/in/rayyan-asghar-4520262a5/" target='_blank' className='hover:font-bold duration-75 pr-2'>Linkedin</a>
          </div>
          <div className='flex flex-row justify-center items-center gap-1 bg-green-400 text-slate-800 rounded-2xl  ring-white ring-1'>
            <img src="/instagram.png" alt="Instagram" className="w-9 pl-1" />
            <a href="https://www.instagram.com/rayyan_bey/" target='_blank' className='hover:font-bold duration-75 pr-2'>Instagram</a>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
