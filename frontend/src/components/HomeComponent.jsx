import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";

export default function HomeComponent() {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <NavbarComponent />
        <div className="flex h-full">
          <SidebarComponent />
          <div className="flex w-full overflow-hidden">
            {/* This div is now the scrollable one */}
            <div className="h-full overflow-auto px-20 py-10 flex flex-col hide-scrollbar">
              <h1 className="text-2xl font-bold">
                Navigators for your next adventure
              </h1>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-green-500 my-10 min-h-60 min-w-150 rounded-xl shadow-lg"
                >
                  some
                </div>
              ))}
            </div>
            <div className="w-full h-full ml-10 px-30 my-20">
              <div className="bg-amber-300 px-20 py-10 grid grid-cols-2 gap-3">
                    <h1 className="text-2xl font-bold">Your Appointments</h1>
                    <p className="hover:cursor-pointer bg-amber-950 text-purple-600 hover:text-purple-800 justify-self-end">See all</p>
                    <div className="bg-green-300 flex justify-between w-full">
                      <div className="flex ">
                        <p className="bg-black rounded-full h-5 w-5"></p>
                        <div>
                          <p>Sanket Sharma</p>
                          <p>Kathmandu,Nepal</p>
                        </div>
                      </div> 
                      <div>
                        12/03/2021
                      </div>
                    </div>
                    <div className="bg-green-300 flex justify-between w-full">
                      <div className="flex ">
                        <p className="bg-black rounded-full h-5 w-5"></p>
                        <div>
                          <p>Sanket Sharma</p>
                          <p>Kathmandu,Nepal</p>
                        </div>
                      </div> 
                      <div>
                        12/03/2021
                      </div>
                    </div>
                    <div className="bg-green-300 flex justify-between w-full">
                      <div className="flex ">
                        <p className="bg-black rounded-full h-5 w-5"></p>
                        <div>
                          <p>Sanket Sharma</p>
                          <p>Kathmandu,Nepal</p>
                        </div>
                      </div> 
                      <div>
                        12/03/2021
                      </div>
                    </div>
                    <div className="bg-green-300 flex justify-between w-full">
                      <div className="flex ">
                        <p className="bg-black rounded-full h-5 w-5"></p>
                        <div>
                          <p>Sanket Sharma</p>
                          <p>Kathmandu,Nepal</p>
                        </div>
                      </div> 
                      <div>
                        12/03/2021
                      </div>
                    </div>
                <div>
                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
