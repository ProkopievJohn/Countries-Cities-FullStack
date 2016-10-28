export default ( sequelize, DataTypes ) => {
    const Continent = sequelize.define("Continent", {
        continent_id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        continent: {
            type: DataTypes.STRING( 64 ),
            allowNull: false
        }
    });

    return Continent;
};
