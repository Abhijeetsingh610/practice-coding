export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
        <div className="h-6 w-1/2 mx-auto mt-4 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between gap-4">
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
        </div>

        <div className="h-[calc(100vh-300px)] min-h-[500px] rounded-lg bg-gray-200 animate-pulse dark:bg-gray-800" />
      </div>
    </div>
  )
}
