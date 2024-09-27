import { needHelpBG, needHelpIcon } from "@/assets";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NeedHelp() {
  return (
    <div className="relative w-full h-44">
      <Image
        src={needHelpBG}
        alt="need-help-image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />

      <div className="absolute inset-0 flex flex-col items-start justify-between px-3 py-5">
        <Image src={needHelpIcon} alt="need-help-icon" className="w-8 h-8" />

        <div className="">
          <div className="text-start">
            <div className="font-bold text-black text-base">
              Precisa de ajuda?
            </div>
            <div className="font-normal text-black text-xs mb-1">
              Por favor, verifique a documentação
            </div>
          </div>

          <Link href="/documentacao">
            <Button className="bg-primary text-white font-semibold rounded-md hover:bg-[#15CA9A] w-full">
              DOCUMENTAÇÃO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
