import Landing from './landing/landing'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {

  const [ menu, setMenu ] = useState([])

  useEffect(() => {
    let isMounted = true

    const requestAPI = async () => {
      if(isMounted) {
        try {
          const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
          if(request.data.success) {
            setMenu(request.data.menu)
          }
        } catch (error) {
          console.error('error fetching data', error)
        }
      }
    }
    requestAPI()
  }, [])

  return (
    <>
      <main>
        <Landing menu={menu} />
      </main>
    </>
  )
}