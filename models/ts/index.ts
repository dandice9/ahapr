import { Dialect } from "sequelize/types";
import { Sequelize } from 'sequelize';
import UserActiveSessionModel from './user_active_session'
import dbConfig from '~config'

interface DBConnection{
    username: string,
    password: string,
    database: string,
    host: string,
    dialect: Dialect,
    port: number,
    ssl: boolean,
    dialectOptions: object,
    logging: boolean
}

const dbConfigData = (dbConfig.connection as Record<string, any>)[dbConfig.env] as DBConnection
export const sequelize = new Sequelize(dbConfigData.database, dbConfigData.username, dbConfigData.password, dbConfigData)

export const UserActiveSession = UserActiveSessionModel(sequelize)