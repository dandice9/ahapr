import { handleLogin, HandlerError } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        // Note that this can be combined with prompt=login , which indicates if
        // you want to always show the authentication page or you want to skip
        // if there’s an existing session.
        screen_hint: 'signup'
      }
    });
  } catch (error) {
    if(error instanceof HandlerError)
        res.status(error.status || 400).end(error.message);
    else
        res.status(500).end()
  }
}