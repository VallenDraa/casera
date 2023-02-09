import Input from './Input';

export default function ThreeInput({ editMode, innerRef, value, label = '' }) {
  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      {label && <label className="text-sm">{label}</label>}
      <div ref={innerRef} className="flex gap-2 justify-between">
        <Input
          editMode={editMode}
          innerRef={innerRef}
          value={value[0]}
          id={'Hobby 1'}
          type={'text'}
          showLabel={false}
        />
        <Input
          editMode={editMode}
          innerRef={innerRef}
          value={value[1]}
          id={'Hobby 2'}
          type={'text'}
          showLabel={false}
        />
        <Input
          editMode={editMode}
          innerRef={innerRef}
          value={value[2]}
          id={'Hobby 3'}
          type={'text'}
          showLabel={false}
        />
      </div>
    </div>
  );
}
