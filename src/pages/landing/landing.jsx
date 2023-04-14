import HeroSection from "./hero";
import MenuSection from "./menu";
import DeliveryApps from "./deliveryApps";

const Landing = () => {

  return (
    <div className="bg-yellow-500">
      <HeroSection />
      <DeliveryApps />
      <MenuSection />
    </div>
  );
}
export default Landing;