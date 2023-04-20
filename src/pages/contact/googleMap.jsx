import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { RestaurntData } from '../../../data/Restaurant'
import { useState } from 'react'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px'
}

const GoogleMapSection = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.APP_GOOGLE_APPKEY,
  })

  const [ showInfoWindow, setShowInfoWindow ] = useState(true)

  if(loadError) return 'Error at loading Google map'
  if(!isLoaded) return 'Loading Google map...'

  return (
    <section
      className='w-full h-96 md:h-[75vh] md:w-[40em] px-8 md:my-8'
    >
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={{ lat: RestaurntData.lat, lng: RestaurntData.lng }}
      >
        <MarkerF 
          position={{ lat: RestaurntData.lat, lng: RestaurntData.lng }}
          onClick={() => setShowInfoWindow(true)}
        >
          {showInfoWindow &&
            <InfoWindowF
              position={{ lat: RestaurntData.lat +0.0005, lng: RestaurntData.lng }}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className='text-lime-800'>
                <p className='font-bold tracking-wider text-lg mb-1'>{RestaurntData.name}</p>
                <p className='text-slate-800'>{RestaurntData.address1}</p>
                <p className='text-slate-800 mb-1'>{RestaurntData.address2}</p>
                <a 
                  target='_blank' 
                  rel='noreferrer'
                  className='hover:cursor-pointer text-lime-800 hover:text-lime-500' 
                  href="https://www.google.com/maps/place/Sushiville/@41.155677,-74.193748,16z/data=!4m8!1m2!3m1!2sSushiville!3m4!1s0x89c2dfc1c127b3e3:0x4735a45026923a62!8m2!3d41.1556049!4d-74.1935692"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindowF>
          }

        </MarkerF>
      </GoogleMap>
    </section>
  );
}
export default GoogleMapSection;