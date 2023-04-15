import { useDispatch } from "react-redux"
import { qtyDecrease } from "../cartSlice"
import { MdOutlineRemove } from 'react-icons/md'

const RdxDecreaseQtyButton = ({item}) => {
  const dispatch = useDispatch()

  const qtyDecreaseButton = (item) => {
    dispatch(qtyDecrease(item))
  }

  return (
    <button
      className='p-1 border border-lime-800 rounded-md hover:border-lime-600'
      onClick={() => qtyDecreaseButton(item)}
    >
      <MdOutlineRemove />
    </button>
  )
}

export default RdxDecreaseQtyButton