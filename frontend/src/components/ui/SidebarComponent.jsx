import { useNavigate } from "react-router-dom"

export default function SidebarComponent(){
    const navigate = useNavigate()
    
    return (
        <>
            <div className="min-h-screen bg-gray-800 text-white py-20">
                <ul className="flex flex-col justify-center items-start gap-10 p-4">
                    <li onClick={() => navigate('/')} className="hover:border-b-2 hover:cursor-pointer border-b-white w-full  text-xl px-5 py-1">Dashboard</li>
                    <li onClick={() => navigate('/calender')} className="hover:border-b-2 hover:cursor-pointer border-b-white w-full   text-xl px-5 py-1 ">Calender</li>
                    <li onClick={() => navigate('/diary')} className="hover:border-b-2 hover:cursor-pointer border-b-white w-full  text-xl px-5 py-1 ">Diary</li>
                </ul>
            </div>
        </>
    )
}