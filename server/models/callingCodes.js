export default ( sequelize, DataTypes ) => {
    const CallingCode = sequelize.define("CallingCode", {
        id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        calling_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // country: {
        //     type: DataTypes.INTEGER( 3 ),
        //     allowNull: false
        // }
    }, {
        classMethods: {
            associate( models ) {
                CallingCode.belongsTo( models.Country )
            }
        }
    });

    return CallingCode;
};
