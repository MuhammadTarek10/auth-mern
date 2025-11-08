import { Button } from "@/common/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-green-900 via-emerald-900 to-green-950 px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 animate-blob rounded-full bg-green-500/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-emerald-500/30 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 animate-blob animation-delay-4000 rounded-full bg-green-400/20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center animate-fade-in">
        {/* Gradient 404 text */}
        <div className="mb-8">
          <h1 className="text-[12rem] font-black leading-none">
            <span className="bg-linear-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent animate-gradient">
              404
            </span>
          </h1>
        </div>

        {/* Title with gradient */}
        <h2 className="mb-6 text-5xl font-bold">
          <span className="bg-linear-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent">
            Oops! Page Not Found
          </span>
        </h2>

        {/* Description */}
        <p className="mb-12 text-lg text-green-100 md:text-xl">
          The page you're looking for seems to have wandered off into the
          digital void. Don't worry, let's get you back on track!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate({ to: "/" })}
            variant="default"
            size="lg"
            className="bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50 hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:shadow-green-500/60 transition-all duration-300">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="border-2 border-green-400/50 bg-white/10 text-green-100 backdrop-blur-sm hover:bg-white/20 hover:border-green-300 hover:text-white transition-all duration-300">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-green-300/20">
        <div className="flex gap-2">
          <div className="h-2 w-2 animate-bounce-slow rounded-full bg-green-400"></div>
          <div className="h-2 w-2 animate-bounce-slow animation-delay-2000 rounded-full bg-emerald-400"></div>
          <div className="h-2 w-2 animate-bounce-slow animation-delay-4000 rounded-full bg-green-400"></div>
        </div>
      </div>
    </div>
  );
}
