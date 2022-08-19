// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

type UserData = {
    email: string,
    name: string,
    logins_count: number,
    created_at: Date,
    last_login: Date,
    created_at_text?: string | undefined,
    last_login_text?: string | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<UserData>>
) {
  if(req.method === 'POST'){
    const {
      AUTH0_MANAGEMENT_TOKEN,
      AUTH0_ISSUER_BASE_URL
    } = process.env

    const userApiPath = '/api/v2/users'
    const targetUrl = `${AUTH0_ISSUER_BASE_URL}${userApiPath}`

    const currentPage = req.body.page

    const result = await axios.get(targetUrl, {
        headers: {
          'Authorization': `Bearer ${AUTH0_MANAGEMENT_TOKEN}`
        },
        params: {
          search_engine: 'v3',
          page: currentPage,
          per_page: 100,
          include_totals: true
        }
    })

    const userlist = result.data.users.map((obj: UserData) => {
        const userData: UserData = {
            email: obj.email,
            name: obj.name,
            created_at: obj.created_at,
            last_login: obj.last_login,
            logins_count: obj.logins_count,
            created_at_text: moment(obj.created_at).format('YYYY-MM-DD H:mm:ss'),
            last_login_text: moment(obj.last_login).format('YYYY-MM-DD H:mm:ss')
        }
        return userData
    }) as Array<UserData>

    return res.json(userlist)
  }
  else {
    return res.status(404)
  }
}