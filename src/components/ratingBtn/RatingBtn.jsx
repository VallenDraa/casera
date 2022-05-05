export default function RatingBtn({ ratingStars, handleRate, userHasRated }) {
  const RATING_MESSAGES = [
    '🤮 Bad',
    '😕 Meh',
    '🙂 Ok',
    '😋 Good',
    '🤩 Delicious',
  ];
  return (
    <div className="bg-slate-700 text-center rounded sm:px-2 py-1 w-full font-light text-yellow-400 font-ssp mt-3">
      <div
        ref={ratingStars}
        onClick={(e) => handleRate(e)}
        className="space-x-1 text-xl mb-1 cursor-pointer w-fit mx-auto"
      >
        <i id="1" className="fa-regular fa-star" />
        <i id="2" className="fa-regular fa-star" />
        <i id="3" className="fa-regular fa-star" />
        <i id="4" className="fa-regular fa-star" />
        <i id="5" className="fa-regular fa-star" />
      </div>
      <p className="text-sm pt-1">
        {userHasRated
          ? `${RATING_MESSAGES[userHasRated.rating - 1]} (${
              userHasRated.rating
            } / 5)`
          : 'Rate This Recipe !'}
      </p>
    </div>
  );
}
