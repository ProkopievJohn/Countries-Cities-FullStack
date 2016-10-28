export default ( sequelize, DataTypes ) => {
    const CallingCode = sequelize.define("CallingCode", {
        calling_code_id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        calling_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: {
            type: DataTypes.INTEGER( 3 ),
            allowNull: false
        }
    });

    return CallingCode;
};
