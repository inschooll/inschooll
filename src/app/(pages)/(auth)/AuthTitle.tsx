export default function AuthTitle({title}: {title: string}) {
  return (
    <h1 className="text-center text-xl font-bold sm:text-4xl">
      {title}
    </h1>
  )
}