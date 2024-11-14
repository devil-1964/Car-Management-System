import { Loader2 } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="text-sans mx-auto w-full flex gap-2 text-4xl items-center justify-center p-24">
      <Loader2 className="animate-spin w-14 h-14 text-orange-500" />
      Loading...
    </div>
  )
}

export default LoadingSpinner