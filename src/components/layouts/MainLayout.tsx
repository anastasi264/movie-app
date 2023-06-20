import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";

export const MainLayout = () => {
  return (
      <div className="px-5">
        <header className="sticky top-0 z-50 ">
          <Header />
        </header>

        <div className="container mx-auto grid grid-cols-6 xl:grid-cols-5 md:grid-cols-none">
          <aside className="self-start sticky top-[120px] col-span-1 h-[calc(100vh-130px)] md:hidden">
            <Sidebar />
          </aside>

          <main className="col-span-5 xl:col-span-4"> 
            <Outlet />
          </main>
        </div>
      </div>
  );
};
