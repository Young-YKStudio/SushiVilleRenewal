import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToCart } from '../cartSlice'

const RdxAddToCartButton = ({item, qty, addOn}) => {

  const dispatch = useDispatch()

  const ATCbutton = (item, qty) => {
    
    const productObj = {
      qty: qty,
      product: item,
      addOns: addOn
    }

    dispatch(addToCart(productObj))
    // console.log(productObj, 'at ATC button')
  }

  return (
    <button
      onClick={() => ATCbutton(item, qty)}
      className="px-4 py-2 bg-lime-800 rounded-md text-white hover:bg-lime-600 flex items-center justify-center truncate"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Add to cart
    </button>
  );
}
export default RdxAddToCartButton;