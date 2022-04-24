import CardContent from './CardContent';

export default function CardWrapper({ recipe, lazyload = false }) {
  return (
    <div className="h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp">
      <img
        src={recipe.strMealThumb}
        alt={' '}
        loading={lazyload ? 'lazy' : 'eager'}
        className="object-cover w-full h-full rounded-lg"
      />
      <CardContent recipe={recipe} lazyload={lazyload} />
    </div>
  );
}
