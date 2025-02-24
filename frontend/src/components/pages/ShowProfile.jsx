import NavbarComponent from "../ui/NavbarComponent"
import SidebarComponent from "../ui/SidebarComponent"
import ProfileComponent from "../ui/ProfileComponent"


export default function ShowProfile(){
    return(
        <>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                    <NavbarComponent />
                    <div className="flex h-full w-full">
                      <SidebarComponent />
                        <ProfileComponent />
                    </div>
            </div>
        </>
    )
}

