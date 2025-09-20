import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  animate?: boolean;
}

export function SkeletonLoader({ className, lines = 1, animate = true }: SkeletonLoaderProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-md bg-gray-200 dark:bg-gray-800",
            animate && "animate-pulse",
            className
          )}
          style={{
            width: `${Math.random() * 40 + 60}%`,
            height: `${Math.random() * 10 + 16}px`,
          }}
        />
      ))}
    </div>
  )
}

interface CardSkeletonProps {
  className?: string;
  header?: boolean;
  content?: boolean;
  footer?: boolean;
}

export function CardSkeleton({ className, header = true, content = true, footer = false }: CardSkeletonProps) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {header && (
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-4 w-8 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
          <div className="h-3 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      )}
      {content && (
        <div className="p-6 pt-0">
          <SkeletonLoader lines={3} />
        </div>
      )}
      {footer && (
        <div className="flex items-center p-6 pt-0">
          <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      )}
    </div>
  )
}

interface StatsCardSkeletonProps {
  className?: string;
}

export function StatsCardSkeleton({ className }: StatsCardSkeletonProps) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-4 w-4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-16 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-3 w-32 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

interface ListSkeletonProps {
  className?: string;
  items?: number;
  avatar?: boolean;
}

export function ListSkeleton({ className, items = 3, avatar = true }: ListSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {avatar && (
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-3 w-1/2 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
          <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

interface TableSkeletonProps {
  className?: string;
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ className, rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, j) => (
              <div key={j} className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}