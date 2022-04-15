import CardContent from './CardContent';

export default function CardWrapper({ recipe, saved }) {
  return (
    <div
      style={{
        backgroundImage: `url('${recipe.strMealThumb}')`,
        backgroundSize: 'cover',
      }}
      className="h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp"
    >
      <CardContent recipe={recipe} saved={saved} />
    </div>
  );
}
