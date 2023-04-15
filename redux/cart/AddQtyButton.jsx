import { useDispatch } from "react-redux";
import { qtyIncrease } from "../cartSlice";
import { MdOutlineAdd } from "react-icons/md";

const RdxQtyAddButton = ({item}) => {
  const dispatch = useDispatch()

  const qtyAddButton = (item) => {
    dispatch(qtyIncrease(item))
  }

  return (
    <button
    className='p-1 border border-lime-800 rounded-md hover:border-lime-600'
    onClick={() => qtyAddButton(item)}
    >
      <MdOutlineAdd />
    </button>
  )
}

export default RdxQtyAddButton