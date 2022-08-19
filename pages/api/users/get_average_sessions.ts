// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize } from '~models/ts'
import moment from 'moment'

type SessionData = {
  average_weekly?: number | undefined,
  error?: Error | undefined
}

type BodyData = {
  back_date_count: number
}

type TotalSessionResult = {
  total_sessions: number
}

/**
 * @swagger
 * /api/users/get_average_sessions:
 *   post:
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          "back_date_count":
 *                              type: number
 *                              default: 7
 *                      
 *     description: Returns average session
 *     responses:
 *       200:
 *         description: average session
 *       404:
 *          description: data not found
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionData>
) {
  if(req.method === 'POST'){
    const { back_date_count } = req.body as BodyData

    const sessionCountQuery = `
    SELECT COUNT(*) AS total_sessions
      FROM (
        SELECT DISTINCT email, date_text FROM public.user_active_sessions
        WHERE created_at BETWEEN '${moment().subtract(back_date_count, 'day').format('YYYY-MM-DD')}' AND '${moment().format('YYYY-MM-DD')}'
      ) AS dtf;
    `;

    const [results] = await sequelize.query(sessionCountQuery)
    const [result] = results as Array<TotalSessionResult>

    return res.status(200).json({
      average_weekly: Math.ceil(result.total_sessions / back_date_count)
    })
  }
  else {
    return res.status(404).json({
        error: new Error('not found')
    })
  }
}