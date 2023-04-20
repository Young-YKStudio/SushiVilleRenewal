import axios from 'axios'

const SuccessPage = (props) => {

  console.log(props, 'at success page')
  return (
    <p>Success!</p>
  );
}
export default SuccessPage;

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
    return {props: {id: id, reservation: data }}
  }
}
