export default function NavbarComponent(){
    return (
        <>
            <nav className="w-screen flex justify-between bg-gray-800 text-white py-5 px-10">
                <div className="text-xl font-bold">
                    Travelz
                </div>
                <div className="rounded-full hover:bg-gray-950 hover:cursor-pointer bg-gray-300 p-5 w-7 h-7 relative">
                    <ul className="bg-gray-300 absolute -left-3 top-10 shadow-2xl z-30 rounded-md">
                        <li className="px-3 py-2 hover:bg-gray-500 hover:cursor-pointer rounded-md">Profile</li>
                        <li className="px-3 py-2 hover:bg-gray-500 hover:cursor-pointer rounded-md">Logout</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}