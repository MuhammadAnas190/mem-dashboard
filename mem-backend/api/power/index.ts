import type { VercelRequest, VercelResponse } from "@vercel/node"
import { generatePowerPoints } from "../../lib/powerGenerator"

export default function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  const points = generatePowerPoints(60)

  res.status(200).json({
    count: points.length,
    points
  })
}
