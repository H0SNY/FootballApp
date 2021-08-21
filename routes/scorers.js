import { Scorers } from "../models/scorers.model.js";
import express from 'express';

export const scorersRoute = express();

//get goal scorers of a league
scorersRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		const scorers = await Scorers.findOne({leagueID : {$eq : id}});
		res.json({scorers : scorers.scorers})
	}catch(err){
		console.error(` ${err.message} , scorers.js/get`);
		res.json({err : err , scorers : null});
	}
	
});

