import emptySvg from '../../assets/svg/empty.svg';

export default function EmptySlides({ msg }) {
  return (
    <div className="rounded-lg max-w-md flex flex-col justify-center items-center text-center min-w-full border-2 border-slate-200 mb-3">
      <img src={emptySvg} className="w-full sm:w-10/12 lg:w-2/3" />
      <p className="relative bottom-10 font-roboto font-semibold italic text-gray-300">
        {msg}
      </p>
    </div>
  );
}
