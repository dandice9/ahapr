// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, Session } from '@auth0/nextjs-auth0';
import axios from 'axios'

type Data = {
    data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        const data = getSession(req, res)

        var options = {
            method: 'POST',
            url: `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
            headers: {'content-type': 'application/json'},
            data: {
            client_id: process.env.AUTH0_CLIENT_ID,
            email: data?.user['email'],
            connection: 'Username-Password-Authentication'
            }
        };
        
        const response = await axios.request(options)

        return res.status(200).json({
            data: response.data
        })
    } catch (error) {
        return res.status(500).json({
            data: error
        })
    }


    // return res.status(200).json({ name: 'John Doe ', session: data })
}