import type { VercelRequest, VercelResponse } from "@vercel/node"
import { generateAlarms } from "../../lib/alarmGenerator"
import type { AlarmResponse } from "../../types/alarm"

export default function handler(req: VercelRequest, res: VercelResponse) {
  const all = generateAlarms(200)

  const qRaw = req.query.search || req.query.q
  const q = Array.isArray(qRaw) ? qRaw.join(" ") : qRaw
  const search = q ? String(q).trim().toLowerCase() : ""

  let filtered = all
  if (search) {
    filtered = all.filter((a) => {
      return (
        a.code.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search) ||
        a.siteName.toLowerCase().includes(search)
      )
    })
  }

  const body: AlarmResponse = {
    count: filtered.length,
    events: filtered
  }

  res.status(200).json(body)
}
