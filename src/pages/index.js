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
  let data

  const request = await axios.get(`${process.env.APP_URL}/api/menu/getAllMenu`)

  if(request.data.success) {
    data = request.data.menu
  }

  if(data) {
    return {props: {menu: data}}
  }
}