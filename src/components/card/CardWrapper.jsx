import CardContent from './CardContent';
import Img from '../img/Img';

export default function CardWrapper({ recipe, lazyload = false }) {
  return (
    <>
      <div className="animate-fade-in h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp">
        <Img
          lazyload={lazyload}
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <CardContent recipe={recipe} />
      </div>
    </>
  );
}
