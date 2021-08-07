import express from 'express';
import { Standing } from '../models/standing.model.js';

export const standingRoute = express();

//get standings of a league
standingRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		if(!Number(id)) throw new Error(`Invalid ID`);
		const standings = await Standing.findOne({
			leagueID : {$eq : id}
		});
		res.json({standings : standings.standings });
	}catch(err){	
		console.error(`${err.message} , standing.js/id`);
		res.json({err : err , standings: null});
	}
	
});





