import NavbarComponent from "../ui/NavbarComponent"
import SidebarComponent from "../ui/SidebarComponent"
import DiaryComponent from "../ui/DiaryComponent"

export default function DiaryPage(){
    return(
        <>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                    <NavbarComponent />
                    <div className="flex h-full w-full">
                      <SidebarComponent />
                        <DiaryComponent />
                    </div>
            </div>
        </>
    )
}

