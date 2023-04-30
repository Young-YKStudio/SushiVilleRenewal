import { MdSpaceDashboard, MdShoppingCart, MdLocationOn, MdAccountCircle, MdFoodBank, MdRequestPage, MdCalendarMonth, MdEditSquare } from "react-icons/md";

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

  // order history
  // reservation history
  // view/find user
  // menu edit -- options
  // stats
  // store open/close -- options
  // {
  //   name: 'Temp: Image',
  //   href: '/dashboard/temp_image',
  //   icon: <MdSpaceDashboard className='fixed w-5 h-5'/>
  // },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard className='fixed w-5 h-5'/>
  },
  {
    name: 'Orders',
    href: '/dashboard/orderHistory',
    icon: <MdRequestPage className='fixed w-5 h-5'/>
  },
  {
    name: 'Reservations',
    href: '/dashboard/reservationHistory',
    icon: <MdCalendarMonth className='fixed w-5 h-5'/>
  },
  {
    name: 'Menu Edit',
    href: '/dashboard/menuEdit',
    icon: <MdEditSquare className='fixed w-5 h-5'/>
  },
  {
    name: 'Accounts',
    href: '/dashboard/account',
    icon: <MdAccountCircle className='fixed w-5 h-5'/>
  },

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