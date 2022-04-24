import { changeToSave, changeToSaved } from '../../handleSave/handleSave';

export default function SaveRecipeBtn({ id, saved }) {
  return (
    <div className="w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto absolute z-40 cursor-pointer">
      {saved ? (
        <i className="fa-solid fa-heart" />
      ) : (
        <i className="fa-regular fa-heart" />
      )}
      <div
        onClick={(e) => changeToSaved(e)}
        className="absolute z-20 inset-0"
      ></div>
      <span className="text-[12px]">{saved ? 'Saved' : 'Save Dish'}</span>
    </div>
  );
}
