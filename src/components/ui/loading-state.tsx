import { Loader2, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type LoadingStateType = "loading" | "error" | "empty" | "success"

interface LoadingStateProps {
  type: LoadingStateType
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingState({ 
  type, 
  title, 
  description, 
  action, 
  className,
  size = "md" 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32"
  }

  const iconSize = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  }

  const defaultContent = {
    loading: {
      title: "Loading...",
      description: "Please wait while we fetch your data",
      icon: Loader2
    },
    error: {
      title: "Something went wrong",
      description: "We couldn't load your data. Please try again.",
      icon: AlertCircle
    },
    empty: {
      title: "No data found",
      description: "There's nothing to show here yet.",
      icon: AlertCircle
    },
    success: {
      title: "Success!",
      description: "Your action was completed successfully.",
      icon: CheckCircle2
    }
  }

  const content = defaultContent[type]
  const Icon = content.icon

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className={cn("rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4", sizeClasses[size])}>
        <Icon className={cn("text-gray-500 dark:text-gray-400", iconSize[size], {
          "animate-spin": type === "loading"
        })} />
      </div>
      
      <h3 className={cn(
        "font-semibold text-gray-900 dark:text-white mb-2",
        {
          "text-lg": size === "sm",
          "text-xl": size === "md",
          "text-2xl": size === "lg"
        }
      )}>
        {title || content.title}
      </h3>
      
      <p className={cn(
        "text-gray-500 dark:text-gray-400 mb-6 max-w-md",
        {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg"
        }
      )}>
        {description || content.description}
      </p>
      
      {action && (
        <Button 
          onClick={action.onClick}
          variant={type === "error" ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {type === "error" && <RefreshCw className="h-4 w-4" />}
          {action.label}
        </Button>
      )}
    </div>
  )
}

interface PageLoaderProps {
  message?: string
  className?: string
}

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
  return (
    <div className={cn("fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-50", className)}>
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
      </div>
    </div>
  )
}

interface InlineLoaderProps {
  message?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export function InlineLoader({ message = "Loading...", className, size = "md" }: InlineLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
      <span className="text-gray-600 dark:text-gray-400 text-sm">{message}</span>
    </div>
  )
}

interface SkeletonCardProps {
  lines?: number
  className?: string
  showAvatar?: boolean
}

export function SkeletonCard({ lines = 3, className, showAvatar = false }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6 space-y-4", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-3 w-16 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse"
            style={{ width: `${Math.random() * 30 + 70}%` }}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  )
}