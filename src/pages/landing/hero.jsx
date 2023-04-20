import { RiTakeawayFill, RiCalendarEventFill } from 'react-icons/ri'
import Router from 'next/router'

const HeroSection = () => {

  const orderButtonHandler = (e) => {
    e.preventDefault()
    Router.push('/products')
  }

  const reservationButtonHandler = (e) => {
    e.preventDefault()
    Router.push('/reservation')
  }
  return (
    <section
      style={{backgroundImage: 'url("https://ucarecdn.com/1a2d272c-aa77-4b63-b6f1-47c678171193/")'}}
      className="w-full h-[90vh] bg-center bg-cover bg-blend-multiply bg-slate/30 flex flex-row items-end justify-between p-12"
    >
      <div className='flex flex-col gap-4 md:gap-0 md:flex-row w-full'>
        <div className='w-full md:w-2/3'>
          <h1 className="font-bold text-white text-7xl tracking-tighter mb-4">Authentic<br/>
    Japanese Cuisine</h1>
          <p className="font-bold text-yellow-500 tracking-tight text-3xl">Freshness Served Daily.</p>
        </div>
        <div className='flex flex-col md:justify-end md:w-1/2'>
          <div className='flex flex-row gap-4 md:justify-end'>
            <button className="px-4 py-2 bg-lime-800 rounded-md text-white hover:bg-lime-600 flex items-center truncate" onClick={orderButtonHandler}><RiTakeawayFill className='w-5 h-5 mr-2' />Order Takeout</button>
            <button className='px-4 py-2 bg-lime-800 rounded-md text-white hover:bg-lime-600 flex items-center truncate' onClick={reservationButtonHandler}><RiCalendarEventFill className='w-5 h-5 mr-2'/>Make Reservation</button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;