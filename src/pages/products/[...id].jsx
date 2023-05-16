import axios from 'axios'
import { useState, useEffect } from 'react'
import { MdOutlineAdd, MdOutlineRemove, MdAddShoppingCart } from 'react-icons/md'
import RdxAddToCartButton from '../../../redux/cart/AddCartButton';
import { Disclosure, Switch } from '@headlessui/react';
import { Options, lunchRollSelections } from '../../../data/menu';
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice';
import { toast } from 'react-toastify'
import { FaRegHeart, FaHeart} from 'react-icons/fa'
import Router from 'next/router';

const ProductPage = (props) => {

  const [ qty, setQty ] = useState(1)
  const [ BrownRice, setBrownRice ] = useState(false)
  const [ SoyPaper, setSoyPaper ] = useState(false)
  const [ Crunch, setCrunch ] = useState(false)
  const [ SpicyMayo, setSpicyMayo ] = useState(false)
  const [ EelSauce, setEelSauce ] = useState(false)
  const [ specialInstructions, setSpecialInstructions ] = useState('')
  const [ tunaOrSalmon, setTunaOrSalmon ] = useState(null)
  const [ spicyOrSweet, setSpicyOrSweet ] = useState(null)
  const [ porkOrVeg, setPorkOrVeg ] = useState(null)
  const [ spicyTunaOrCali, setSpicyTunaOrCali ] = useState(null)
  const [ salGoneWildRainbow, setSalGoneWildRainbow ] = useState(null)
  const [ lunchPicks, setLunchPicks ] = useState({
    roll1: '',
    roll2: '',
    roll3: '',
  })
  const [ isFavorited, setIsFavorited ] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true

    if (!localStorage.userId || localStorage.userId === 'null' || localStorage.userId === null) {
      return
    }

    const getUser = async () => {

      let sendingData = {
        id: localStorage.userId
      }

      try {
        dispatch(setLoadingOn())
        const foundUser = await axios.put(`/api/account/findAccountId`, sendingData)
        if(foundUser.data.success) {
          foundUser.data.user.favorieItems && await foundUser.data.user.favorieItems.forEach((items) => {
            if(items._id === props.product._id) {
              setIsFavorited(true)
            }
          })
          dispatch(setLoadingOff())
        }
      } catch (error) {
        dispatch(setLoadingOff())
        return toast.error('Error at getting user data')
      }
    }

    getUser()
    return () => {
      isMounted = false
    }
  },[isFavorited])

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
    spicyOrSweet: spicyOrSweet,
    porkOrVeg: porkOrVeg,
    spicyTunaOrCali: spicyTunaOrCali,
    salGoneWildRainbow: salGoneWildRainbow,
    lunchPicks: lunchPicks,
  }

  const disabledButton = (caption, name) => {
    if (caption === 'Tuna or Salmon' && !tunaOrSalmon) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (caption === 'Spicy or Sweet' && !spicyOrSweet) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (caption === 'Pork or Vegetable' && !porkOrVeg) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Sushi Lunch' && !spicyTunaOrCali) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Sushi Regular' && !spicyTunaOrCali) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Sushi & Sashimi Regular Sets' && !spicyTunaOrCali) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Sushi Deluxe' && !salGoneWildRainbow) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Sushi & Sashimi Deluxe Sets' && !salGoneWildRainbow) {
      return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
    } 
    if (name === 'Pick 2 Rolls Lunch') {
      if(lunchPicks.roll1 === '' || lunchPicks.roll2 === ''){
        return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
      }
    }
    if (name === 'Pick 3 Rolls Lunch') {
      if(lunchPicks.roll1 === '' || lunchPicks.roll2 === '' || lunchPicks.roll3 === '') {
        return <button disabled
        className='px-4 py-2 bg-slate-400 text-white rounded-md flex justify-center items-center mt-2'
      >Pick your choice</button>
      }
    }

    return <div className='mt-2 flex flex-col'>
        <RdxAddToCartButton item={props.product} qty={qty} addOn={buttonData} />
      </div>

  }

  const optionChangeHandler = (e, caption, name) => {
    if(caption === 'Tuna or Salmon') {
      setTunaOrSalmon(e.target.value)
    }
    if(caption === 'Pork or Vegetable') {
      setPorkOrVeg(e.target.value)
    }
    if(caption === 'Spicy or Sweet') {
      setSpicyOrSweet(e.target.value)
    }
    if(name === 'Sushi Lunch') {
      setSpicyTunaOrCali(e.target.value)
    }
    if(name === 'Sushi Regular') {
      setSpicyTunaOrCali(e.target.value)
    }
    if(name === 'Sushi & Sashimi Regular Sets') {
      setSpicyTunaOrCali(e.target.value)
    }
    if(name === 'Sushi Deluxe') {
      setSalGoneWildRainbow(e.target.value)
    }
    if(name === 'Sushi & Sashimi Deluxe Sets') {
      setSalGoneWildRainbow(e.target.value)
    }
  }

  const selectChangeHandler = (e) => {
    setLunchPicks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  } 

  const selectOptions = (caption, name) => {
    if (caption === 'Tuna or Salmon') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label className=''>
          <input type='radio' id='tuna' name='tunasalmon' value='Tuna' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Tuna
        </label>
        <label>
          <input type='radio' id='salmon' name='tunasalmon' value='Salmon' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Salmon
        </label>
      </div>
    }
    if (caption === 'Pork or Vegetable') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='pork' name='porkVeg' value='Pork' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Pork
        </label>
        <label>
          <input type='radio' id='vegetable' name='porkVeg' value='Vegetable' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Vegetable
        </label>
      </div>
    }
    if (caption === 'Spicy or Sweet') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='spicy' name='spicysweet' value='Spicy' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Spicy
        </label>
        <label>
          <input type='radio' id='sweet' name='spicysweet' value='Sweet' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Sweet
        </label>
      </div>
    }
    if (name === 'Sushi Lunch') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='california' name='caliSptuna' value='California Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          California Roll
        </label>
        <label>
          <input type='radio' id='spicyTuna' name='caliSptuna' value='Spicy Tuna Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Spicy Tuna Roll
        </label>
      </div>
    }
    if (name === 'Sushi Regular') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='california' name='caliSptuna' value='California Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          California Roll
        </label>
        <label>
          <input type='radio' id='spicyTuna' name='caliSptuna' value='Spicy Tuna Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Spicy Tuna Roll
        </label>
      </div>
    }
    if (name === 'Sushi & Sashimi Regular Sets') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='california' name='caliSptuna' value='California Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          California Roll
        </label>
        <label>
          <input type='radio' id='spicyTuna' name='caliSptuna' value='Spicy Tuna Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Spicy Tuna Roll
        </label>
      </div>
    }
    if (name === 'Sushi Deluxe') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='salGoneWild' name='salRain' value='Salmon Gone Wild Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Salmon Gone Wild Roll
        </label>
        <label>
          <input type='radio' id='rainbow' name='salRain' value='Rainbow Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Rainbow Roll
        </label>
      </div>
    }
    if (name === 'Sushi & Sashimi Deluxe Sets') {
      return <div className='flex gap-4 text-lime-800 items-center'>
        <label>
          <input type='radio' id='salGoneWild' name='salRain' value='Salmon Gone Wild Roll' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Salmon Gone Wild Roll
        </label>
        <label>
          <input type='radio' id='rainbow' name='salRain' value='raiRainbow Rollnbow' onChange={(e) => optionChangeHandler(e, caption, name)} className='focus:ring-lime-800 ring-offset-lime-800 text-lime-800 mr-1'/>
          Rainbow Roll
        </label>
      </div>
    }
    if (name === 'Pick 2 Rolls Lunch') {
      return <div className='flex flex-col md:flex-row flex-nowrap text-lime-800 gap-4 mb-8'>
        <div>
          <p className='text-xs'>Roll 1</p>
          <select 
            className='rounded-md bg-white/40 focus:ring-lime-800 border-none shadow-md text-sm'
            name='roll1'
            onChange={(e) => selectChangeHandler(e)}
            value={lunchPicks.roll1}
          >
            <option disabled defaultValue='' value='' hidden>Select First Roll</option>
            {lunchRollSelections.map((menu, i) => {
              return <option key={i + 100} value={menu}>{menu}</option>
            })}
          </select>
        </div>
        <div>
          <p className='text-xs'>Roll 2</p>
          <select 
            className='rounded-md bg-white/40 focus:ring-lime-800 border-none shadow-md text-sm'
            name='roll2'
            onChange={(e) => selectChangeHandler(e)}
            value={lunchPicks.roll2}
          >
            <option disabled defaultValue='' value='' hidden>Select Second Roll</option>
            {lunchRollSelections.map((menu, i) => {
              return <option key={i} value={menu}>{menu}</option>
            })}
          </select>
        </div>
      </div>
    }
    if (name === 'Pick 3 Rolls Lunch') {
      return <div className='flex flex-col md:flex-row flex-nowrap text-lime-800 gap-4 mb-8'>
        <div>
          <p className='text-xs'>Roll 1</p>
          <select 
            className='rounded-md bg-white/40 focus:ring-lime-800 border-none shadow-md text-sm'
            name='roll1'
            onChange={(e) => selectChangeHandler(e)}
            value={lunchPicks.roll1}
          >
            <option disabled defaultValue='' value='' hidden>Select First Roll</option>
            {lunchRollSelections.map((menu, i) => {
              return <option key={i + 100} value={menu}>{menu}</option>
            })}
          </select>
        </div>
        <div>
          <p className='text-xs'>Roll 2</p>
          <select 
            className='rounded-md bg-white/40 focus:ring-lime-800 border-none shadow-md text-sm'
            name='roll2'
            onChange={(e) => selectChangeHandler(e)}
            value={lunchPicks.roll2}
          >
            <option disabled defaultValue='' value='' hidden>Select Second Roll</option>
            {lunchRollSelections.map((menu, i) => {
              return <option key={i} value={menu}>{menu}</option>
            })}
          </select>
        </div>
        <div>
          <p className='text-xs'>Roll 3</p>
          <select 
            className='rounded-md bg-white/40 focus:ring-lime-800 border-none shadow-md text-sm'
            name='roll3'
            onChange={(e) => selectChangeHandler(e)}
            value={lunchPicks.roll3}
          >
            <option disabled defaultValue='' value='' hidden>Select Third Roll</option>
            {lunchRollSelections.map((menu, i) => {
              return <option key={i + 200} value={menu}>{menu}</option>
            })}
          </select>
        </div>
      </div>
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
          <div className={BrownRice ? 'font-bold text-xs text-lime-800' : 'text-xs'}>+ $1.00</div>
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
        <div className={SoyPaper ? 'font-bold text-xs text-lime-800' : 'text-xs'}>+ $1.00</div>
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
          <div className={Crunch ? 'font-bold text-xs text-lime-800' : 'text-xs'}>+ $0.50</div>
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
          <div className={SpicyMayo ? 'font-bold text-xs text-lime-800' : 'text-xs'}>+ $0.50</div>
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
          <div className={EelSauce ? 'font-bold text-xs text-lime-800' : 'text-xs'}>+ $0.50</div>
        </div>
      </div>
    }
  }

  const favButtonHandler = (e) => {
    
    // login Validation
    if(!localStorage.userId || localStorage.userId === 'null' || localStorage.userId === null) {
      return 
    }
    
    let sendingData = {
      id: localStorage.userId,
      isFavorited: !isFavorited,
      product: props.product._id,
    }
    
    const requestToAPI = async () => {
      try {
        // Loading..
        const favorite = await axios.put('/api/account/modifyFavoriteItem', sendingData)
        if(favorite.data.success) {
          // loading off
          let favoritedItem = favorite.data.user.FavoriteItems.find((item) => item === sendingData.product)
          if(favoritedItem) {
            setIsFavorited(true)
          } else {
            setIsFavorited(false)
          }
        }
      } catch (error) {
        // Loading off
        toast.error('Error found when updating favorite. Please try again.')
      }
    }
  
    requestToAPI()
    
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
            <div className='border-b border-lime-800 flex items-center gap-4'>
              <p className='text-3xl font-bold uppercase tracking-wide text-lime-800 '>{props.product.name}</p>
              {isFavorited ? <button className='text-lime-800'><FaHeart className='w-6 h-7' onClick={(e) => favButtonHandler(e)} /></button> : <button className='text-lime-800 hover:text-lime-600' onClick={(e) => favButtonHandler(e)}><FaRegHeart className='w-6 h-7'/></button>}
            </div>
            {props.product.caption && <p className='text-lime-800'>{props.product.caption}</p>}
            <p className='text-slate-700'>{props.product.description}</p>
            {/* options */}
            {props.product.Sub_Category === 'Lunch Roll Combo' &&
              <div 
              className='grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-white/40 rounded-lg shadow-lg text-lime-800 text-sm mb-8'
              >
                {lunchRollSelections.map((menu, i) => {
                  return <div
                  key={i}
                  >
                    <p className='truncate'>• {menu}</p>
                  </div>
                })}
              </div>
            }
            {selectOptions(props.product.caption, props.product.name)}

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
                          className='text-sm text-slate-700 rounded-md border-none mb-6'
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>

            {/* buttons */}
            {disabledButton(props.product.caption, props.product.name)}
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
