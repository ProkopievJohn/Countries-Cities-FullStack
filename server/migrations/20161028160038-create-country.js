class Country {
	constructor() {
		this.up = ( queryInterface, Sequelize ) => {
			return queryInterface.createTable( 'Country', {
				country_id: Sequelize.INTEGER,
				country: Sequelize.STRING,
				continent: Sequelize.INTEGER
			});
		};

		this.down = ( queryInterface, Sequelize ) => {
			return queryInterface.dropTable( 'Country' )
		}
	}
}

export default new Country();
