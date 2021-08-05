import express from 'express';
import { Matches } from '../models/matches.model.js';

export const matchesRoute = express();

//get matches of a league
matchesRoute.route('/:id').get(async (req , res) =>{
	try{
		const {id} = req.params;
		const matches = await Matches.findOne({leagueID : {$eq : id}});
		res.json({matches : matches.matches})
		console.log(`${id} fetched succesfully , get matches`);
	}catch(err){
		console.error(`${err.message} , matches.js/getMatches`);
		res.json({err : err , matches : null});
		
	}
	
});


////post to db

matchesRoute.route('/add').post(async (req , res) => {
	try{
		let {matches , id} = req.query;
		matches = JSON.parse(matches);
		const mt = new Matches({
			leagueID : id , 
			matches : matches
		})
		const response = await mt.save((err , m) =>{
			if(err)throw new Error(err);
			res.json({msg : 'Document Updated'});
		})
	}catch(err){
		console.error(err);
		res.json({err : err , msg : 'Failed To Update Document'});
	}
});
