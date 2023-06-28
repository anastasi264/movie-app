import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";
import { Footer } from "../common/Footer/Footer";

export const MainLayout = () => {
  return (
      <div className="px-5">
        <Header />

        <div className="container mx-auto grid grid-cols-6 xl:grid-cols-5 md:grid-cols-none">
          <aside className="self-start sticky top-[120px] col-span-1 h-[calc(100vh-130px)] md:hidden">
            <Sidebar />
          </aside>

          <div className="col-span-5 xl:col-span-4 flex flex-col min-h-[calc(100vh-130px)]">
            <main className=""> 
              <Outlet />
            </main>

            <hr className="h-px mt-8 border-0 bg-gray-700" />

            <Footer />
          </div>
        </div>

      </div>
  );
};
