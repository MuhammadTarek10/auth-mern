interface Props {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

export function LoadingComponent({
  size = "md",
  fullScreen = false,
  text,
}: Props) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary z-50"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center gap-6">
        {/* Main Spinner */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div
            className={`${sizeClasses[size]} border-4 rounded-full animate-spin border-primary/20`}
            style={{
              borderTopColor: "var(--color-primary)",
              borderRightColor: "var(--color-secondary)",
              animationDuration: "1s",
            }}></div>

          {/* Inner pulsing circle */}
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full animate-pulse`}
            style={{
              background: `radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)`,
            }}></div>

          {/* Center dot with glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary"
            style={{
              boxShadow: `0 0 10px var(--color-secondary), 0 0 20px var(--color-secondary)`,
            }}></div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-primary"
            style={{
              animationDelay: "0s",
              animationDuration: "1.4s",
            }}></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-secondary"
            style={{
              animationDelay: "0.2s",
              animationDuration: "1.4s",
            }}></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-accent-purple"
            style={{
              animationDelay: "0.4s",
              animationDuration: "1.4s",
            }}></div>
        </div>

        {/* Optional text */}
        {text && (
          <p className="text-text-secondary text-sm font-medium animate-pulse">
            {text}
          </p>
        )}

        {/* Decorative elements - only show on fullScreen */}
        {fullScreen && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob bg-accent-purple/30"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000 bg-accent-pink/30"></div>
          </div>
        )}
      </div>
    </div>
  );
}
