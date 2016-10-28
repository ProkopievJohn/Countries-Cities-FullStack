class Continents {
	constructor() {
		this.up = ( queryInterface, Sequelize ) => {
			return queryInterface.createTable( 'Continent', {
				continent_id: Sequelize.INTEGER,
				continent: Sequelize.STRING
			});
		};

		this.down = ( queryInterface, Sequelize ) => {
			return queryInterface.dropTable( 'Continent' )
		}
	}
}

export default new Continents();
