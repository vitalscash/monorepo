/** Interval in milliseconds */
export const intervalIn = {
  yearInDays: 365,
  quarterInMonths: 3,
  monthInDays: 30,
  hourInDays: 24,
  daysInWeek: 7,
  minuteInHours: 60,
  secondInMinutes: 60,
  millisecondInSecond: 1000,
} as const
const second = intervalIn.millisecondInSecond
const minute = intervalIn.secondInMinutes * second
const hour = intervalIn.minuteInHours * minute
const day = intervalIn.hourInDays * hour
const month = intervalIn.monthInDays * day
const year = intervalIn.yearInDays * month

/** Intervals in milliseconds */
export const interval = {
  second,
  minute,
  hour,
  day,
  month,
  year,
} as const

/** Default display intervals */
export const defaultDisplayInterval = {
  hour: 7 * 24,
  day: 6 * 30,
  month: 60,
} as const

/**
 * Format a timestamp
 * @param timestamp - The timestamp to format
 * @param param1.anchor - The anchor date
 * @param param1.showSeconds - Whether to show seconds
 * @returns The formatted timestamp
 */
export const formatTimestamp = (timestamp: number | Date | string, {
  anchor = new Date(),
  showSeconds = false,
}: {
  anchor?: Date,
  showSeconds?: boolean,
} = {}) => {
  const date = new Date(timestamp)
  const diffMs = anchor.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / interval.minute)
  const diffHours = Math.floor(diffMs / interval.hour)
  const diffDays = Math.floor(diffMs / interval.day)
  const diffMonths = Math.floor(diffDays / interval.month)
  if (diffMonths > 0) {
    if (diffMonths < intervalIn.quarterInMonths) {
      return `${diffMonths}mo ${diffDays % intervalIn.monthInDays}d ago`
    }
    return `${diffMonths}mo ago`
  }
  if (diffMins < 1) {
    if (showSeconds) {
      if (diffMs < 10 * interval.second) {
        return 'Just now'
      }
      return `${Math.floor(diffMs / interval.second)}s ago`
    }
    return 'Just now'
  }
  if (diffMins < intervalIn.secondInMinutes) {
    return `${diffMins}m ago`
  } else if (diffHours < intervalIn.hourInDays) {
    if (diffHours < 6) {
      return `${diffHours}h ${diffMins % intervalIn.minuteInHours}m ago`
    }
    return `${diffHours}h ago`
  } else {
    if (diffDays < intervalIn.daysInWeek) {
      return `${diffDays}d ${diffHours % intervalIn.hourInDays}h ago`
    }
    return `${diffDays}d ago`
  }
}

/**
 * Format a duration
 * @param param0.start - The start date
 * @param param0.until - The end date
 * @returns The formatted duration
 */
export const formatDuration = ({
  start = new Date(),
  until = new Date(),
}: {
  start?: Date,
  until?: Date,
} = {}) => {
  const diffMs = until.getTime() - start.getTime()
  const diffMins = Math.floor(diffMs / interval.minute)
  const diffHours = Math.floor(diffMs / interval.hour)
  const diffDays = Math.floor(diffMs / interval.day)
  const diffMonths = Math.floor(diffDays / intervalIn.monthInDays)
  if (diffMonths > 0) {
    return `${diffMonths}mo ${diffDays % intervalIn.monthInDays}d`
  }
  if (diffDays > 0) {
    return `${diffDays}d ${diffHours % intervalIn.hourInDays}h`
  }
  if (diffHours > 0) {
    return `${diffHours}h ${diffMins % intervalIn.minuteInHours}m`
  }
  return `${diffMins % intervalIn.minuteInHours}m`
}

/**
 * Sleep for a given number of milliseconds
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the given number of milliseconds
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export type TimeResolutionKey = "hour" | "day" | "month"
