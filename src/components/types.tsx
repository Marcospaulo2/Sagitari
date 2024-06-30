// types.ts
export interface SubNavItem {
  name: string;
  href: string;
 
  icon?: JSX.Element;
  imageSrc?: JSX.Element;
  nameSrc?: JSX.Element;
  
 
}

export interface SideNavItem {
  name: string;
  href: string;
 
  icon: JSX.Element;
  active: boolean;
  position: 'top' | 'bottom';
  subItems?: SubNavItem[];
  imageSrc?: JSX.Element;
  nameSrc?: JSX.Element;

}
