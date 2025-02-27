import NavbarComponent from "../ui/NavbarComponent";
import SidebarComponent from "../ui/SidebarComponent";
import ShowGuide from "../ui/ShowGuide";
import BooikngSection from "../ui/BooikngSection";
import DiarySection from "../ui/DiarySection";

export default function HomeComponent() {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <NavbarComponent />
        <div className="flex h-full">
          <SidebarComponent />
          <div className="p-6 bg-gray-100 min-h-screen w-full">
            {/* Bookings and Diaries Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <BooikngSection />
              <DiarySection />
            </div>
            <ShowGuide />
          </div>
        </div>
      </div>
    </>
  );
}
