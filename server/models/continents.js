export default ( sequelize, DataTypes ) => {
    const Continent = sequelize.define("Continent", {
        id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        continent: {
            type: DataTypes.STRING( 64 ),
            allowNull: false
        }
    }, {
        classMethods: {
            associate( models ) {
                Continent.hasMany( models.Country );
            }
        }
    });

    return Continent;
};
