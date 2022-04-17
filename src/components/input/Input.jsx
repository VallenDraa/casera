import { useState } from 'react';

export default function Input({ innerRef, editMode, type, id }) {
  const [showPassword, setShowPassword] = useState('password');

  const handleShowPassword = () =>
    showPassword === 'password'
      ? setShowPassword('text')
      : setShowPassword('password');

  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      <label className="text-sm" htmlFor={id}>
        {id}
      </label>
      {editMode ? (
        type !== 'password' ? (
          <input
            type={type}
            id={id}
            ref={innerRef}
            placeholder={id}
            className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
          />
        ) : (
          <div className="relative">
            <input
              type={showPassword}
              id={id}
              ref={innerRef}
              placeholder={id}
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200 pr-9"
            />
            <div
              onClick={handleShowPassword}
              className="flex items-center justify-center absolute right-2 top-[5px] cursor-pointer"
            >
              {showPassword === 'password' ? (
                <i className="fa-solid fa-eye" />
              ) : (
                <i className="fa-solid fa-eye-slash relative right-[-1px]" />
              )}
            </div>
          </div>
        )
      ) : (
        <input
          type={type}
          id={id}
          ref={innerRef}
          placeholder={id}
          disabled
          className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
        />
      )}
    </div>
  );
}
