import GoogleMapSection from "./map";
import { RestaurntData } from "../../../data/Restaurant";
import NextLink from 'next/link'

const PublicFooter = () => {
  return (
    <footer
      className="bg-lime-800 text-white px-8 py-4"
    >
      <div className="flex flex-col md:flex-row py-8 md:gap-8 md:justify-center">
        {/* TOP */}
        <div className="flex flex-col gap-8 mb-8 md:mb-0 pl-8 md:px-0">
          {/* Hours */}
          <div className="grid grid-cols-6 gap-4">
            {/* left */}
            <div className="uppercase tracking-widest font-bold flex justify-end md:col-span-2">
              <p>Hours</p>
            </div>
            {/* right */}
            <div
              className="text-sm col-span-5 md:col-span-4"
            >
              <p>12pm ~ 9pm</p>
              <p>12pm ~ 9:30pm on Friday and Saturday</p>
              <p>Closed at Tuesday.</p>
            </div>
          </div>
          {/* Google Map & contact */}
            {/* top */}
            <div className="grid grid-cols-6 gap-4">
              {/* left */}
              <div className="uppercase tracking-wide font-bold flex justify-end md:col-span-2">
                <p>Contact</p>
              </div>
              {/* right */}
              <div className="text-xs col-span-5 md:col-span-4 leading-5">
                <p>{RestaurntData.address1}</p>
                <p>{RestaurntData.address2}</p>
                <p>{RestaurntData.contact}</p>
                <a href='mailto: info@sushivilleny.com' className="hover:text-yellow-500">{RestaurntData.email}</a>
              </div>
            </div>
          {/* Social */}
          {/* Legal */}
          <div className="grid grid-cols-6 gap-4">
            <div className="uppercase tracking-widest font-bold flex justify-end md:col-span-2">
              <p>Legal</p>
            </div>
            <NextLink href='/policy'
              className="text-sm col-span-5 hover:text-yellow-500 md:col-span-4"
            >
              Terms of Conditions
            </NextLink>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="md:w-1/2 max-w-[35em]">
          <GoogleMapSection />
        </div>
      </div>
      {/* rigts reserve */}
      <div>
        <p className="text-xs text-center">© 2022 Sushiville. All Rights Reserved. developed & designed by <a href='http://ykstudio.dev' target='_blank' className="hover:text-yellow-500">YK Studio</a></p>
      </div>
    </footer>
  );
}
export default PublicFooter;