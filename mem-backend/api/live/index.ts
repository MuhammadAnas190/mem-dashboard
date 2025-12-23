import { Request, Response } from 'express'
import { generatePowerPoints } from "../../lib/powerGenerator.js"

export default function handler(
  req: Request,
  res: Response
) {
  const pointsParam = req.query.points;
  const pointsCount = pointsParam ? parseInt(pointsParam as string, 10) : 100;
  
  // Validate points count (min 1, max 200)
  const validPoints = Math.max(1, Math.min(pointsCount, 200));
  
  const points = generatePowerPoints(validPoints)

  res.status(200).json({
    count: points.length,
    points
  })
}
