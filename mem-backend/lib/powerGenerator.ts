import { PowerPoint } from "../types/power"

export function generatePowerPoints(count = 60): PowerPoint[] {
  const baseTime = Date.now()

  return Array.from({ length: count }, (_, i) => {
    const t = (baseTime / 1000 + i) % 360

    const activeBase = Math.sin(t / 10) * 20 + 100
    const reactiveBase = Math.cos(t / 10) * 10 + 40

    const noise = () => (Math.random() - 0.5) * 2

    return {
      timestamp: baseTime + i * 1000,
      activePower: +(activeBase + noise()).toFixed(2),
      reactivePower: +(reactiveBase + noise()).toFixed(2)
    }
  })
}