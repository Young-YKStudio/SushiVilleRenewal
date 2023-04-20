import { MdSpaceDashboard, MdShoppingCart, MdLocationOn, MdAccountCircle, MdFoodBank, MdCalendarMonth } from "react-icons/md";

export const links = [
  {
    name: 'Menu',
    href: '/products',
    icon: <MdFoodBank className="w-6 h-6" />
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: <MdShoppingCart className="w-5 h-5" />
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: <MdLocationOn className="w-5 h-5" />
  },
  {
    name: 'Reservations',
    href: '/reservation',
    icon: <MdCalendarMonth className="w-5 h-5" />
  },
]

export const dashboardLinks = [
  // examples below
  {
    name: 'Temp: Image',
    href: '/dashboard/temp_image',
    icon: <MdSpaceDashboard className='w-5 h-5'/>
  },
  // {
  //   name: 'Login',
  //   href: '/account/login',
  // },
]

export const accountLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className="w-5 h-5" />
  },
  {
    name: 'Account',
    href: '#',
    icon: <MdAccountCircle className="w-5 h-5" />
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: <MdLocationOn className="w-5 h-5" />
  },
  {
    name: 'Reservations',
    href: '/reservation',
    icon: <MdCalendarMonth className="w-5 h-5" />
  },
]