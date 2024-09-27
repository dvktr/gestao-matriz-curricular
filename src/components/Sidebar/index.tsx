import NeedHelp from "../NeedHelp";
import LayoutRoutes from "../LayoutRoutes";
import Image from "next/image";
import { lightLine, logo } from "@/assets";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary h-screen p-4 text-white flex flex-col justify-between fixed">
      <div className="flex flex-col items-start space-y-4">
        <Image alt="logo" src={logo} />
        <Image alt="light-line" src={lightLine} />

        <LayoutRoutes />
      </div>

      {/* Help Section */}
      <NeedHelp />
    </aside>
  );
}
