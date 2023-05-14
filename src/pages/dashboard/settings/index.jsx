import axios from 'axios'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { useDispatch } from 'react-redux';
import { setIsStoreOpen, setIsStoreClosed, setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';
import { Switch } from '@headlessui/react';
import { toast } from 'react-toastify';
import { MdAdd, MdDelete } from 'react-icons/md'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardSettings = () => {
  const { isVerticalMenuNarrow, isStoreOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [ loadUseEffect, setLoadUseEffect ] = useState(false)
  const [ isStoreAuto, setIsStoreAuto ] = useState(false)
  const [ submitAutoManual, setSubmitAutoManual ] = useState(false)
  const [ submitOpenClose, setSubmitOpenClose ] = useState(false)
  const [ storeStatus, setStoreStatus ] = useState(false)
  const [ timeForm, setTimeForm ] = useState({
    monOpen: '',
    monClose: '',
    tueOpen: '',
    tueClose: '',
    wedOpen: '',
    wedClose: '',
    thuOpen: '',
    thuClose: '',
    friOpen: '',
    friClose: '',
    satOpen: '',
    satClose: '',
    sunOpen: '',
    sunClose: '',
  })

  const [ monStore, setMonStore ] = useState(true)
  const [ tueStore, setTueStore ] = useState(true)
  const [ wedStore, setWedStore ] = useState(true)
  const [ thuStore, setThuStore ] = useState(true)
  const [ friStore, setFriStore ] = useState(true)
  const [ satStore, setSatStore ] = useState(true)
  const [ sunStore, setSunStore ] = useState(true)
  const [ holidays, setHolidays ] = useState([])
  const [ submitOffDay, setSubmitOffDay ] = useState('')

  const { monOpen, monClose, tueOpen, tueClose, wedOpen, wedClose, thuOpen, thuClose, friOpen, friClose, satOpen, satClose, sunOpen, sunClose } = timeForm

  const timeChangeHandler = (e) => {
    setTimeForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    let isMounted = true
    const getStatus = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.get('/api/storeStatus/getStoreStatus')
        if(request.data.success) {
          dispatch(setLoadingOff())
          if(request.data.store.isOpenStoreAuto) {
            setIsStoreAuto(true)
            setSubmitAutoManual(true)
          } else { 
            setIsStoreAuto(false) 
            setSubmitAutoManual(false)
          }
          if(request.data.store.isStoreOpen) {
            setStoreStatus(true)
            setSubmitOpenClose(true)
          }
          if(!request.data.store.isStoreOpen) {
            setStoreStatus(false)
            setSubmitOpenClose(false)
          }
          if(request.data.store.storeHours) {
            if(request.data.store.storeHours.monOpen === 'closed') {
              setMonStore(false)
            }
            if(request.data.store.storeHours.tueOpen === 'closed') {
              setTueStore(false)
            }
            if(request.data.store.storeHours.wedOpen === 'closed') {
              setWedStore(false)
            }
            if(request.data.store.storeHours.thuOpen === 'closed') {
              setThuStore(false)
            }
            if(request.data.store.storeHours.friOpen === 'closed') {
              setFriStore(false)
            }
            if(request.data.store.storeHours.satOpen === 'closed') {
              setSatStore(false)
            }
            if(request.data.store.storeHours.sunOpen === 'closed') {
              setSunStore(false)
            }
            setTimeForm({
              monOpen: request.data.store.storeHours.monOpen !== 'closed' ? request.data.store.storeHours.monOpen : '',
              monClose: request.data.store.storeHours.monClose !== 'closed' ? request.data.store.storeHours.monClose : '',
              tueOpen: request.data.store.storeHours.tueOpen !== 'closed' ? request.data.store.storeHours.tueOpen : '',
              tueClose: request.data.store.storeHours.tueClose !== 'closed' ? request.data.store.storeHours.tueClose : '',
              wedOpen: request.data.store.storeHours.wedOpen !== 'closed' ? request.data.store.storeHours.wedOpen : '',
              wedClose: request.data.store.storeHours.wedClose !== 'closed' ? request.data.store.storeHours.wedClose : '',
              thuOpen: request.data.store.storeHours.thuOpen !== 'closed' ? request.data.store.storeHours.thuOpen : '',
              thuClose: request.data.store.storeHours.thuClose !== 'closed' ? request.data.store.storeHours.thuClose : '',
              friOpen: request.data.store.storeHours.friOpen !== 'closed' ? request.data.store.storeHours.friOpen : '',
              friClose: request.data.store.storeHours.friClose !== 'closed' ? request.data.store.storeHours.friClose : '',
              satOpen: request.data.store.storeHours.satOpen !== 'closed' ? request.data.store.storeHours.satOpen : '',
              satClose: request.data.store.storeHours.satClose !== 'closed' ? request.data.store.storeHours.satClose : '',
              sunOpen: request.data.store.storeHours.sunOpen !== 'closed' ? request.data.store.storeHours.sunOpen : '',
              sunClose: request.data.store.storeHours.sunClose !== 'closed' ? request.data.store.storeHours.sunClose : '',
            })
          }
          if(request.data.store.offDays.length > 0) {
            setHolidays(request.data.store.offDays)
          }
          if(request.data.store.offDays.length === 0) {
            setHolidays([])
          }
        }
      } catch (error) {
        dispatch(setLoadingOff())
      }
    }
    getStatus()
    return () => {
      isMounted = false
    }
  },[loadUseEffect, isStoreOpen])

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
    }
  }

  const StoreOffDate = () => {
    if(!submitOffDay || submitOffDay === '') {
      return toast.warn('Please enter date.')
    }

    if(holidays.length > 1) {
      let duplicate = holidays.find(date => date === submitOffDay) 
      if(duplicate) {
        return toast.warn('Entered date already exist.')
      }
    }

    let submitData = {
      date: submitOffDay
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/storeStatus/updateStoreOffDate', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Store off date has been added.')
          setLoadUseEffect(!loadUseEffect)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found updating store off date. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  const deleteOffDate = async (e, string) => {
    let submitData = {
      date: string
    }

    try {
      dispatch(setLoadingOn())
      let request = await axios.put('/api/storeStatus/deleteOffDate', submitData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success('Off date has been deleted')
        setLoadUseEffect(!loadUseEffect)
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error('Error found updating dates. Please contact support or try again later.')
    }
  }

  const storeOpenCloseText = (storeStatus, storeAuto) => {
    if(storeStatus && storeAuto) {
      return <p className='text-lg font-bold'>{'Open (Auto)'}</p>
    }
    if(storeStatus && !storeAuto) {
      return <p className='text-lg font-bold'>{'Open (Manual)'}</p>
    }
    if(!storeStatus && storeAuto) {
      return <p className='text-lg font-bold text-red-700'>{'Closed (Auto)'}</p>
    }
    if(!storeStatus && !storeAuto) {
      return <p className='text-lg font-bold text-red-700'>{'Closed (Manual)'}</p>
    }
  }

  const storeAutoManualHandler = (e) => {
    if(isStoreAuto === submitAutoManual) {
      return
    }

    let submitData = {
      status: submitAutoManual
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/storeStatus/updateStoreOpenClose', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Store has been updated')
          setLoadUseEffect(!loadUseEffect)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when updating store. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  const storeOpenCloseHandler = (e) => {
    if(isStoreAuto) {
      return
    }

    let submitData = {
      status: submitOpenClose
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/storeStatus/updateStoreOpenClose2', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Store has been updated')
          setLoadUseEffect(!loadUseEffect)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when updating store. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  const clearHours = () => {
    setTimeForm({
      monOpen: '',
      monClose: '',
      tueOpen: '',
      tueClose: '',
      wedOpen: '',
      wedClose: '',
      thuOpen: '',
      thuClose: '',
      friOpen: '',
      friClose: '',
      satOpen: '',
      satClose: '',
      sunOpen: '',
      sunClose: '',
    })
  }

  const updateHoursHandler = async (e) => {
    e.preventDefault()
    
    if(monStore && monOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(monStore && monClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(tueStore && tueOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(tueStore && tueClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(wedStore && wedOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(wedStore && wedClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(thuStore && thuOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(thuStore && thuClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(friStore && friOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(friStore && friClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(satStore && satOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(satStore && satClose === '') {
      return toast.warn('Please fill all fields')
    }
    if(satStore && satOpen === '') {
      return toast.warn('Please fill all fields')
    }
    if(satStore && satClose === '') {
      return toast.warn('Please fill all fields')
    }

    
    let submitData = {
      monOpen: monStore ? monOpen : 'closed',
      monClose: monStore ? monClose : 'closed',
      tueOpen: tueStore ? tueOpen : 'closed',
      tueClose: tueStore ? tueClose : 'closed',
      wedOpen: wedStore ? wedOpen : 'closed',
      wedClose: wedStore ? wedClose : 'closed',
      thuOpen: thuStore ? thuOpen : 'closed',
      thuClose: thuStore ? thuClose : 'closed',
      friOpen: friStore ? friOpen : 'closed',
      friClose: friStore ? friClose : 'closed',
      satOpen: satStore ? satOpen : 'closed',
      satClose: satStore ? satClose : 'closed',
      sunOpen: sunStore ? sunOpen : 'closed',
      sunClose: sunStore ? sunClose : 'closed',
    }
    
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/storeStatus/updateStoreHours', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Store hour has been updated')
          setLoadUseEffect(!loadUseEffect)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when updating store hour. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }


  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Store Settings</h1>
      </div>

      <div className='grid bg-lime-800/40 p-8 rounded-xl gap-4 max-w-[41.3em] min-w-[600px] md:gap-4 text-lime-800 mt-8'>
        <div className='mb-4'>
          <p className='font-bold text-3xl'>Store open / close</p>
        </div>

        <div className='grid grid-cols-3'>
          <div className='flex items-center'>
            <p className='text-xs col-span-1'>Current Store Setting:</p>
          </div>
          <div className='flex items-center justify-start'>
            {storeOpenCloseText(storeStatus, isStoreAuto)}
          </div>
        </div>

        <div className='text-red-700 bg-white/40 p-4 rounded-md my-2'>
          <p>Make sure to open/close store if the setting is set to manual.</p>
          <p>If manually opened, store hours will not be affected.</p>
        </div>

        <div className='grid grid-cols-3'>
          <div className='text-xs flex items-center'>
            <p>Store Auto/Manual:</p>
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <Switch
              checked={submitAutoManual}
              onChange={setSubmitAutoManual}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
            >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  submitAutoManual ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  submitAutoManual ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            <div className='font-bold'>
              {submitAutoManual ? <p>Auto</p> : <p>Manual</p>}
            </div>
          </div>
          <div>
            {isStoreAuto === submitAutoManual ? 
              <button 
                className='px-4 py-2 text-limt-800 border border-lime-800 rounded-md'
                disabled
              >
                Update Manual / Auto
              </button>
              :
              <button 
                className='px-4 py-2 bg-lime-800 border border-lime-800 text-white rounded-md hover:bg-yellow-500 hover:border-yellow-500'
                onClick={storeAutoManualHandler}
              >
                Update Manual / Auto
              </button>
            }
          </div>
        </div>

        <div className='grid grid-cols-3'>
          <div className='flex items-center'>
            <p className='text-xs col-span-1'>Open/Close:</p>
          </div>
          {isStoreAuto ? 
            <p className='font-bold col-span-2 flex justify-start'>Current Setting is on Auto.</p> 
          :
          <div className='grid grid-cols-2 col-span-2'>
            <div className='flex flex-row gap-4 items-center'>
              <Switch
                checked={submitOpenClose}
                onChange={setSubmitOpenClose}
                className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              >
                <span className="sr-only">Use setting</span>
                <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                <span
                  aria-hidden="true"
                  className={classNames(
                    submitOpenClose ? 'bg-yellow-500' : 'bg-lime-800',
                    'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                    )}
                    /> 
                <span
                  aria-hidden="true"
                  className={classNames(
                    submitOpenClose ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                    )}
                    />
              </Switch>
              <div className='font-bold'>
                {submitOpenClose ? <p>Open</p> : <p>Close</p>}
              </div>
            </div>
            <div>
              {isStoreAuto ? 
                  null
                :
                <button 
                  className='px-4 py-2 bg-lime-800 border border-lime-800 text-white rounded-md hover:bg-yellow-500 hover:border-yellow-500'
                  onClick={storeOpenCloseHandler}
                >
                  Update Manual / Auto
                </button>
              }
            </div>
          </div>
          }
        </div>
      </div>

      <form 
        className='grid bg-lime-800/40 p-8 rounded-xl gap-4 max-w-[41.3em] min-w-[600px] md:gap-4 text-lime-800 mt-8'
        onSubmit={updateHoursHandler}
      >
        <div className='mb-4'>
          <p className='font-bold text-3xl'>Store Hours</p>
        </div>
        <div className='grid grid-cols-4 border-b border-lime-800 pb-2 gap-4 text-sm'>
          <p className='text-center'>Date</p>
          <p className='text-center'>Opening Time</p>
          <p className='text-center'>Closing Time</p>
          <p className='text-center'>Close / Open</p>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Monday:</p>
          </div>
          {monStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='monOpen' value={monOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='monClose' value={monClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={monStore}
              onChange={setMonStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  monStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  monStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {monStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Tuesday:</p>
          </div>
          {tueStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='tueOpen' value={tueOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='tueClose' value={tueClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={tueStore}
              onChange={setTueStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  tueStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  tueStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {tueStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Wendesday:</p>
          </div>
          {wedStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='wedOpen' value={wedOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='wedClose' value={wedClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={wedStore}
              onChange={setWedStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  wedStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  wedStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {wedStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Thursday:</p>
          </div>
          {thuStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='thuOpen' value={thuOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='thuClose' value={thuClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={thuStore}
              onChange={setThuStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  thuStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  thuStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {thuStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Friday:</p>
          </div>
          {friStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='friOpen' value={friOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='friClose' value={friClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={friStore}
              onChange={setFriStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  friStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  friStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {friStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Saturday:</p>
          </div>
          {satStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='satOpen' value={satOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='satClose' value={satClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={satStore}
              onChange={setSatStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  satStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  satStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {satStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 content-center gap-4'>
          <div className='flex items-center justify-end pr-4'>
            <p>Sunday:</p>
          </div>
          {sunStore ? 
            <div className='col-span-2 gap-4 grid grid-cols-2'>
              <input type='time' name='sunOpen' value={sunOpen} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
              <input type='time' name='sunClose' value={sunClose} onChange={timeChangeHandler} className='border-none rounded-md focus:ring-0' />
            </div>
            :
            <div className='col-span-2 flex py-1 justify-center' >
              <p className='font-light'>Store Closed</p>
            </div>
          }
          <div className='flex flex-row items-center gap-4 justify-center'>
            <Switch
              checked={sunStore}
              onChange={setSunStore}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"
              
              >
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
              <span
                aria-hidden="true"
                className={classNames(
                  sunStore ? 'bg-yellow-500' : 'bg-lime-800',
                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                  )}
                  /> 
              <span
                aria-hidden="true"
                className={classNames(
                  sunStore ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                  )}
                  />
            </Switch>
            {sunStore ? <p>Open</p> : <p>Close</p>}
          </div>
        </div>

        <div className='flex justify-center my-4 gap-4'>
          <button type='submit' className='rounded-md px-8 py-2 bg-lime-800 text-white hover:bg-yellow-500'>Update Hours</button>
          <button onClick={clearHours} className='px-8  py-2 hover:text-white'>clear hours</button>
        </div>
      </form>

      <div className='grid bg-lime-800/40 p-8 rounded-xl gap-4 max-w-[41.3em] min-w-[600px] md:gap-4 text-lime-800 mt-8'>
        <div className='mb-4'>
          <p className='font-bold text-3xl'>Closing Dates</p>
        </div>
        <div className='flex px-4'>
          <input 
            type='date' 
            className='w-1/2 border-none rounded-l-lg' 
            value={submitOffDay}
            onChange={(e) => setSubmitOffDay(e.target.value)}
          />
          <button 
            className='p-2 rounded-r-lg flex items-center bg-lime-800 text-white hover:bg-yellow-500'
            onClick={StoreOffDate}
          >
            <MdAdd className='w-6 h-6'/>
          </button>
        </div>
        <div className='border-b py-2 border-lime-800'>
          <p>Closing Dates</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {holidays.length > 0 ? holidays.map((day, i) => {
            return <div
              key={i}
              className='pl-4'
            >
              <div className='flex flex-row items-center gap-4'>
                <p 
                  className='hover:text-yellow-500 hover:cursor-pointer'
                  onClick={(e) => deleteOffDate(e, day)}
                >
                  <MdDelete className='w-5 h-5'/>
                </p>
                <p>{moment(day).tz('America/New_York').format('LL')}</p>
              </div>
            </div>
          }) : <p>No dates added </p>}
        </div>
      </div>
    </section>
  );
}
export default DashboardSettings;

// if auto,
// chekck time -> determine store open/close
// if manual 
// get server status => determine store open/close
// 