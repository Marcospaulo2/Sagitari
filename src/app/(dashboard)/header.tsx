'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavItems } from '@/../config';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';

export default function Header() {
  const navItems = NavItems();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header className=" flex items-center  h-[4.4rem] px-2 border-b shrink-0 md:px-6 justify-between ">
      <Link
        href="#"
        className="sm:hidden flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={true}
      >
        {/* <span className="w-8 h-8 border bg-accent rounded-full" /> */}
        <span className=" flex items-center gap-3 ">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className=" overflow-hidden rounded-full "
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback> {/*initial name user */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </span>
        
        <span>Acme Inc</span>
      </Link>

      <div className=" flex items-center gap-3 absolute  right-0 w-16 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className=" overflow-hidden rounded-full "
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  
                />
                <AvatarFallback>CN</AvatarFallback>{/*initial name user */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="link"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="sm:hidden"
        >
          <Menu className="flex sm:hidden" />
        </Button>

        {isNavOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end font-base text-sm shadow-sm dark:bg-neutral-800 dark:text-white">
            <div className="bg-black h-full shadow-lg p-5 w-64 'hover:bg-neutral-200  text-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
              <ul className="space-y-4">
                {navItems.map((item, idx) => (
                  <li key={idx} className="relative group">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex flex-row items-center gap-2"
                        onClick={() => item.subItems ? handleSubmenuToggle(item.name) : setIsNavOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                      {item.subItems && (
                        <button onClick={() => handleSubmenuToggle(item.name)}>
                          {openSubmenu === item.name ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      )}
                    </div>
                    {openSubmenu === item.name && item.subItems && (
                      <ul className="ml-6 mt-2">
                        {item.subItems.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setIsNavOpen(false)}
                            >
                              {subItem.name}
                              
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
