import { useDispatch } from "react-redux";
import { removeFromCart } from "../cartSlice";
import { MdDeleteOutline } from 'react-icons/md'

const RdxRemoveFromCartButton = ({item}) => {

  const dispatch = useDispatch()

  const RmButton = (item) => {
    dispatch(removeFromCart(item))
  }

  return (
    <button
      onClick={() => RmButton(item)}
      className='text-lime-800 hover:text-lime-600 flex items-center text-sm'
    >
      <MdDeleteOutline className="w-5 h-5 mr-1" /> Remove
    </button>
  )
}

export default RdxRemoveFromCartButton