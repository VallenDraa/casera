import CardContent from './CardContent';
import Img from '../img/Img';

export default function CardWrapper({ recipe, lazyload = false }) {
  return (
    <>
      <div className="shadow-md animate-fade-in h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp resize">
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
