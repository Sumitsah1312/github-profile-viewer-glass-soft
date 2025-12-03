export default function Skeleton({className = 'h-4 w-full', rounded='rounded-md'}) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${rounded} ${className}`}></div>
  )
}
