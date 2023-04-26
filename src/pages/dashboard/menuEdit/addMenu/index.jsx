import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../../redux/cartSlice';
import { useState } from 'react'
import { AppetiZerSub, ALaCartSub, KitchenEntreeSub, LunchSpSub, PartyPlatterSub, SpecialRollSub, SushiSashimiSub, CategoriesList } from '../../../../../data/menu';
import { Switch } from '@headlessui/react';
import ImageUpload from './addImage'
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddMenuDashboard = () => {

  const dispatch = useDispatch()
  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    caption: '',
    description: '',
    price: 0,
    category: '',
    Sub_Category: '',
    image: ''
  })
  const [ stock_availability, setStock ] = useState(false)
  const [ uploadedImage, setUploadedImage ] = useState(null)

  const { name, caption, description, price, category, Sub_Category } = submitForm

  const changeHandler = (e) => {
    e.preventDefault()
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const clearData = () => {
    setSubmitForm({
      name: '',
      caption: '',
      description: '',
      price: 0,
      category: '',
      Sub_Category: '',
      image: ''
    })
    setStock(false)
    setUploadedImage(null)
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    if(!name || !category || category === '' || name === '') {
      return toast.warn('Please fill required information')
    }

    if(price === 0 || price < 0) {
      return toast.warn('Price must be positive number only.')
    }

    let sendingData = {
      name: name,
      caption: caption,
      description: description,
      price: price,
      category: category,
      Sub_Category: Sub_Category,
      stock_availability: stock_availability,
      image: uploadedImage,
    }

    const reqeustToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.post('/api/menu/registerMenu', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Menu has been created')
          clearData()
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error at registering menu. Please contact support.')
      }
    }

    reqeustToAPI()
  }
  return (
    <section
      className="pl-20 py-8 pr-8 w-full"
    >
      <div className='pl-6 pb-4 border-b border-lime-800 mb-4 text-lime-800 font-bold text-3xl'>
        <p>New Menu</p>
      </div>
      <div className='text-lime-800 text-sm mb-4'>
        <h3 className='mb-1'>All menu items must have its category. Some of the categories require a Subcategory, and listed below for requirements.</h3>
        <p className='mb-4'>If there is any menu to be added for new category or new subcategory, please contact YK Studio for details.</p>
        <div className='mb-2 flex flex-col md:flex-row gap-4'>
          <ul className='grid grid-cols-2 p-4 bg-yellow-500/40 rounded-xl md:w-[23em]'>
            <p className='font-bold mb-2 col-span-2'>Categories Require Subs</p>
            <li>A La Carte</li>
            <li>Appetizer</li>
            <li>Kitchen Entree</li>
            <li>Lunch Special</li>
            <li>Party Platter</li>
            <li>Special Rolls</li>
            <li>Sushi & Sashimi</li>
          </ul>
          <ul className='grid grid-cols-2 p-4 bg-slate-300 rounded-xl md:w-[23em]'>
            <p className='font-bold mb-2 col-span-2'>Categories with no Subs</p>
            <li>Regular Roll</li>
            <li>Vegetable Roll</li>
            <li>Soup & Salad</li>
            <li>Extra</li>
            <li>Sauce</li>
            <li>Drink</li>
            <li>Bowl Rice</li>
          </ul>
        </div>
      </div>
      <form className='grid bg-lime-800/40 p-4 rounded-xl gap-4 max-w-[41.3em] md:grid-cols-2 md:gap-4 text-lime-800'
        onSubmit={SubmitHandler}
      >
        {/* name */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Name</p>
          <input type='text' value={name} name='name' onChange={changeHandler} className='w-full text-sm border-none rounded-md'/>
        </div>
        {/* caption */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Caption</p>
          <input type='text' value={caption} name='caption' onChange={changeHandler} className='w-full text-sm border-none rounded-md' />
        </div>
        {/* category */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Category</p>
          <select
            name='category'
            value={category}
            onChange={changeHandler}
            className='rounded-md w-full text-sm border-none'
          >
            <option value='' defaultValue='' disabled hidden>Choose Category</option>
            {CategoriesList && CategoriesList.map((list) => {
              return <option
                key={list.category}
                value={list.category}
              >
                {list.category}
              </option>
            })}
          </select>
        </div>
        {/* Sub_Category */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>SubCategory</p>
          <select
            name='Sub_Category'
            value={Sub_Category}
            onChange={changeHandler}
            className='rounded-md w-full text-sm border-none'
          >
            <option value='' defaultValue='' disabled hidden >Choose SubCategory</option>
            {category === '' && null}
            {category === 'A La Carte' && ALaCartSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Appetizer' && AppetiZerSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Kitchen Entree' && KitchenEntreeSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Special Rolls' && SpecialRollSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Sushi & Sashimi' && SushiSashimiSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Lunch Special' && LunchSpSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
            {category === 'Party Platter' && PartyPlatterSub.map((list) => {
              return <option
                key={list.Sub_Category}
                value={list.Sub_Category}
              >
                {list.Sub_Category}
              </option>
            })}
          </select>
        </div>
        {/* description */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Description</p>
          <textarea value={description} name='description' rows={5} onChange={changeHandler} className='rounded-md w-full text-sm border-none focus:ring-0' />
        </div>
        {/* price */}
        <div  className='flex flex-col flex-nowrap gap-4'>
          <div className='flex flex-col flex-nowrap gap-1'>
            <p className='text-xs text-white tracking-wider'>Price</p>
            <input type='number' value={price} name='price' onChange={changeHandler} className='rounded-md w-full text-sm border-none focus:ring-0'/>
          </div>
          <div className='flex flex-col flex-nowrap gap-1'>
            <p className='text-xs text-white tracking-wider'>Stock Availability</p>
            <div className='flex flex-row flex-nowrap gap-4 items-center py-2 justify-center'>
              <p className={stock_availability ? 'text-lime-800 text-xs' : 'text-white font-bold text-sm'}>Out of Stock</p>
              <Switch
                checked={stock_availability}
                onChange={setStock}
                className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

              >
                <span className="sr-only">Use setting</span>
                <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                <span
                  aria-hidden="true"
                  className={classNames(
                    stock_availability ? 'bg-lime-800' : 'bg-yellow-500',
                    'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                /> 
                <span
                  aria-hidden="true"
                  className={classNames(
                    stock_availability ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <p className={stock_availability ? 'text-white font-bold text-sm' : 'text-lime-700 text-xs'}>In Stock</p>
            </div>
          </div>
        </div>
        <div className='md:col-span-2 flex flex-row justify-start'>
          {/* image */}
          {uploadedImage !== '' ? <div
            className='flex flex-col items-center'
          >
            <p className='text-center w-full truncate'>{uploadedImage}</p>
            <p className='text-lime-800 hover:text-white hover:cursor-pointer' onClick={(e) => setUploadedImage('')}>Clear image</p>
            </div> :
          <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
          }
          {/* Button */}
        </div>
        <div className='md:col-span-2'>
          <button className='bg-lime-800 text-white w-full rounded-md px-4 py-3 hover:bg-yellow-500' type='submit'>Submit New Menu</button>
        </div>
      </form>
    </section>
  );
}
export default AddMenuDashboard;