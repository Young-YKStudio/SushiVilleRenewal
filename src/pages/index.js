import Landing from './landing/landing'
import axios from 'axios'

export default function Home(props) {

  console.log(props)

  return (
    <>
      <main>
        <Landing menu={props.menu} />
      </main>
    </>
  )
}

export async function getStaticProps() {

  try {
    let menu

    const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)
    menu = request.data.menu
    return {props: {menu: menu}}
  } catch (error) {
    console.error('Error at fetching data', error)
  }

}