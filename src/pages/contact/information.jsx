import { RestaurntData } from "../../../data/Restaurant";

const InformationSection = () => {
  return (
    <div className="mt-8 flex flex-col gap-8 justify-center w-full md:w-2/3 text-lime-800 px-8 md:mt-0">
      {/* left */}
      {/* Contact */}
      <div className="flex flex-col gap-2">
        <div className="border-b border-lime-800 pb-2 mb-4">
          <p className="text-5xl font-bold">Contact</p>
        </div>
        {/* right */}
        <div className="">
          <p>{RestaurntData.address1}</p>
          <p>{RestaurntData.address2}</p>
          <p>{RestaurntData.contact}</p>
          <a href='mailto: info@sushivilleny.com' className="hover:text-lime-600 font-bold">{RestaurntData.email}</a>
        </div>
      </div>
      {/* Hours */}
      <div className="flex flex-col gap-2">
        {/* left */}
        <div className="border-b border-lime-800 pb-2 mb-4">
          <p className="text-5xl font-bold">Hours</p>
        </div>
        {/* right */}
        <div
          className=""
        >
          <p>12pm ~ 9pm</p>
          <p>Closed at Tuesday.</p>
        </div>
      </div>
    </div>
  );
}
export default InformationSection;