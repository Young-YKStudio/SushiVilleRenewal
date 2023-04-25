import axios from 'axios'

const DashboardOrderView = (props) => {
  console.log(props, 'at order id page')
  return (  
    <p>page</p>
    // Back to list link
  );
}
export default DashboardOrderView

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