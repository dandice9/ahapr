import {DataTypes, Model, Sequelize} from 'sequelize'

class UserActiveSession extends Model{

}

function defineModel(sequelize: Sequelize) {
    return UserActiveSession.init({
        email: {
            type: DataTypes.STRING
        },
        dateText: {
            type: DataTypes.STRING,
            field: 'date_text'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        sequelize,
        modelName: 'UserActiveSession',
        tableName: 'user_active_sessions'
    })
}

export default defineModel