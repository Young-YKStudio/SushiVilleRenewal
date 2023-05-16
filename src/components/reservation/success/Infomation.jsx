import Router from 'next/router'

const InfomationSection = ({reservation}) => {
  return (
    <section className="md:w-1/2 w-full mt-12 md:mt-0 flex flex-col items-center justify-center">
      <div className="bg-white/40 p-8 rounded-lg flex flex-col gap-4 text-lime-800">
        <p className="font-bold text-xl">Thank you, {reservation.name}.</p>
        <div className="p-2">
          <p>Your reservation is not approved yet. You will soon receive a confirmation email or a call from Susiville.</p>
        </div>
        <p>Thank you for choosing <span className="font-bold">Sushiville</span>.</p>
        <button onClick={() => Router.push('/')} className="bg-lime-800 text-white py-2 rounded-md hover:bg-yellow-500">Home</button>
      </div>
    </section>
  );
}
export default InfomationSection;