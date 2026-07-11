import { Outlet } from "react-router-dom";
import Logo from "../common/Logo";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <div className="flex justify-center py-10">
        <Logo />
      </div>
      <div className="flex flex-1 items-start justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
