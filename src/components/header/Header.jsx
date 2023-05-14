import VerticalHeader from "./verticalHeader";
import HorizontalHeader from "./horizontalHeader";
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { checkSessionAgain } from "../../../redux/cartSlice";
import Router from 'next/router'

const Header = ({path}) => {

  const { data: session } = useSession()
  const dispatch = useDispatch()

  
  useEffect(() => {
    if(session) {
      if(!!session.user.image) {
        dispatch(checkSessionAgain(session.user))
      }
    }
  },[session])

  useEffect(() => {
    if(path.startsWith('/dashboard')) {
      if(localStorage.userRole === 'employee' || localStorage.userRole === 'admin') {
      } else {
        Router.push('/')
      }
    }

    if(path.startsWith('/reservation')) {
      if(localStorage.userRole === 'null' || !localStorage.userRole) {
        Router.push('/account/login')
      }
    }    

    if(path.startsWith('/account/user')) {
      if(localStorage.userRole === 'null' || !localStorage.userRole) {
        Router.push('/account/login')
      }
    }    
  }, [path])

  const HeaderDistributor = () => {
    if(path.includes('/dashboard')) {
      return <VerticalHeader path={path} />
    } else {
      return <HorizontalHeader path={path} />
    }
  }
  return (
    <>
      {HeaderDistributor()}
    </>
  );
}
export default Header;