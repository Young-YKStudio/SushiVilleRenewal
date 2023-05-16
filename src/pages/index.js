import Landing from './landing/landing'
import axios from 'axios'

export default function Home(props) {

  return (
    <>
      <main>
        <Landing menu={props.menu} />
      </main>
    </>
  )
}

export async function getServerSideProps() {

  const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)

  return {props: {menu: request.data.menu}}

}