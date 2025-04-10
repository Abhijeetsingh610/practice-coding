export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
        <div className="h-6 w-1/2 mx-auto mt-4 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-800" />
            <div className="space-y-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-700" />
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                  <div className="h-5 w-10 ml-auto bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
