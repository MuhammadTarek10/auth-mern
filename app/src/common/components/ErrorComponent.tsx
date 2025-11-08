import { useNavigate } from "@tanstack/react-router";

interface Props {
  error: Error;
}

export function ErrorComponent({ error }: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <div className="relative max-w-2xl w-full text-center space-y-8 animate-fade-in z-10">
        {/* Animated Error Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full blur-3xl animate-pulse bg-error/20"></div>
          <div className="relative rounded-full p-8 shadow-2xl bg-linear-to-br from-error to-secondary">
            <svg
              className="w-24 h-24 text-white animate-bounce-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-error-light via-secondary-light to-primary-light animate-gradient">
            Oops!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Something went wrong
          </h2>
          <div className="backdrop-blur-md rounded-2xl p-6 border shadow-xl bg-bg-surface/10 border-bg-surface/20">
            <p className="text-lg font-mono wrap-break-word text-text-error">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => navigate({ to: "/" })}
            className="group relative px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden bg-linear-to-r from-primary-dark to-secondary-dark">
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-primary-dark/90 to-secondary-dark/90"></div>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="group relative px-8 py-4 backdrop-blur-md border rounded-xl font-semibold text-white shadow-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 bg-bg-surface/10 border-bg-surface/20">
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reload Page
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob bg-accent-purple/30"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 bg-accent-pink/30"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 bg-accent-red/30"></div>
        </div>
      </div>
    </div>
  );
}
