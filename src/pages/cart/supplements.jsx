import { Disclosure } from '@headlessui/react';
import RdxAddToCartSupplementButton from "../../../redux/cart/addCartButtonSupplemant";
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md'

const Supplements = ({supplements}) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="my-8">
      <div className="divide-y divide-lime-800 border-y border-lime-800">
        <Disclosure as="div" key='drinks'>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span
                    className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                  >
                    Drinks
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MdOutlineRemove
                        className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdOutlineAdd
                        className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="prose prose-sm">
                <div className="bg-white/40 rounded-md p-8 flex flex-col gap-1 text-lime-800 mb-8">
                  {supplements.map((item) => {
                    if(item.category === 'Drink' && item.stock_availability) {
                      // price and add to cart button
                      return <div className="flex flex-row justify-between border-b border-lime-800 pb-1">
                        <div>
                          <p>{item.name}</p>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                          <p>${item.price.toFixed(2)}</p>
                          <RdxAddToCartSupplementButton 
                            className="px-5 py-1 bg-lime-800 text-white hover:bg-lime-600 rounded-md"
                            item={item}
                            >
                              Add to Cart
                            </RdxAddToCartSupplementButton>
                        </div>
                      </div>
                    }
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="divide-y divide-lime-800 border-b border-lime-800">
        <Disclosure as="div" key='drinks'>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span
                    className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                  >
                    Sauces
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MdOutlineRemove
                        className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdOutlineAdd
                        className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="prose prose-sm">
                <div className="bg-white/40 rounded-md p-8 flex flex-col gap-1 text-lime-800 mb-8">
                  {supplements.map((item) => {
                    if(item.category === 'Sauce' && item.stock_availability) {
                      // price and add to cart button
                      return <div className="flex flex-row justify-between border-b border-lime-800 pb-1">
                        <div>
                          <p>{item.name}</p>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                          <p>{item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}</p>
                          <RdxAddToCartSupplementButton 
                            className="px-5 py-1 bg-lime-800 text-white hover:bg-lime-600 rounded-md"
                            item={item}
                            >
                              Add to Cart
                          </RdxAddToCartSupplementButton>
                        </div>
                      </div>
                    }
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="divide-y divide-lime-800 border-b border-lime-800">
        <Disclosure as="div" key='drinks'>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span
                    className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                  >
                    Rice Bowls
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MdOutlineRemove
                        className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdOutlineAdd
                        className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="prose prose-sm">
                <div className="bg-white/40 rounded-md p-8 flex flex-col gap-1 text-lime-800 mb-8">
                  {supplements.map((item) => {
                    if(item.category === 'Bowl Rice' && item.stock_availability) {
                      return <div className="flex flex-row justify-between border-b border-lime-800 pb-1">
                        <div>
                          <p>{item.name}</p>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                          <p>${item.price.toFixed(2)}</p>
                          <RdxAddToCartSupplementButton 
                            className="px-5 py-1 bg-lime-800 text-white hover:bg-lime-600 rounded-md"
                            item={item}
                            >
                              Add to Cart
                            </RdxAddToCartSupplementButton>
                        </div>
                      </div>
                    }
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
export default Supplements;