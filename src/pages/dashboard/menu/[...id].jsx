import axios from 'axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useState, useEffect } from 'react'
import { AppetiZerSub, ALaCartSub, KitchenEntreeSub, LunchSpSub, PartyPlatterSub, SpecialRollSub, SushiSashimiSub, CategoriesList } from '../../../../data/menu';
import { Switch } from '@headlessui/react';
import ImageUpload from '../menuEdit/addMenu/addImage'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ViewAndEditMenuDashboard = (props) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    caption: '',
    description: '',
    price: 0,
    category: '',
    Sub_Category: '',
  })
  const [ stock_availability, setStock ] = useState(false)
  const [ uploadedImage, setUploadedImage ] = useState(null)

  const { name, caption, description, price, category, Sub_Category } = submitForm

  useEffect(() => {
    let isMounted = true
    const setStates = () => {
      if(isMounted && props.menu) {
        setSubmitForm({
          name: props.menu.name,
          caption: props.menu.caption,
          description: props.menu.description,
          price: props.menu.price,
          category: props.menu.category,
          Sub_Category: props.menu.Sub_Category,
        })
        setStock(props.menu.stock_availability)
        setUploadedImage(props.menu.image ? props.menu.image : null)
      }
    }
    setStates()
    return () => {
      isMounted = false
    }
  },[props])

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[80vw] lg:max-w-[86vw] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[80vw] lg:max-w-[90vw] w-full'
    }
  }

  const changeHandler = (e) => {
    e.preventDefault()
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
      id: props.menu._id,
      name: name,
      caption: caption,
      description: description,
      price: price,
      category: category,
      Sub_Category: Sub_Category,
      stock_availability: stock_availability,
      image: uploadedImage,
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/menu/updateMenu', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Menu has been updated')
          Router.reload()
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when updating menu. Please contact support.')
      }
    }
    requestToAPI()
  }

  const deleteHandler = (e) => {
    e.preventDefault()

    let sendingData = {
      id: props.menu._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/menu/deleteMenu', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Menu has been deleted')
          setTimeout(() => {
            Router.push('/dashboard/menuEdit')
          }, 2000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error at deleting menu. Please contact support.')
      }
    }
    requestToAPI()
  }

  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Menu View / Edit</h1>
      </div>

      <div className='mt-8 text-lime-800'>
        <p><span className='font-bold'>{props.menu.name}</span> has been ordered <span className='font-bold'>{props.menu.ordered}</span> times.</p>
        {props.menu.image ? null : <p>Looks like <span className='font-bold'>{props.menu.name}</span> doesn't have an image. Please add an image.</p>}
      </div>

      <form className='grid bg-lime-800/40 p-4 rounded-xl gap-4 max-w-[41.3em] md:grid-cols-2 md:gap-4 text-lime-800 mt-8'
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
          <button className='bg-lime-800 text-white w-full rounded-md px-4 py-3 hover:bg-yellow-500' type='submit'>Update Menu</button>
          <button className='text-red-700 w-full px-4 py-3 hover:text-red-900' onClick={deleteHandler}>Delete Menu</button>
        </div>
      </form>
    </section>
  );
}
export default ViewAndEditMenuDashboard;

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
    return {props: {id: id, menu: data }}
  }
}