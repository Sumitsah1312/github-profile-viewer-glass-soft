export default function Avatar({ src, alt, size = 56 }) {
  return <img src={src} alt={alt} className={`rounded-full border`} style={{width:size, height:size}} />
}
