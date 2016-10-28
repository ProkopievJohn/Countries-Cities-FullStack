export default ( sequelize, DataTypes ) => {
    const City = sequelize.define("City", {
        city_id: {
            type: DataTypes.INTEGER( 5 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING( 64 ),
            allowNull: false
        },
        population: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        country: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            allowNull: false
        }
    });

    return City;
};
