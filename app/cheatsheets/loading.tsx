export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
        <div className="h-6 w-1/2 mx-auto mt-4 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  )
}
