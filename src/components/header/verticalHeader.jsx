import { dashboardLinks } from '../../../data/navigations'
import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { motion, spring } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { MdLastPage, MdFirstPage, MdSettings, MdClose } from 'react-icons/md'
import { BsStripe } from 'react-icons/bs'
import { RdxLogOutButton1 } from '../../../redux/auth/logOutButtons'
import { setIsVerticalMenuNarrow, setIsVerticalMenuWide } from '../../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const VerticalHeader = ({path}) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)

  const [ isPopOpen, setIsPopOpen ] = useState(false)
  const [ role, setRole ] = useState('')
  const { data: session } = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage) {
      setRole(localStorage.userRole)
    }
  },[])

  const styleChange = (state) => {
    if (state) {
      return 'fixed bg-yellow-500 left-[4.5em] top-[1.5em] px-1 py-4 rounded-r-md flex items-center'
    } else {
      return 'fixed bg-yellow-500 left-[9em] top-[1.5em] px-2 py-4 rounded-r-md flex items-center'
    }
  }

  const buttonStylesNarrow = (href) => {
    if(path === href) {
      return 'min-h-[2.75em] flex justify-center p-3 bg-white/40 rounded-md'
    } else {
      return "min-h-[2.75em] flex justify-center p-3 hover:bg-white/40 rounded-md"
    }
  }

  const buttonStyles = (href) => {
    if(path === href) {
      return 'flex justify-start gap-2 p-2 items-center bg-white/40 rounded-md truncate'
    } else {
      return 'flex justify-start gap-2 p-2 items-center hover:bg-white/40 rounded-md truncate'
    }
  }

  const popStyles = (state) => {
    if (state) {
      return 'fixed left-[6em] bottom-[1.5em] bg-yellow-500 rounded-md shadow-lg p-4 text-lime-800 min-w-[150px] flex flex-col flex-nowrap gap-2'
    } else {
      return 'fixed left-[11em] bottom-[1.5em] bg-yellow-500 rounded-md shadow-lg p-4 text-lime-800 min-w-[150px] flex flex-col flex-nowrap gap-2'
    }
  }

  const toggleReduxState = () => {
    if(isVerticalMenuNarrow) {
      dispatch(setIsVerticalMenuNarrow())
    } else {
      dispatch(setIsVerticalMenuWide())
    }
  }

  return (
    <motion.nav
      layout
      style={{ originX: 0 }}
      transition={{duration: 0.25, spring}}
      animate={{
        width: isVerticalMenuNarrow ? '5em' : '10.5em',
      }}
      className='bg-yellow-500 text-lime-800 shadow-md sticky top-0 h-screen flex flex-col flex-nowrap p-4'
    >
      {/* Logo */}
      <div className='flex justify-center py-4 border-b border-lime-800'>
        <a className='font-bold text-2xl' href='/'>{isVerticalMenuNarrow ? 'L' : 'Logo'}</a>
      </div>  
      {/* ToggleButton */}
      <motion.div
        layout
        className={styleChange(isVerticalMenuNarrow)}
        transition={{duration: 0.25, spring}}
      >
        <button onClick={toggleReduxState}>{isVerticalMenuNarrow ? <MdLastPage className='w-5 h-5' /> : <MdFirstPage className='w-5 h-5' />}</button>
      </motion.div>
      <div className='mt-4 flex flex-col w-full h-full flex-nowrap justify-between'>
        {/* Links */}
        <div className='flex flex-col flex-nowrap gap-4 w-full h-full'>
          {dashboardLinks && dashboardLinks.map((link, i) => {
            return <NextLink
              key={i}
              href={link.href}
              className={isVerticalMenuNarrow ? buttonStylesNarrow(link.href) : buttonStyles(link.href)}
            >
              {link.icon && link.icon}<span className='pl-7'>{!isVerticalMenuNarrow && link.name}</span>
            </NextLink>
          })}
        </div>
        <div>
          <div className='flex flex-col flex-nowrap border-t border-lime-800 pt-2 gap-2'>
            {/* Settings */}
            <NextLink
              href='/dashboard/settings'
              className={isVerticalMenuNarrow ? buttonStylesNarrow('/dashboard/settings') : buttonStyles('/dashboard/settings')}
            >
              <MdSettings className='w-5 h-5'/>{!isVerticalMenuNarrow && 'Settings'}
            </NextLink>
            {/* Settings */}
              {role === 'admin' ?
                <a
                  href='https://dashboard.stripe.com/dashboard'
                  target='_blank'
                  className={isVerticalMenuNarrow ? buttonStylesNarrow('stripe') : buttonStyles('stripe')}
                >
                  <BsStripe className='w-5 h-5'/>{!isVerticalMenuNarrow && 'Stripe'}
                </a>
              :
                <p
                  href='https://dashboard.stripe.com/dashboard'
                  target='_blank'
                  className={isVerticalMenuNarrow ? buttonStylesNarrow('stripe') : buttonStyles('stripe')}
                >
                  <BsStripe className='w-5 h-5'/>{!isVerticalMenuNarrow && 'Stripe'}
                </p>

              }
            {/* Help */}
            {/* <NextLink
              href='/dashboard/help'
              className={isVerticalMenuNarrow ? buttonStylesNarrow('/dashboard/help') : buttonStyles('/dashboard/help')}
            >
              <MdOutlineHelp className='w-5 h-5'/>{!isVerticalMenuNarrow && 'Help'}
            </NextLink> */}
          </div>

          {/* Account */}
          {session && <div 
              className='flex flex-col flex-nowrap gap-2 border-t border-lime-800 mt-2 pt-2'
            >
              <div 
                className={isVerticalMenuNarrow ? 'flex flex-row flex-nowrap items-center justify-center px-2 py-3 hover:bg-white/40 rounded-md' : 'flex flex-row flex-nowrap justify-center items-center px-2 py-3 hover:bg-white/40 rounded-md hover:cursor-pointer'}
                onClick={() => setIsPopOpen(!isPopOpen)}
                >
                {isVerticalMenuNarrow ?
                  <div 
                    style={{backgroundImage: `url("${session.user.image}")`}}
                    className='w-7 h-7 rounded-full flex justify-center items-center bg-lime-800 text-white text-md'
                  >
                    {session.user.email.substring(0, 1).toUpperCase()}
                  </div>
                :
                  <p className='text-xs truncate'>{session.user.email}</p>
                }
              </div>
            </div>
          }
          {/* POP */}
          {session && <motion.div
              className={isPopOpen ? popStyles(isVerticalMenuNarrow) : 'hidden'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <button 
                className='absolute top-[1em] right-[1em] bg-white/40 rounded-full p-[.125em]'
                onClick={() => setIsPopOpen(!isPopOpen)}
              >
                <MdClose />
              </button>
              <RdxLogOutButton1 />
            </motion.div>
          }

        </div>
      </div>
    </motion.nav>
  );
}
export default VerticalHeader;