import axios from 'axios'
import PayAtRestaurantSection from './payAtRestaurant'
import StripePaymentSection from './stripePayment'

const ConfirmationPage = (props) => {
  console.log(props)

  const sectionDistributor = () => {
    if(props.order.isisPaidAtRestaurant) {
      return <StripePaymentSection orderData={props} />
    } else {
      return <PayAtRestaurantSection orderData={props}/>
    }
  }
  return (
    <section>
      {sectionDistributor()}
    </section>
  );
}
export default ConfirmationPage;

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null
  let data2 = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/order/getOneOrder`, requestData)
  if(request.data.success) {
    data = request.data.order
    data2 = request.data.items
  }
  if(data) {
    return {props: {id: id, order: data, items: data2 }}
  }
}
