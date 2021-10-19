import { GiCoffeeBeans } from "react-icons/gi";

export default function BeanRating({ rating }) {
  const convertedRating = rating / 5 * 100;
  const roundedRating = (Math.round(convertedRating / 5) * 5);

  return (
    <div className="beans-outer">
      {/* <GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /> */}
      <div className="beans-inner" style={{ width: `${roundedRating}%` }}>
        {/* <GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /><GiCoffeeBeans /> */}
      </div>
    </div>
  );
}
