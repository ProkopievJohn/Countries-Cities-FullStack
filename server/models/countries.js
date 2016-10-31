export default ( sequelize, DataTypes ) => {
    const Country = sequelize.define("Country", {
        id: {
            type: DataTypes.INTEGER( 3 ).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate( models ) {
                Country.belongsTo( models.Continent );
                // Country.hasMany( models.City );
                // Country.hasMany( models.CallingCode );
            }
        }
    });

    return Country;
};

