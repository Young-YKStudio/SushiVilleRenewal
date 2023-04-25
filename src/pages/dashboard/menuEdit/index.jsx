import axios from 'axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MenuEditDashboard = (props) => {
  console.log(props)

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[80%] lg:max-w-[86%]'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[80%] lg:max-w-[90%]'
    }
  }


  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Menu Edit Page</h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 h-[85vh] overflow-auto">
      <div className="pt-8 flow-root">
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
                      Category
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Sub Category
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Ordered
                    </th>

                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Stock
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
                  {props.menu && props.menu.map((menu, personIdx) => (
                    <tr key={menu._id}>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {menu.name}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {menu.category}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {menu.Sub_Category}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {menu.image ? 'Image Added' : 'No Image'}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        ${menu.price.toFixed(2)}
                      </td>

                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {menu.ordered}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {menu.stock_availability ? 'In Stock' : 'Out of Stock'}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.menu.length - 1 ? 'border-b border-gray-200' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                        )}
                      >
                        <button
                          className='text-lime-800 hover:text-yellow-600'
                          onClick={(e) => buttonHandler(e, reservation._id)}
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MenuEditDashboard;

export async function getServerSideProps() {
  // call API to get products
  let data = null
  const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
  if(request.data.success) {
    data = request.data.menu
  }
  if(data) {
    return {props: {menu: data}}
  }
}

// name
// category
// subcategory
// caption
// image
// price
// ordered
// stock