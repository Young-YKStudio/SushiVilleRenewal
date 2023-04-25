import axios from 'axios'

const DashboardReservationView = (props) => {
  console.log(props, 'at order id page')
  return (  
    <p>page</p>
    // Back to list link
  );
}
export default DashboardReservationView

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/reservation/getOneReservation`, requestData)
  if(request.data.success) {
    data = request.data.reservation
  }
  if(data) {
    return {props: {id: id, reservations: data }}
  }
}