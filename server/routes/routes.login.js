// import User from '../db/User.model';
// import express from 'express';
// import db from '../db';
// import jwt from 'jsonwebtoken';


// const router = express.Router();
// const secret = 'SecretWord';
// const time = 86000;



// router.route( '/login' )
// 	.post( ( req, res ) => {
// 		if ( !req.body.name || !req.body.password ) {
// 			res.json({
// 				success: false,
// 				message: 'Authentication failed. Need name and/or password.'
// 			})
// 		}

// 		const id = { name: req.body.name };

// 		User.findOne( id, ( err, data ) => {
// 			if ( !data || data.password !== req.body.password ) {
// 				res.json({
// 					success: false,
// 					message: 'Authentication failed. Need name and/or password.'
// 				})
// 			}

// 			res.json({ success: true, user: data, token: jwt.sign( id, secret ) })
// 		})
// 	})

// export default router;