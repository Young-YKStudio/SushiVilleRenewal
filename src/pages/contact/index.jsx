import GoogleMapSection from "./googleMap";
import InformationSection from "./information";

const Contact = () => {
  return (
    <section
      className="pt-20 bg-yellow-500 min-h-[85vh] flex flex-col md:flex-row"
    >
      <InformationSection />
      <GoogleMapSection />
    </section>
  );
}
export default Contact;