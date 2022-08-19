// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {  } from '@auth0/nextjs-auth0'

type Data = {
    data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method === 'POST'){
        const username: string = req.body.username
        const email: string = req.body.email

        const {
            AUTH0_MANAGEMENT_TOKEN,
            AUTH0_ISSUER_BASE_URL
        } = process.env
    
        const userApiPath = '/api/v2/users'
        const targetUrl = `${AUTH0_ISSUER_BASE_URL}${userApiPath}`
    
        const response = await axios.get(targetUrl, {
            headers: {
                'Authorization': `Bearer ${AUTH0_MANAGEMENT_TOKEN}`
            },
            params: {
                search_engine: 'v3',
                page: 0,
                per_page: 1,
                q: `email:${email}`
            }
        })

        if(response.data.length > 0){

            const [userData] = response.data
            const userId = userData.user_id
            
            const updateUsernameResponse = await axios.patch(`${AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
                name: username
            }, {
                headers: {
                    'Authorization': `Bearer ${AUTH0_MANAGEMENT_TOKEN}`
                }
            })

            return res.status(200).json({
                data: updateUsernameResponse.data
            })
        }
        else {

            return res.status(500)

        }
    }
    else {
        return res.status(404)
    }
}   