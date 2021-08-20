import express from 'express';
import { Matches } from '../models/matches.model.js';

export const matchesRoute = express();

//get matches of a league
matchesRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		const matches = await Matches.findOne({leagueID : {$eq : id}});
		res.json({valid : true , matches : matches.matches})
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err.message , matches : null});
		
	}
	
});

//getmatches of a league in a specefic date in utc
matchesRoute.route('/date').get(async (req , res) =>{
	try{
		const {date , leagueID} = req.query;
		const matches = await Matches.find({utcDate : ``})
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err.message , matches : null});
		
	}
})


