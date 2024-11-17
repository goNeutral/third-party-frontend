import {
  Users,
  Settings,
  ShoppingCart,
  PackageSearch,
  Truck,
  type LucideIcon
} from "lucide-react";

interface Submenu {
  href: string;
  label: string;
  active?: boolean;
}

interface Menu {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
}

interface Group {
  groupLabel: string;
  menus: Menu[];
}

export function getMenuList(pathname: string): Group[] {
  return [
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: "/dashboard",
    //       label: "Dashboard",
    //       active: pathname.includes("/dashboard"),
    //       icon: LayoutGrid,
    //       submenus: []
    //     }
    //   ]
    // },
    {
      groupLabel: "",
      menus: [
        {
          href: "/suppliers",
          label: "Suppliers",
          active: pathname.includes("/suppliers"),
          icon: Truck
        },
        {
          href: "/customers",
          label: "Customers",
          active: pathname.includes("/customers"),
          icon: ShoppingCart
        },
        {
          href: "/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: PackageSearch
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings
        }
      ]
    }
  ];
}
