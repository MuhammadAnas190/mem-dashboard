import { Request, Response } from 'express'
import { generatePowerPoints } from "../../lib/powerGenerator.js"

export default function handler(
  _req: Request,
  res: Response
) {
  const points = generatePowerPoints(60)

  res.status(200).json({
    count: points.length,
    points
  })
}
