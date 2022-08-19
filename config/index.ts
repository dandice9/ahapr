import db from './database'

interface CONFIG {
    env: string,
    connection: object
}

const data: CONFIG = {
    "env": "development",
    "connection": db
}

export default data