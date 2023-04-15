import { useRouter } from 'next/router'
import RdxAddToCartButton from "../../../redux/cart/AddCartButton";

const ProductCards = ({item, id}) => {

  const router = useRouter()

  const navigateTo = (id) => {
    router.push(`/products/${id}`)
  }
  
  return (
    <>
      {item.image ? 
        <section 
          key={id}
          style={{backgroundImage: `url("${item.image}")`}} 
          className='w-full h-full flex flex-col justify-end text-indigo-900 hover:bg-black/40 bg-blend-multiply hover:cursor-pointer rounded-md bg-center bg-cover'
          onClick={() => navigateTo(item._id)}
        >
          <div className="bg-black/40 text-white rounded-b-lg p-4 flex flex-col gap-1">
            <h3 className="text-sm uppercase font-bold">{item.name} {item.caption && <span className='text-xs lowercase'>{`(${item.caption})`}</span>}</h3>
            <p className='text-xs tracking-wide'>{item.description}</p>
            <p className='text-sm font-bold'>$ {item.price}</p>
          </div>
        </section>
      :
        <section 
          key={id}
          className='w-full h-full flex flex-col justify-center text-indigo-900 hover:bg-black/40 bg-black/30 bg-blend-multiply hover:cursor-pointer rounded-md bg-center bg-cover'
          onClick={() => navigateTo(item._id)}
        >
          <div className="text-white rounded-b-lg p-4 flex flex-col gap-1">
            <h3 className="text-sm uppercase font-bold">{item.name} {item.caption && <span className='text-xs lowercase'>{`(${item.caption})`}</span>}</h3>
            <p className='text-xs tracking-wide'>{item.description}</p>
            <p className='text-sm font-bold'>$ {item.price.toFixed(2)}</p>
          </div>
        </section>
        
      }
    </>
  );
}

export default ProductCards;