import { handleAuth, handleCallback, HandlerError, Session } from '@auth0/nextjs-auth0';
import { UserActiveSession } from '~models/ts'
import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = (req: NextApiRequest, res: NextApiResponse, session: Session, state?: { [key: string]: any }) => {
    UserActiveSession.create({
        email: session.user.email,
        dateText: moment().format('YYYY-MM-DD')
    })

    return session;
};

export default handleAuth({
    async callback(req: NextApiRequest, res: NextApiResponse) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            const errorData = error as HandlerError
            res.status(errorData.status || 500).end(errorData.message);
        }
    }
});