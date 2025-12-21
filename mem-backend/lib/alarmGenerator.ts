import { AlarmEvent, Severity } from "../types/alarm"

const sites = [
  "North Plant",
  "South Substation",
  "East Warehouse",
  "West Site",
  "Main Campus",
  "Remote Site 1",
  "Remote Site 2"
]

const descriptions = [
  "Overcurrent detected",
  "Voltage sag",
  "Frequency out of range",
  "Temperature high",
  "Connection lost",
  "Sensor failure",
  "Maintenance required",
  "Unexpected shutdown",
  "Alarm threshold exceeded",
  "Communication timeout"
]

const tagPool = ["power", "comm", "safety", "temp", "maintenance", "network", "critical"]

const severities: Severity[] = ["critical", "major", "minor", "warning", "info"]

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randTags(): string[] {
  const n = 1 + Math.floor(Math.random() * 3)
  const set = new Set<string>()
  while (set.size < n) set.add(rand(tagPool))
  return Array.from(set)
}

export function generateAlarms(count = 50): AlarmEvent[] {
  const now = Date.now()

  return Array.from({ length: count }, (_, i) => {
    const startOffset = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7) // within last 7 days
    const duration = Math.floor(Math.random() * 1000 * 60 * 60 * 6) // up to 6 hours

    const code = `ALM-${1000 + i}`
    const description = rand(descriptions)

    return {
      id: `${Date.now()}-${i}`,
      code,
      severity: rand(severities),
      siteName: rand(sites),
      description,
      startTime: now - startOffset,
      endTime: now - startOffset + duration,
      tags: randTags()
    }
  })
}
