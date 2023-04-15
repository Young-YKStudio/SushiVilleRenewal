import { useSelector } from "react-redux";
import NextLink from 'next/link'
import { MdShoppingCart } from "react-icons/md";
import RdxRemoveFromCartButton from "../../../redux/cart/RemoveCartButton";
import RdxQtyAddButton from "../../../redux/cart/AddQtyButton";
import RdxDecreaseQtyButton from "../../../redux/cart/DecreaseQtyButton";
import { useState, useEffect } from 'react'
import CartResetButton from "../../../redux/cart/CartResetButton";

const Cart = () => {

  const { cartItems } = useSelector((state) => state.cart)

  const [ subtotal, setSubTotal ] = useState(0)
  const [ shipping, setShipping ] = useState(5)
  const [ tax, setTax ] = useState(0)
  const [ orderTotal, setOrderTotal ] = useState(0)
  const [ addOnTotal, setAddOnTotal ] = useState(0)
  const [ onlineProcessing, setOnlineProcessing ] = useState(0)

  useEffect(() => {
    let isMounted = true

    // rewrite the logic
    if (isMounted) {
      const calcTotal = async () => {
        let arry = cartItems
        let total = 0
        await arry.forEach((item) => {
          let calNum = item.qty * item.product.price
          total += calNum
        })

        let taxRate = 8.875
        let TaxTotal = total * (taxRate/100)
        await setSubTotal(total)
        await setTax(TaxTotal)
      }

      const orderTotalSum = () => {
        let sum = subtotal + shipping + tax
        setOrderTotal(sum)
      }
      calcTotal()
      orderTotalSum()
    }
    return () => {
      isMounted = false
      console.log(cartItems)
    }
  }, [cartItems])

  const addOnDistributor = (addOn) => {
    if(addOn.brownRice || addOn.crunch || addOn.eelSauce || addOn.soyPaper || addOn.spicyMayo) {
      return <div className="text-xs flex flex-col">
        {addOn.brownRice && <div className="flex flex-row gap-2 ml-2">
            <p>Brown Rice</p>
            <p>$1.00</p>
          </div>
        }
        {addOn.soyPaper && <div className="flex flex-row gap-2 ml-2">
            <p>Soy Paper</p>
            <p>$1.00</p>
          </div>
        }
        {addOn.crunch && <div className="flex flex-row gap-2 ml-2">
            <p>Crunch Topping</p>
            <p>$0.50</p>
          </div>
        }
        {addOn.eelSauce && <div className="flex flex-row gap-2 ml-2">
            <p>Eel Sauce</p>
            <p>$0.50</p>
          </div>
        }
        {addOn.spicyMayo && <div className="flex flex-row gap-2 ml-2">
            <p>Spicy Mayo</p>
            <p>$0.50</p>
          </div>
        }
      </div>
    }
  }

  return (
    <section className="pt-20 flex flex-col px-8 text-lime-800 bg-yellow-500 min-h-[85vh]">
      <div className="py-8 border-b border-lime-800 mb-8">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Shopping Cart</p>
      </div>
      {/* items */}
      <div className="flex flex-col md:flex-row flex-nowrap md:mx-auto md:gap-8">
        <div className="py-2 w-full md:w-[25em]">
          {cartItems.length > 0 ?
            <div className="flex flex-col">
              {cartItems.map((item, i) => {
                return <div
                  key={i}
                  className='flex flex-row gap-4 text-sm py-4 border-b relative border-lime-800'
                >
                  {/* image */}
                  {item.product.image &&
                    <div 
                      style={{backgroundImage: `url("${item.product.image}")`}}
                      className='w-16 h-16 sm:w-20 sm:h-20 bg-center bg-cover rounded-md'
                    />
                  }
                  {/* description */}
                  <div>

                    <div>
                      <p className='uppercase tracking-wide font-bold'>{item.product.name}</p>
                      <p className="font-bold">${item.product.price}</p>
                    </div>

                    {/* addon */}
                    {addOnDistributor(item.addOns)}
                    {/* 1. Addons display */}
                    {/* 2. Addons total */}
                    {/* message */}
                    
                    <div className="flex items-center gap-2">
                      <p>Qty:</p>
                      <div className="flex items-center gap-1">
                        <div className='py-1 pr-3 text-lime-800 text-md font-bold'>{item.qty}</div>
                        <RdxDecreaseQtyButton item={item} />
                        <RdxQtyAddButton item={item} />

                      </div>
                    </div>


                  </div>
                  {/* close button */}
                  <div className="absolute top-4 right-2">
                    <RdxRemoveFromCartButton item={item} />
                  </div>
                </div>
              })}
            </div>
          :
            <div className="py-8">
              <p>Oops! No saved items in the cart</p>
              <NextLink 
                href='/products'
                className="flex items-center px-4 py-2 bg-lime-800 max-w-sm text-white rounded-md mt-8 justify-center truncate hover:bg-lime-600"
              >
                <MdShoppingCart className="w-5 h-5 mr-2"/>Go to Shopping
              </NextLink>
            </div>
          }
        </div>
        {/* summary */}
        {cartItems.length > 0 &&
          <div className="w-full sm:mx-auto md:w-[20em] lg:mx-0 md:my-4 lg:w-[25em] bg-indigo-50 rounded-md p-8 flex flex-col text-sm">
            <p className="text-lg py-2">Order summary</p>
            <div className="flex items-center justify-between py-3 border-b border-indigo-200">
              <p className="text-indigo-400">Subtotal</p>
              <p className="font-bold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-indigo-200">
              <p className="text-indigo-400">Shipping estimate</p>
              <p className="font-bold">${shipping.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-indigo-200">
              <p className="text-indigo-400">Tax estimate</p>
              <p className="font-bold">${tax.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-lg">Order total</p>
              <p className="font-bold">${orderTotal.toFixed(2)}</p>
            </div>
            <CartResetButton text='Checkout' />
          </div>
        }
      </div>
    </section>
  );
}
export default Cart;