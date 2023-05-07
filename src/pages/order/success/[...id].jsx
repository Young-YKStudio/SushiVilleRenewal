import axios from 'axios'
import GreetingSection from './greeting';
import InfomationSection from './information';

const SuccessPage = (props) => {

  return (
    <div className='flex justify-center bg-yellow-500'>
      <section className="pt-20 w-full min-h-[85vh] max-w-[1280px] flex flex-col justify-center md:flex-row px-4 md:px-0">
        <GreetingSection />
        <InfomationSection order={props.order} />
      </section>
    </div>
  );
}
export default SuccessPage;

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
