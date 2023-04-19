import { GiCook } from 'react-icons/gi'
import NextLink from 'next/link'

const PayAtRestaurantSection = ({orderData}) => {

  console.log(orderData, 'at PAR section')
  return (
    <section
      className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]"
    >
      <div className="py-8 border-b border-lime-800 mb-8">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Order Confirmation</p>
      </div>

      <div className='max-w-3xl mb-8'>
        <p className='text-3xl mb-2'>Thank you for placing your order.</p>
        <p className='flex items-center text-lg truncate'>Please confirm your order before we start cooking! <GiCook /></p>
      </div>

      {/* Paper */}
      <div className="bg-white/70 rounded-md shadow-md p-8 max-w-3xl">
        {/* Order Information - TOP */}
        <div>
          <div className="flex items-center justify-between text-normal mb-2">
            <p>Order Number: <span className="font-bold ml-2">{orderData.order.orderCount}</span></p>
            <p className="text-red-700">Pay at pickup</p>
          </div>
          <div className="flex flex-row items-center text-sm gap-2 border-b border-lime-800 pb-3 mb-4">
            <p className=''>{orderData.order.customer.username}</p>
            <p className="truncate">{orderData.order.customer.email}</p>
            <p>{orderData.order.customer.contact}</p>
          </div>
        </div>
        {/* ordered items - LEFT */}
        <div className='text-sm'>
          {orderData.items.map((item, index) => {
            return <div
              key={index}
              className='pb-4'
            >
              <div
                className='flex flex-row items-center gap-4'
              >
                <NextLink 
                  href={`/products/${item.product[0]._id}`}
                  className='hover:text-lime-600 font-bold'
                >
                  {item.product[0].name}
                </NextLink>
                <p>x {item.qty} </p>
                <p className='font-bold'>
                  ${item.product[0].price}
                </p>
              </div>
              {/* options */}
              {/* BrownRice */}
              {item.addOns.brownRice && 
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Brown Rice:</p>
                  <p>$ 1.00</p>
                </div>
              }
              {/* Crunch */}
              {item.addOns.crunch && 
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Crunch:</p>
                  <p>$ 0.50</p>
                </div>
              }
              {/* eelSauce */}
              {item.addOns.eelSauce && 
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Eel Sauce:</p>
                  <p>$ 0.50</p>
                </div>
              }
              {/* SoyPaper */}
              {item.addOns.soyPaper && 
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Soy Paper:</p>
                  <p>$ 1.00</p>
                </div>
              }
              {/* spicymayo */}
              {item.addOns.spicyMayo && 
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Spicy Mayo:</p>
                  <p>$ 0.50</p>
                </div>
              }

              {/* lunch Options */}
              {item.product[0].name === 'Pick 2 Rolls Lunch' && 
                <div>
                  <div>
                    <p className='flex flex-row text-xs gap-2 ml-2'>Roll1:</p>
                    <p>{item.addOns.lunchPicks.roll1}</p>
                  </div>
                  <div className='flex flex-row text-xs gap-2 ml-2'>
                    <p>Roll2:</p>
                    <p>{item.addOns.lunchPicks.roll2}</p>
                  </div>
                </div>
              }
              {item.product[0].name === 'Pick 3 Rolls Lunch' && 
                <div>
                  <div className='flex flex-row text-xs gap-2 ml-2'>
                    <p>Roll1:</p>
                    <p>{item.addOns.lunchPicks.roll1}</p>
                  </div>
                  <div className='flex flex-row text-xs gap-2 ml-2'>
                    <p>Roll2:</p>
                    <p>{item.addOns.lunchPicks.roll2}</p>
                  </div>
                  <div className='flex flex-row text-xs gap-2 ml-2'>
                    <p>Roll3:</p>
                    <p>{item.addOns.lunchPicks.roll3}</p>
                  </div>
                </div>
              }

              {/* message */}
              {item.addOns.message &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Special Instructions:</p>
                  <p>{item.addOns.message}</p>
                </div>
              }

              {/* porkOrVeg */}
              {item.addOns.porkOrVeg &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Selection:</p>
                  <p>{item.addOns.porkOrVeg}</p>
                </div>
              }

              {/* TODO: check below */}
              {/* salgonewildRain */}
              {item.addOns.salGoneWildRainbow &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Selection:</p>
                  <p>{item.addOns.salGoneWildRainbow}</p>
                </div>
              }

              {/* spicysweet */}
              {item.addOns.spicyOrSweet &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Selection:</p>
                  <p>{item.addOns.spicyOrSweet}</p>
                </div>
              }

              {/* sptunaCali */}
              {item.addOns.spicyTunaOrCali &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Selection:</p>
                  <p>{item.addOns.spicyTunaOrCali}</p>
                </div>
              }

              {/* tunaSal */}
              {item.addOns.tunaOrSalmon &&
                <div className='flex flex-row text-xs gap-2 ml-2'>
                  <p>Selection:</p>
                  <p>{item.addOns.tunaOrSalmon}</p>
                </div>
              }
            </div>
          })}
          {/* Price Calculation */}
          {/* Confirmation Buttons with confirm and go back */}
        </div>
      </div>
    </section>
  );
}
export default PayAtRestaurantSection;