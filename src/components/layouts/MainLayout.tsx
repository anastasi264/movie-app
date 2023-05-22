import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";

export const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <Header />

      <main className="main flex">
        <Sidebar />
  
        <div className="inline-block h-[450px] min-h-[1em] w-[1px] self-stretch bg-[#757379]">
        </div>

        <div className="content grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
