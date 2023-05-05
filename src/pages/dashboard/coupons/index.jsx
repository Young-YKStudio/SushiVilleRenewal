import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { MdOutlineAdd, MdDelete } from 'react-icons/md'
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'
import { setLoadingOff, setLoadingOn } from '../../../../redux/cartSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardCoupons = (props) => {

  console.log(props)

  const dispatch = useDispatch()
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const [ currentSection, setCurrentSection ] = useState('promo')
  const [ searchedText, setSearchedText ] = useState('')
  const [ promoCoupons, setPromoCoupons ] = useState([])
  const [ accountCoupons, setAccountCoupons ] = useState([])

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
    }
  }

  useEffect(() => {

    let isMounted = true
    const setPromo = async () => {
      if(isMounted) {
        setPromoCoupons(props.promoCoupons)
      }
    }

    const setAccount = async () => {
      if(isMounted && searchedText === '') {
        setAccountCoupons(props.accountCoupons)
      }
      if(isMounted && searchedText !== '') {
        let tempArry = []
        await props.accountCoupons.forEach(coupon => {
          if(coupon.customer.username) {
            if(coupon.customer.username.toLowerCase().includes(searchedText.toLowerCase())) {
              tempArry.push(coupon)
            }
          }
          if(coupon.customer.name) {
            if(coupon.customer.name.toLowerCase().includes(searchedText.toLowerCase())) {
              tempArry.push(coupon)
            }
          }
        })
        setAccountCoupons(tempArry)
      }
    }

    setPromo()
    setAccount()

    return () => {
      isMounted = false
    }

  }, [props, searchedText])

  const promoStatus = (boolean) => {
    if(boolean) {
      return <span className='font-bold text-lime-800'>Active</span>
    } else {
      return <span className='text-red-500'>Disabled</span>
    }
  }

  const accountStatus = (isActive, isUsed) => {
    if(isActive && !isUsed) {
      return <span className='font-bold text-lime-800'>Active</span>
    }
    if(!isActive && isUsed) {
      return <span className='text-slate-400'>Used</span>
    }
    if(!isActive && !isUsed) {
      return <span className='text-red-500'>Disabled</span>
    }
  }

  const accountButtons = (isActive, isUsed, couponId, couponCode, customerId) => {
    if(isActive) {
      return <button
      className='text-lime-800 hover:text-yellow-600 truncate'
      onClick={(e) => toggleAccountCoupon(e, couponId, isActive, couponCode, customerId)}
    >
      Stop Coupon
    </button>
    }
    if(!isActive && !isUsed) {
      return <button
        className='text-lime-800 hover:text-yellow-600 truncate'
        onClick={(e) => toggleAccountCoupon(e, couponId, isActive, couponCode, customerId)}
      >
        Set Active
      </button>
    }
    if(!isActive && isUsed) {
      return <button
        disabled
        className='text-slate-400 truncate'
      >
        Coupon Used
      </button>
    }
  }

  const toggleIsActive = async (e, id, status, code) => {
    if(!id) {
      return
    }
    let submitData = {
      coupon: id,
      status: status
    }

    try {
      dispatch(setLoadingOn())
      let request = await axios.put('/api/coupon/toggleIsActive', submitData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success(`Coupon ${code} has been updated to ${status ? 'Disabled' : 'Active'}`)
        setTimeout(() => {
          Router.reload()
        }, 50)
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error('Error found when updating status. Please contact support or try again later.')
    }
  } 

  const deletePromoCoupon = async (e, id, code) => {
    if(!id) {
      return
    }

    let submitData = {
      coupon: id
    }

    try {
      dispatch(setLoadingOn())
      let request = await axios.put('/api/coupon/deletePromoCoupon', submitData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success(`Coupon ${code} has been deleted`)
        setTimeout(() => {
          Router.reload()
        }, 50)
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error('Error found when updating status. Please contact support or try again later.')
    }
  }

  const deleteAccountCoupon = async (e, couponId, couponCode, userId) => {
    if(!couponId || !userId) {
      return
    }

    let submitData = {
      coupon: couponId,
      user: userId
    }

    try {
      dispatch(setLoadingOn())
      let request = await axios.put('/api/coupon/deleteAccountCoupon', submitData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success(`Coupon ${couponCode} has been deleted`)
        // setTimeout(() => {
        //   Router.reload()
        // }, 50)
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error('Error found when updating status. Please contact support or try again later.')
    }
  }

  const toggleAccountCoupon = async (e, couponId, couponStatus, couponCode, userId) => {
    if(!couponId) {
      return
    }
    let submitData = {
      coupon: couponId,
      status: couponStatus,
      user: userId
    }

    try {
      dispatch(setLoadingOn())
      let request = await axios.put('/api/coupon/toggleAccountStatus', submitData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success(`Coupon ${couponCode} has been updated to ${couponStatus ? 'Disabled' : 'Active'}`)
        setTimeout(() => {
          Router.reload()
        }, 50)
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error('Error found when updating status. Please contact support or try again later.')
    }
  }

  return (
    <section
      className={styleDistributor(isVerticalMenuNarrow)}
    >
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Coupons</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 h-[83vh] overflow-auto">
        <div className="sm:flex sm:items-center pt-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-lime-800">Coupon List</h1>
            <p className="pt-2 text-sm text-gray-700">
              Please provide customer a coupon to get discounts on online orders.
            </p>
            <input 
              type='text' 
              className='text-sm px-4 py-1 border border-lime-800 rounded-xl focus:ring-0 w-full max-w-[25em] !outline-none focus:border-lime-500 mt-4' 
              placeholder='Search account name ...'
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
            />
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="rounded-md bg-lime-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 flex items-center"
              onClick={() => {Router.push(`/dashboard/coupons/addCoupon`)}}
            >
              <MdOutlineAdd className='w-5 h-5 mr-2'/> Add Coupon
            </button>
          </div>
        </div>
        
        {/* section select*/}
        <div className="pt-8 w-full grid grid-cols-2 gap-2 text-lime-800 border-b pb-2 border-lime-800">
          <button onClick={() => setCurrentSection('promo')} className={currentSection === 'promo' ? 'bg-lime-800 text-white rounded-md py-2' : 'py-2 rounded-md hover:bg-lime-800 hover:text-white'}>Promo Coupons</button>
          <button onClick={() => setCurrentSection('account')} className={currentSection === 'account' ? 'bg-lime-800 text-white rounded-md py-2' : 'py-2 rounded-md hover:bg-lime-800 hover:text-white'}>Account Coupons</button>
        </div>

        {/* list - promo */}
        { currentSection === 'promo' && 
          <div className='pt-8 flow-root'>
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Coupon Code
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Coupon Used
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Button</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCoupons.length > 0 ? promoCoupons.map((coupon, personIdx) => (
                      <tr key={coupon._id}>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {promoStatus(coupon.isActive)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                          )}
                        >
                          {coupon.couponCode}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                          )}
                        >
                          ${coupon.amount.toFixed(2)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {coupon.couponUsedAccts.length} times
                        </td>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {moment(coupon.createdAt).tz('America/New_York').format('LL')}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== promoCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8 flex flex-row items-center gap-2 justify-between'
                          )}
                        >
                          <button
                            className='text-lime-800 hover:text-yellow-600 truncate'
                            onClick={(e) => toggleIsActive(e, coupon._id, coupon.isActive, coupon.couponCode)}
                          >
                            {coupon.isActive ? 'Set Disabled' : 'Set Active'}
                          </button>
                          <button className='text-slate-400 hover:text-lime-800 px-2'
                            onClick={(e) => deletePromoCoupon(e, coupon._id, coupon.couponCode)}
                          >
                            <MdDelete className='w-5 h-5' />
                          </button>
                        </td>
                      </tr>
                    ))
                    :
                      null
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        {/* list - account */}
        { currentSection === 'account' && 
          <div className='pt-8 flow-root'>
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Coupon Code
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Account
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Button</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountCoupons.length > 0 ? accountCoupons.map((coupon, personIdx) => (
                      <tr key={coupon._id}>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {accountStatus(coupon.isActive, coupon.isUsed)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                          )}
                        >
                          {coupon.couponCode}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                          )}
                        >
                          ${coupon.amount.toFixed(2)}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {coupon.customer.username}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {moment(coupon.createdAt).tz('America/New_York').format('LL')}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== accountCoupons.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8 flex flex-row items-center gap-2 justify-between'
                          )}
                        >
                          {accountButtons(coupon.isActive, coupon.isUsed, coupon._id, coupon.couponCode, coupon.customer._id)}
                          <button 
                            className='text-slate-400 hover:text-lime-800 px-2'
                            onClick={(e) => deleteAccountCoupon(e, coupon._id, coupon.couponCode, coupon.customer._id)}
                          >
                            <MdDelete className='w-5 h-5' />
                          </button>
                        </td>
                      </tr>
                    ))
                    :
                      null
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

      </div>
    </section>
  );
}
export default DashboardCoupons;

export async function getServerSideProps() {
  // call API to get products
  let promoCoupons = null
  let accountCoupons = null
  const request = await axios.get(`${process.env.APP_URL}/api/coupon/getAllCoupons`)
  if(request.data.success) {
    promoCoupons = request.data.promoCoupons
    accountCoupons = request.data.accountCoupons
  }
  if(promoCoupons.length >= 0 && accountCoupons.length >= 0) {
    return {props: {promoCoupons: promoCoupons, accountCoupons: accountCoupons}}
  }
}