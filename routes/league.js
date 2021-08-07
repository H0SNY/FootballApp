import express from 'express';
import {League} from '../models/league.model.js';

export const leagueRoute = express();





//get a league by id
leagueRoute.route('/').get(async (req , res) =>{
	try{
		let id = req.query.id;
		const league = await League.findOne({id : {$eq : id}});
		res.json({league : league});
		console.log(`${id} fetched succesfully , get league by id`);
		
	}catch(err){
		console.error(` ${err.message} , league route by id`);
		res.json({err : err , league : null});
		
	}
});


leagueRoute.route('/all').get(async (req , res) =>{
	try{
		const leagues = await League.find({});
		res.json({ leagues : leagues});
		console.log(`fetched succesfully , league.js/all`);
		
	}catch(err){
		console.error(`failed to fetch leagues ,  ${err.message}`);
		res.json({err : err , leagues : null});
		
	}	
});	





