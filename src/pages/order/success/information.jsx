import Router from 'next/router'

const InfomationSection = ({order}) => {

  return (
    <section className="md:w-1/2 w-full mt-12 md:mt-0 flex flex-col items-center justify-center">
      <div className="bg-white/40 p-8 rounded-lg flex flex-col gap-4 text-lime-800">
        <p className="font-bold text-xl">Thank you, {order.customer.username}.</p>
        <p>Please allow us enough time to prepare delicious meal for you.</p>
        {order.isPaidAtRestaurant ?
          <div className="p-2">
            <p>Your order is <span className="font-bold text-red-700">not paid</span> yet. Please prepare to pay at pick up.</p>
            <p></p>
            <p>Your order is <span className="font-bold text-red-700">${order.grandTotal.toFixed(2)}</span> in total.</p>
          </div>
          :
          <div className="p-2">
            <p>Your order is fully paid, and <span className="font-bold text-lime-800">${order.grandTotal.toFixed(2)}</span> in total.</p>
          </div>
        }
        <p>Thank you for choosing <span className="font-bold">Sushiville</span>.</p>
        <button onClick={() => Router.push('/')} className="bg-lime-800 text-white py-2 rounded-md hover:bg-yellow-500">Home</button>
      </div>
    </section>
  );
}
export default InfomationSection;