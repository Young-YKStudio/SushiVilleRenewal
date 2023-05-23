import Landing from './landing/landing'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home(props) {

  const [ menu, setMenu ] = useState([])

  useEffect(() => {
    setMenu(props.menu)
  },[])
  
  return (
    <>
      <main>
        <Landing menu={menu} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
  return {
    props: {
      menu: request.data.menu
    }
  }
}