import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../../../../redux/cartSlice';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment-timezone'
import Router from 'next/router';
import { MdOutlineAdd } from 'react-icons/md'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddCouponDashboard = (props) => {
  const dispatch = useDispatch()
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const [ couponAmount, setCouponAmount ] = useState('')
  const [ selectedAccount, setSelectedAccount ] = useState(null)
  const [ searchedText, setSearchedText ] = useState('')
  const [ userList, setUserList ] = useState([])
  let allAccount = props.accounts

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
    }
  }

  useEffect(() => {
    let isMounted = true
    const setMenu = async () => {
      if(isMounted && searchedText === '') {
        setUserList(props.accounts)
      }
      if(isMounted && searchedText !== '') {
        let tempArry = []
        await props.accounts.forEach(account => {
          if(account.username) {
            if(account.username.toLowerCase().includes(searchedText.toLocaleLowerCase())) {
              tempArry.push(account)
            }
          }
          if(account.name) {
            if(account.name.toLowerCase().includes(searchedText.toLocaleLowerCase())) {
              tempArry.push(account)
            }
          }
        })
        setUserList(tempArry)
      } 
    }
    setMenu()
    return () => {
      isMounted = false
    }
  }, [props.accounts, searchedText])

  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Coupons - Accounts</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 h-[85vh] overflow-auto">
      <div className="sm:flex sm:items-center pt-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-lime-800">Add Coupon</h1>
          <p className="pt-2 text-sm text-gray-700">
            Please select account for assign coupons to customer, or click button to generate promo code.
          </p>
          <input 
            type='text' 
            className='text-sm px-4 py-1 border border-lime-800 rounded-xl focus:ring-0 w-full max-w-[25em] !outline-none focus:border-lime-500 mt-4' 
            placeholder='Search name...'
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="rounded-md bg-lime-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 flex items-center"
              onClick={() => {Router.push(`/dashboard/coupons/promoCode`)}}
            >
              <MdOutlineAdd className='w-5 h-5 mr-2'/> Promo Code
            </button>
          </div>
      </div>

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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                  >
                    Contact
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
                {userList.length > 0 ? userList.map((user, personIdx) => (
                  <tr key={user._id}>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {user.username ? user.username : user.name}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      {user.email}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {user.contact}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}
                    >
                      <button
                        className='text-lime-800 hover:text-yellow-600'
                        onClick={(e) => Router.push(`/dashboard/coupons/addCoupon/account/${user._id}`)}
                      >
                        Add Coupon
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
      </div>
    </section>
  );
}
export default AddCouponDashboard;

export async function getServerSideProps() {
    
  let data = null

  // API to get products
  const request = await axios.get(`${process.env.APP_URL}/api/account/getAllAccounts`)
  if(request.data.success) {
    data = request.data.accounts
  }
  return {props: {accounts: data}}
}