import axios from 'axios'
import { useState } from 'react'
import { MdOutlineAdd, MdOutlineRemove, MdAddShoppingCart } from 'react-icons/md'
import RdxAddToCartButton from '../../../redux/cart/AddCartButton';
import { Disclosure, Switch, Swtich } from '@headlessui/react';
import { Options } from '../../../data/menu';


const ProductPage = (props) => {

  console.log(props, 'at item page')

  const [ qty, setQty ] = useState(1)
  const [ BrownRice, setBrownRice ] = useState(false)
  const [ SoyPaper, setSoyPaper ] = useState(false)
  const [ Crunch, setCrunch ] = useState(false)
  const [ SpicyMayo, setSpicyMayo ] = useState(false)
  const [ EelSauce, setEelSauce ] = useState(false)
  const [ specialInstructions, setSpecialInstructions ] = useState('')
  const [ tunaOrSalmon, setTunaOrSalmon ] = useState(null)

  const qtySetter = (type) => {
    if (type === 'minus') {
      let newQty = qty - 1
      return newQty < 1 ? setQty(1) : setQty(newQty)
    } else if (type === 'plus') {
      let newQty = qty + 1
      return setQty(newQty)
    }
  }

  const instructionChangeHandler = (e) => {
    setSpecialInstructions(e.target.value)
  }

  const tunaSalmonChangeHandler = (e) => {
    setTunaOrSalmon(e.target.value)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  let buttonData = {
    brownRice: BrownRice,
    soyPaper: SoyPaper,
    crunch: Crunch,
    spicyMayo: SpicyMayo,
    eelSauce: EelSauce,
    message: specialInstructions,
    tunaOrSalmon: tunaOrSalmon,
  }

  const tunaSalmonButton = () => {
    if (!tunaOrSalmon) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center'
      >Pick your choice</button>
    } else {
      return <RdxAddToCartButton item={props.product} qty={qty} addOn={buttonData} />
    }
  }

  const BrownRiceOption = () => {
    if (props.product.category === 'Special Rolls' || props.product.category === 'Regular Rolls') {
      return <div className='flex flex-row justify-between items-center'>
        <div>
          <p>Brown Rice</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Switch
            checked={BrownRice}
            onChange={setBrownRice}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

          >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
            <span
              aria-hidden="true"
              className={classNames(
                BrownRice ? 'bg-lime-800' : 'bg-yellow-500',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
              )}
            /> 
            <span
              aria-hidden="true"
              className={classNames(
                BrownRice ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
              )}
            />
          </Switch>
          <div className='text-xs'>+ $1.00</div>
        </div>
      </div>
    }
  }

  const SoyPaperOption = () => {
    if (props.product.category === 'Special Rolls' || props.product.Sub_Category === 'Regular Rolls') {
      return <div className='flex flex-row justify-between items-center'>
      <div>
        <p>Soy Paper</p>
      </div>
      <div className='flex flex-row gap-2 items-center'>
        <Switch
          checked={SoyPaper}
          onChange={setSoyPaper}
          className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

        >
          <span className="sr-only">Use setting</span>
          <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
          <span
            aria-hidden="true"
            className={classNames(
              SoyPaper ? 'bg-lime-800' : 'bg-yellow-500',
              'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
            )}
          /> 
          <span
            aria-hidden="true"
            className={classNames(
              SoyPaper ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
            )}
          />
        </Switch>
        <div className='text-xs'>+ $1.00</div>
      </div>
    </div>
    }
  }

  const CrunchOption = () => {
    if (props.product.category === 'Special Rolls' || props.product.category === 'Regular Rolls') {
      return <div className='flex flex-row justify-between items-center'>
        <div>
          <p>Crunch Topping</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Switch
            checked={Crunch}
            onChange={setCrunch}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

          >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
            <span
              aria-hidden="true"
              className={classNames(
                Crunch ? 'bg-lime-800' : 'bg-yellow-500',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
              )}
            /> 
            <span
              aria-hidden="true"
              className={classNames(
                Crunch ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
              )}
            />
          </Switch>
          <div className='text-xs'>+ $0.50</div>
        </div>
      </div>
    }
  }

  const SpicyMayoOption = () => {
    if (props.product.category === 'Special Rolls' || props.product.category === 'Regular Rolls') {
      return <div className='flex flex-row justify-between items-center'>
        <div>
          <p>Spicy Mayo</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Switch
            checked={SpicyMayo}
            onChange={setSpicyMayo}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

          >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
            <span
              aria-hidden="true"
              className={classNames(
                SpicyMayo ? 'bg-lime-800' : 'bg-yellow-500',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
              )}
            /> 
            <span
              aria-hidden="true"
              className={classNames(
                SpicyMayo ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
              )}
            />
          </Switch>
          <div className='text-xs'>+ $0.50</div>
        </div>
      </div>
    }
  }

  const EelSauceOption = () => {
    if (props.product.category === 'Special Rolls' || props.product.category === 'Regular Rolls') {
      return <div className='flex flex-row justify-between items-center'>
        <div>
          <p>Eel Sauce</p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Switch
            checked={EelSauce}
            onChange={setEelSauce}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

          >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
            <span
              aria-hidden="true"
              className={classNames(
                EelSauce ? 'bg-lime-800' : 'bg-yellow-500',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
              )}
            /> 
            <span
              aria-hidden="true"
              className={classNames(
                EelSauce ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
              )}
            />
          </Switch>
          <div className='text-xs'>+ $0.50</div>
        </div>
      </div>
    }
  }

  return (
    <section className='pt-24 pb-8 flex flex-row justify-center w-full lg:gap-8 px-8 bg-yellow-500 min-h-[90vh]'>

      {/* container */}
      <div className='w-full flex flex-col lg:flex-row lg:gap-24 max-w-[1200px]'>
        {/* LeftSide */}
        <div className='lg:my-auto lg:w-3/4'>
          {/* image */}
          {props.product.image &&
            <div>
              <div
                style={{backgroundImage: `url("${props.product.image}")`}}
                className='aspect-w-3 aspect-h-2 lg:aspect-h-1 bg-center bg-cover rounded-lg lg:max-w-[500px] shadow-lg'
              />
            </div>
          }
          {/* title */}
          <div className='pt-8 flex flex-col gap-4'>
            <p className='text-3xl font-bold uppercase tracking-wide text-lime-800 border-b border-lime-800'>{props.product.name}</p>
            {props.product.caption && <p>{props.product.caption}</p>}
            <p className='text-slate-700'>{props.product.description}</p>
            {props.product.caption === 'Tuna or Salmon' && <div className='flex gap-4'>
                <label>
                  <input type='radio' id='tuna' name='tunasalmon' value='tuna' onChange={tunaSalmonChangeHandler} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
                  Tuna
                </label>
                <label>
                  <input type='radio' id='salmon' name='tunasalmon' value='salmon' onChange={tunaSalmonChangeHandler} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
                  Salmon
                </label>
              </div>
            }
          </div>
        </div>

        {/* RightSide */}
        <div className='lg:my-auto lg:w-1/4 text-lime-800 lg:border-l border-lime-800 lg:p-8'>
          <p className='text-lg font-bold'>${props.product.price.toFixed(2)}</p>
          {/* qty */}
          <div className='flex flex-col gap-2 py-4'>
            <div className='flex flex-row items-center gap-4'>
              {/* <p className='text-xs'>Quantity: </p> */}
              <div className='flex flex-row items-center'>
                <button 
                  onClick={() => qtySetter('minus')}
                  className='p-2 border border-lime-800 rounded-md hover:border-lime-600'
                > <MdOutlineRemove /> </button>
                <div
                  className='py-2 px-4 text-lime-800 text-xl'
                >{qty} {qty == 1 ? <span className='text-sm'>item</span> : <span className='text-sm'>items</span>}</div>
                <button 
                  onClick={() => qtySetter('plus')}
                  className='p-2 border border-lime-800 rounded-md hover:border-lime-600'
                > <MdOutlineAdd /> </button>
              </div>
            </div>

            {/* ADDONS */}
            <div>
              <div className="divide-y divide-lime-800 border-t border-lime-800 mt-4">
                <Disclosure as="div" key='options'>
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span
                            className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                          >
                            Options
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
                      <Disclosure.Panel as="div" className="prose prose-sm flex flex-col">
                        {/* Brown Rice */}
                        {props.product.caption !== 'No Rice' && BrownRiceOption()}
                        {/* Soy Paper */}
                        {props.product.caption !== 'Soy Paper' && SoyPaperOption() }
                        {/* Crunch */}
                        {CrunchOption()}
                        {/* spmayo */}
                        {SpicyMayoOption()}
                        {/* eelsauce */}
                        {EelSauceOption()}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <div className="divide-y divide-lime-800 border-y border-lime-800">
                <Disclosure as="div" key='options'>
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span
                            className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                          >
                            Special Instructions
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
                      <Disclosure.Panel as="div" className="prose prose-sm flex flex-col">
                        <textarea 
                          value={specialInstructions}
                          onChange={instructionChangeHandler}
                          rows={4}
                          className='text-sm text-slate-700 rounded-md border-none'
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>

            {/* buttons */}
            {props.product.caption === 'Tuna or Salmon' ? 
              tunaSalmonButton()

            :
            <div className='flex flex-row flex-nowrap items-center py-4 gap-4'>
              <div className='max-w-sm w-full'>
                <RdxAddToCartButton item={props.product} qty={qty} addOn={buttonData} />
              </div>
            </div>

            }

          </div>
        </div>

      </div>
    </section>
  );
}
  
export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.post(`${process.env.APP_URL}/api/menu/getOneMenu`, requestData)
  if(request.data.success) {
    data = request.data.menu
  }
  if(data) {
    return {props: {id: id, product: data}}
  }
}

export default ProductPage ;

// Add to cart button
// addon model
// order model
// option choices - Brown Rice + $1.00, Soy Paper + $1.00, Crunch Topping + $0.50, Spicy Mayo Topping + $0.50, Eel Sauce Topping + $0.50
// special instructions - string
// use white space! i have ton of space to use.