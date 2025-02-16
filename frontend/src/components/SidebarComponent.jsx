export default function SidebarComponent(){
    return (
        <>
            <div className="min-h-screen bg-gray-800 text-white">
                <ul className="flex flex-col gap-10">
                    <li className="hover:border-b-2 hover:cursor-pointer border-b-white w-full  text-xl px-10 py-1">Dashboard</li>
                    <li className="hover:border-b-2 hover:cursor-pointer border-b-white w-full  text-xl px-10 py-1 ">Calender</li>
                    <li className="hover:border-b-2 hover:cursor-pointer border-b-white w-full  text-xl px-10 py-1 ">Diary</li>
                </ul>
            </div>
        </>
    )
}