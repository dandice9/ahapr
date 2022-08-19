// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, Session } from '@auth0/nextjs-auth0';

type Data = {
  name: string,
  session?: Session | null | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data = getSession(req, res)

  return res.status(200).json({ name: 'John Doe ', session: data })
}