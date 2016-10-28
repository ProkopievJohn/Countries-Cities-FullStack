class City {
	constructor() {
		this.up = ( queryInterface, Sequelize ) => {
			return queryInterface.createTable( 'City', {
				city_id: Sequelize.INTEGER,
				city: Sequelize.STRING,
				population: Sequelize.INTEGER,
				country: Sequelize.STRING
			});
		};

		this.down = ( queryInterface, Sequelize ) => {
			return queryInterface.dropTable( 'City' )
		}
	}
}

export default new City();
