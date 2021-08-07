import express from 'express';
import { Matches } from '../models/matches.model.js';

export const matchesRoute = express();

//get matches of a league
matchesRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		const matches = await Matches.findOne({leagueID : {$eq : id}});
		res.json({matches : matches.matches})
		console.log(`${id} fetched succesfully , get matches`);
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err , matches : null});
		
	}
	
});


