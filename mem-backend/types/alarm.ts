export type Severity = "critical" | "major" | "minor" | "warning" | "info"

export interface AlarmEvent {
  id: string
  code: string
  severity: Severity
  siteName: string
  description: string
  startTime: number
  endTime?: number
  tags: string[]
}

export interface AlarmResponse {
  count: number
  events: AlarmEvent[]
}
