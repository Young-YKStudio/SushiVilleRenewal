import axios from 'axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardAccount = (props) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const [ searchedText, setSearchedText ] = useState('')
  const [ userList, setUserList ] = useState([])

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

  },[props.accounts, searchedText])

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
    }
  }

  const roleDistributor = (userdata) => {
    if(userdata.role) {
      return `${userdata.role}`
    } else {
      return `${userdata.isAdmin}`
    }
  }

  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Accounts</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 h-[85vh] overflow-auto">
      <div className="sm:flex sm:items-center pt-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-lime-800">Account Edit</h1>
          <p className="pt-2 text-sm text-gray-700">
            Total Accounts: <span className='font-bold text-lime-800'>{props.accounts.length}</span>
          </p>
          <p>
            
          </p>
          <input 
            type='text' 
            className='text-sm px-4 py-1 border border-lime-800 rounded-xl focus:ring-0 w-full max-w-[25em] !outline-none focus:border-lime-500 mt-4' 
            placeholder='Search name...'
            value={searchedText}
            onChange={(e) => setSearchedText(e.target.value)}
          />
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
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Account Created
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Orders
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Role
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
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      {moment(user.createdAt).tz('America/New_York').format('LL')}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {user.Orders.length}
                    </td>

                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {roleDistributor(user)}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== userList.length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}
                    >
                      <button
                        className='text-lime-800 hover:text-yellow-600'
                        onClick={(e) => Router.push(`/dashboard/account/user/${user._id}`)}
                      >
                        View / Edit
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
export default DashboardAccount;

export async function getServerSideProps() {
    
  let data = null

  // API to get products
  const request = await axios.get(`${process.env.APP_URL}/api/account/getAllAccounts`)
  if(request.data.success) {
    data = request.data.accounts
  }
  if(data) {
    return {props: {accounts: data}}
  }
}