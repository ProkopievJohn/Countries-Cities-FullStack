class CallingCode {
	constructor() {
		this.up = ( queryInterface, Sequelize ) => {
			return queryInterface.createTable( 'CallingCode', {
				calling_code_id: Sequelize.INTEGER,
				calling_code: Sequelize.INTEGER,
				country: Sequelize.INTEGER
			});
		};

		this.down = ( queryInterface, Sequelize ) => {
			return queryInterface.dropTable( 'CallingCode' )
		}
	}
}

export default new CallingCode();
