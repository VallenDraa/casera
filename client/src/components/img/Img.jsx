import './Img.css';

export default function Img({ src, alt, lazyload }) {
  return (
    <>
      <img
        src={src}
        alt={'⠀⠀⠀⠀'}
        data-value={alt}
        loading={lazyload ? 'lazy' : 'eager'}
        className="relative font-roboto text-sm object-cover w-full h-full rounded-lg img-alt"
      />
    </>
  );
}
