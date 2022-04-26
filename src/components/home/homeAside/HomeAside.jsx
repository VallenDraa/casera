export default function homeAside() {
  return (
    <aside className="text-lime-800 w-fit absolute items-center h-fit transform -rotate-90 hidden lg:flex -left-[230px] xl:-left-[190px] 2xl:-left-[125px] font-ssp">
      <div className="h-[2px] w-16 bg-lime-800"></div>
      <span className="w-72 text-center text-2xl font-light ">
        Healthy and{' '}
        <span className="font-semibold italic text-lime-700">Delicious !</span>
      </span>
      <div className="h-[2px] w-16 bg-lime-800"></div>
    </aside>
  );
}
