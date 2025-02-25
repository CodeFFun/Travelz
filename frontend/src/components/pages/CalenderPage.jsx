import CalenderComponent from "../ui/CalenderComponent";
import NavbarComponent from "../ui/NavbarComponent";
import SidebarComponent from "../ui/SidebarComponent";
import BookingGrid from "../ui/BookingGrid";

export default function CalenderPage(){
    return(
        <>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                                <NavbarComponent />
                                <div className="flex h-full w-full">
                                  <SidebarComponent />
                                  <div className="max-h-screen">
                                    <CalenderComponent />
                                    <BookingGrid />
                                  </div>
                                </div>
                        </div>
        </>
    )
}