import HeroSection from "./hero";
import MenuSection from "./menu";
import DeliveryApps from "./deliveryApps";

const Landing = ({menu}) => {

  return (
    <div className="bg-yellow-500">
      <HeroSection />
      <DeliveryApps />
      <MenuSection menu={menu} />
    </div>
  );
}
export default Landing;