import CalenderComponent from "../ui/CalenderComponent";
import NavbarComponent from "../ui/NavbarComponent";
import SidebarComponent from "../ui/SidebarComponent";

export default function CalenderPage(){
    return(
        <>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                                <NavbarComponent />
                                <div className="flex h-full w-full">
                                  <SidebarComponent />
                                    <CalenderComponent />
                                </div>
                        </div>
        </>
    )
}