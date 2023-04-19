import axios from 'axios'
import { useState, useEffect } from 'react'

const ConfirmationPage = (props) => {
  console.log(props)
  return (
    <p>Confirmation page</p>
  );
}
export default ConfirmationPage;

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/order/getOneOrder`, requestData)
  if(request.data.success) {
    data = request.data.order
  }
  if(data) {
    return {props: {id: id, order: data}}
  }
}
