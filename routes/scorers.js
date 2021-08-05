import { Scorers } from "../models/scorers.model.js";
import express from 'express';

export const scorersRoute = express();

//get goal scorers of a league
scorersRoute.route('/:id').get(async (req , res) =>{
	try{
		const {id} = req.params;
		const scorers = await Scorers.findOne({leagueID : {$eq : id}});
		res.json({scorers : scorers.scorers})
		console.log(`${id} fetched succesfully , get scorers`);
	}catch(err){
		console.error(` ${err.message} , scorers.js/get`);
		res.json({err : err , scorers : null});
	}
	
});

scorersRoute.route('/add').post(async (req , res) =>{
	try{
		let { id , scorers} = req.query;
		scorers = JSON.parse(scorers);
		const mt = new Scorers({
			leagueID : id ,
			scorers : scorers
		})

		const response = await mt.save((err , s) =>{
			if(err) throw new Error(err);
			res.json({msg : 'Document Updated'});
		});
	}catch(err){
		console.error(err);
		res.json({err : err , msg : 'Failed To Update'});
	}
});