import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice';

import CurrentOrders from "./landingParts/CurrentOrders";
import ReadyOrders from "./landingParts/ReadyOrders";
import NewOrders from './landingParts/NewOrders'
import NewReservations from "./landingParts/NewReservations";
import CurrentReservations from "./landingParts/CurrentReservations";
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const dispatch = useDispatch()
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const [ orders, setOrders ] = useState(null)
  const [ reservations, setReservations ] = useState(null)
  const [ now, setNow ] = useState()

  useEffect(() => {
    let isMounted = true
    dispatch(setLoadingOn())
    const callAPI = async () => {
      if(isMounted) {
        let request = await axios.get('/api/dashboard/dashboardLanding')
        if(request.data.success) {
          setOrders(request.data.orders)
          setReservations(request.data.reservations)
          dispatch(setLoadingOff())
        }
      }
    }
    callAPI()
    return () => {
      isMounted = false
    }
  },[])

  const callServer = async () => {
    dispatch(setLoadingOn())

    try {
      let request = await axios.get('/api/dashboard/dashboardLanding')
      if(request.data.success) {
        setOrders(request.data.orders)
        setReservations(request.data.reservations)
        dispatch(setLoadingOff())
      }
    } catch (error) {
      dispatch(setLoadingOff())
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      callServer()
    }, 60000)
    return () => clearInterval(interval)
  },[])

  const styleDistributor = (state) => {
    if(!state) {
      return 'py-8 w-full'
    } else {
      return 'py-8 w-full'
    }
  }

  return (
    <div className={styleDistributor(isVerticalMenuNarrow)}>
      {/* TODO: change background above */}
      <NewOrders orders={orders} callServer={callServer} now={now} />
      <CurrentOrders orders={orders} />
      <ReadyOrders orders={orders} />
      <NewReservations reservations={reservations} />
      <CurrentReservations reservations={reservations} />
    </div>
  );
}
export default Dashboard;