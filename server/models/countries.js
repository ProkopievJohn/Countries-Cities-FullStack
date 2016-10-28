export default ( sequelize, DataTypes ) => {
    const Country = sequelize.define("Country", {
        country_id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        continent: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED
        }
    });

    return Country;
};
