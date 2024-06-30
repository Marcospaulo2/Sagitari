"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItems } from "@/../config";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // State to track open submenu
  const navItems = NavItems();
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div>
      <div
        className={cn(
          isSidebarExpanded ? "w-[250px]" : "w-[63px]",
          "border-r h-full transition-all duration-300 ease-in-out transform hidden sm:flex bg-black"
        )}
      >
        <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1 ">
          {/* Top */}
          <div className="mt-4 relative ">
            <div className="flex flex-col space-y-1  min-w-7 ">
              {navItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1 ">
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          imageSrc={item.imageSrc}
                          nameSrc={item.nameSrc}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                          subItems={item.subItems}
                          openSubmenu={openSubmenu}
                          handleSubmenuToggle={handleSubmenuToggle}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="sticky bottom-0 mt-auto whitespace-nowrap mb-4 transition duration-200 block  ">
            {navItems.map((item, idx) => {
              if (item.position === "bottom") {
                <Image
                  src="./image/logo_light.svg"
                  width={180}
                  height={180}
                  alt="Picture of the User"
                />;
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        imageSrc={item.imageSrc}
                        nameSrc={item.nameSrc}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                        subItems={item.subItems}
                        openSubmenu={openSubmenu}
                        handleSubmenuToggle={handleSubmenuToggle}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
        <div className="mt-[calc(calc(5.2vh)-40px)] relative pl-2">
          <button
            type="button"
            className="absolute right-[-1.4rem] flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-400 bg-neutral-100 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  imageSrc?: any;
  nameSrc?: any;
  active: boolean;
  isSidebarExpanded: boolean;
  subItems?: { name: string; href: string }[]; // Optional subItems prop
  openSubmenu?: string | null;
  handleSubmenuToggle?: (label: string) => void;
}> = ({
  label,
  icon,
  path,
  imageSrc,
  nameSrc,
  active,
  isSidebarExpanded,
  subItems,
  openSubmenu,
  handleSubmenuToggle,
}) => {
    const hasSubItems = subItems && subItems.length > 0;
    const isSubmenuOpen = openSubmenu === label;

    return (
      <>
        {isSidebarExpanded ? (
          <div>
            <div className="my-1">{nameSrc}</div>

            <div
              onClick={() =>
                hasSubItems && handleSubmenuToggle && handleSubmenuToggle(label)

              }
              className={`h-full w-full relative flex items-center whitespace-nowrap rounded-md   ${active
                  ? "font-base text-sm  bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white  "
                  : "hover:bg-neutral-200  hover:text-neutral-700 text-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-black"

                }`}


            >
              <Link href={path} passHref>
                <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                  <span>{label}</span>
                  {hasSubItems && (isSubmenuOpen ? <ChevronUp /> : <ChevronDown />)}
                </div>
              </Link>
            </div>
            {isSubmenuOpen && hasSubItems && (
              <div className="ml-6">

                {subItems.map((subItem, subIdx) => (

                  <Link key={subIdx} href={subItem.href}>
                    <div className=" relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100 hover:bg-neutral-200 hover:text-neutral-700 text-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
                      {subItem.name}
                    </div>
                  </Link>
                ))}

              </div>
            )}
          </div>
        ) : (
          <TooltipProvider delayDuration={70}>
            <div className="my-2">{imageSrc}</div>
            <Tooltip>
              <TooltipTrigger>
                <Link

                  href={path}
                  className={`relative flex items-center whitespace-nowrap rounded-md  ${active
                      ? "font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white"
                      : "hover:bg-neutral-200 hover:text-neutral-700 text-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                    }`}
                >
                  <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100 ">

                    {icon}
                  </div>
                </Link>

              </TooltipTrigger>
              <TooltipContent

                side="left"
                className="px-3 py-1.5 text-xs"
                sideOffset={10}
              >
                <span>{label} </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    );
  };
