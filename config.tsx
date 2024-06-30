import { usePathname } from 'next/navigation';
import { MessageCircleMore, LayoutGrid, Bolt, SquareUserRound, Search } from 'lucide-react';
import { SideNavItem } from '@/components/types';

import Image from 'next/image'

export const NavItems = (): SideNavItem[] => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  const navItems: SideNavItem[] = [

    {
      nameSrc: <Image src='/image/sagitari.svg' width={140} height={100} alt="Picture of the User" />,
      imageSrc: <Image src='/image/logo_light.svg' width={100} height={100} alt="Picture of the User" />,
      name: 'Imput text',
      href: '',      
      icon: <Search size={20} />,
      active: pathname === '',
      position: 'top',
    },

    {
      name: 'DashBoard',
      href: '/',
      icon: <LayoutGrid size={20} />,
      active: pathname === '/',
      position: 'top',
    },
    {
      name: 'Menssagens',
      href: '/notifications',
     
      icon: <MessageCircleMore size={20} />,
      active: isNavItemActive(pathname, './notifications'),
      position: 'top',
    },
    {
      name: 'User',
      href: '',
    
      icon: <SquareUserRound size={20} />,
      active: isNavItemActive(pathname, '/profile'),
      position: 'top',
      subItems: [
        {
          name: 'View Profile',
          href: '/profile/view',
          
        
        },
        {
          name: 'Edit Profile',
          href: '/profile/edit',
        
        },
      ],
    },

    // {
    //   name: 'Projects',
    //   href: '/projects',
    //   icon: <Briefcase size={20} />,
    //   active: isNavItemActive(pathname, '/projects'),
    //   position: 'top',
    // },
    {
      name: 'Configurações',
      href: '',
      
      icon: <Bolt size={20} />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'top',
      subItems: [
        {
          name: 'General',
          href: '/settings/general',
          
        },
        {
          name: 'Security',
          href: '/settings/security',
          
        },
      ],
    },
  ];

  return navItems;
};
