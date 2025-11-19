import PublicFooter from "@/components/Footer/PublicFooter";
import PublicHeader from "@/components/Header/PublicHeader";
import { Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {


  const location = useLocation();
   const isHome = location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      {!isHome && <PublicHeader />}
  
      <main className="flex-1 ">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
