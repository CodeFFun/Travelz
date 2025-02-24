import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NavbarComponent(){

    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <>
            <nav className="w-screen flex justify-between bg-gray-800 text-white py-5 px-10">
                <div className="text-xl font-bold hover:cursor-pointer" onClick={() => navigate('/')}>
                    Travelz
                </div>
                <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className="rounded-full hover:bg-gray-950 hover:cursor-pointer bg-gray-300 p-5 w-7 h-7 relative">
                    <ul className={`bg-gray-300 absolute -left-3 top-10 shadow-2xl z-30 rounded-md ${showDropdown ? 'block' : 'hidden'}`}>
                        <li onClick={() => navigate('/profile')} className="px-3 py-2 hover:bg-gray-500 hover:cursor-pointer rounded-md">Profile</li>
                        <li className="px-3 py-2 hover:bg-gray-500 hover:cursor-pointer rounded-md">Logout</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}