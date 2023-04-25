import GoogleMapSection from "./map";
import NextLink from 'next/link'
import { RestaurntData } from "../../../data/Restaurant";

const PublicFooter = () => {
  return (
    <footer
      className="bg-lime-800 text-white px-8 py-4 flex flex-col items-center tracking-wide md:min-h-[10.8em]"
    >
      <div className="flex flex-col gap-4 pb-8 md:flex-row">
        {/* TOP - left side */}
        <div className="w-full flex justify-center py-4 md:w-1/4">
          <img src='https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png' alt='logo' className='w-[150px] md:max-w-none md:w-[190px] md:h-[35px] saturate-0 invert object-cover md:mt-8' />
        </div>
        {/* TOP - rigt side */}
        <div className="flex md:flex-row flex-col md:items-center gap-4">
          <div className="text-xs flex flex-row gap-4 md:gap-0 md:mt-12">
            <div className="uppercase tracking-widest font-bold w-24">
              <p className="text-yellow-500 md:text-right md:mr-2">Contact</p>
            </div>
            <div>
              <p>{RestaurntData.address1} </p>
              <p>{RestaurntData.address2}</p>
              <p>{RestaurntData.contact}</p>
              <a href='mailto: info@sushivilleny.com' className="hover:text-yellow-500 font-bold">{RestaurntData.email}</a>
            </div>
          </div>
          <div className="text-xs flex flex-row gap-4 md:gap-0">
            <div className="uppercase tracking-widest font-bold w-24">
              <p className="text-yellow-500 md:text-right md:mr-2">Legal</p>
            </div>
            <NextLink href='/policy'
              className="col-span-5 hover:text-yellow-500 md:col-span-4 truncate"
            >
              Terms of Conditions
            </NextLink>
          </div>

        </div>
      </div>
      {/* bottom */}
      <div>
        <p className="text-xs text-center">© 2022 Sushiville. All Rights Reserved. developed & designed by <a href='http://ykstudio.dev' target='_blank' className="hover:text-yellow-500">YK Studio</a></p>
      </div>
    </footer>
  );
}
export default PublicFooter;