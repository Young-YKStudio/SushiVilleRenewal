import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToCart } from '../cartSlice'
import { toast } from 'react-toastify'

const RdxAddToCartSupplementButton = ({item}) => {

  const dispatch = useDispatch()

  const ATCbutton = (item) => {

    const addonData = {
      brownRice: false,
      soyPaper: false,
      crunch: false,
      spicyMayo: false,
      eelSauce: false,
      message: '',
      tunaOrSalmon: null,
      spicyOrSweet: null,
      porkOrVeg: null,
      spicyTunaOrCali: null,
      salGoneWildRainbow: null,
      lunchPicks: {
        roll1: '',
        roll2: '',
        roll3: '',
      },
    }
    
    const productObj = {
      qty: 1,
      product: item,
      addOns: addonData
    }

    dispatch(addToCart(productObj))
    toast.success(`${productObj.product.name} has been added.`)
  }

  return (
    <button
      onClick={() => ATCbutton(item)}
      className="px-4 py-2 bg-lime-800 rounded-md text-white hover:bg-lime-600 flex items-center justify-center truncate"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Add to cart
    </button>
  );
}
export default RdxAddToCartSupplementButton;