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
  try {
    // const result = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
    const result = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
    const data = await result.data.menu.json()
    return {
      props: {
        data: data
      }
    }
  } catch (error) {
    console.log(error, 'what??')
  }
}