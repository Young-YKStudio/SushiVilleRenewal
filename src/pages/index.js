import Landing from './landing/landing'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home(props) {

  const [ menu, setMenu ] = useState([])

  console.log(props)
  // useEffect(() => {
  //   let isMounted = true

  //   const requestAPI = async () => {
  //     if(isMounted) {
  //       try {
  //         const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
  //         if(request.data.success) {
  //           setMenu(request.data.menu)
  //         }
  //       } catch (error) {
  //         console.error('error fetching data', error)
  //       }
  //     }
  //   }
  //   requestAPI()
  // }, [])

  return (
    <>
      <main>
        <Landing menu={menu} />
      </main>
    </>
  )
}

export async function getStatciProps() {
  const result = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
  const data = result.data
  return {
    props: {
      data: data
    }
  }
}