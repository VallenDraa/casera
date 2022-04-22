import { useState } from 'react';
import Input from './Input';

export default function ThreeInput({ editMode, innerRef, value }) {
  value = [];
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      <label className="text-sm">Hobby</label>
      <span className="text-[10px] text-lime-700">
        *You can fill up to 3 hobbies
      </span>
      <div ref={innerRef} className="mt-2 flex gap-2 justify-between">
        <Input
          editMode={editMode}
          innerRef={innerRef}
          id={'Hobby1'}
          type={'text'}
          showLabel={false}
        />
        <Input
          editMode={editMode}
          innerRef={innerRef}
          id={'Hobby2'}
          type={'text'}
          showLabel={false}
        />
        <Input
          editMode={editMode}
          innerRef={innerRef}
          id={'Hobby3'}
          type={'text'}
          showLabel={false}
        />
      </div>
    </div>
  );
}
