// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

type SessionData = {
  total_signup?: number | undefined,
  total_active_session_today?: number | undefined,
  detail?: string | undefined
  error?: Error | undefined
}
/**
 * @swagger
 * /api/users/get_session_data:
 *   post:     
 *     description: Returns session statistics
 *     responses:
 *       200:
 *         description: session stats
 *       404:
 *          description: data not found
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionData>
) {
  if(req.method === 'POST'){
    const {
      AUTH0_MANAGEMENT_TOKEN,
      AUTH0_ISSUER_BASE_URL
    } = process.env

    const userApiPath = '/api/v2/users'
    const targetUrl = `${AUTH0_ISSUER_BASE_URL}${userApiPath}`

    const result1 = await axios.get(targetUrl, {
      headers: {
        'Authorization': `Bearer ${AUTH0_MANAGEMENT_TOKEN}`
      },
      params: {
        search_engine: 'v3',
        page: 1,
        per_page: 1,
        include_totals: true
      }
    })
    const result2 = await axios.get(targetUrl, {
      headers: {
        'Authorization': `Bearer ${AUTH0_MANAGEMENT_TOKEN}`
      },
      params: {
        search_engine: 'v3',
        page: 1,
        per_page: 1,
        include_totals: true,
        q: `last_login:[${moment().format('YYYY-MM-DD')} TO ${moment().format('YYYY-MM-DD')}]`
      }
    })
  
    return res.status(200).json({
        total_signup: result1.data.total,
        total_active_session_today: result2.data.total
    })
  }
  else {
    return res.status(404).json({
        error: new Error('not found')
    })
  }
}