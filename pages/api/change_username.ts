// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {  } from '@auth0/nextjs-auth0'

type Data = {
    data: any
}

/**
 * @swagger
 * /api/change_username:
 *   post:
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          username:
 *                              type: string
 *                      
 *     description: Returns updated user object
 *     responses:
 *       200:
 *         description: change username
 *       404:
 *          description: data not found
 */
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

            return res.status(404).json({
                data: 'not found'
            })

        }
    }
    else {
        return res.status(404).json({
            data: 'not found'
        })
    }
}   