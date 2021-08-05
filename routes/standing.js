import express from 'express';
import { Standing } from '../models/standing.model.js';

export const standingRoute = express();

//get standings of a league
standingRoute.route('/:id').get(async (req , res) =>{
	try{
		const {id} = req.params;
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




//add new standing

standingRoute.route('/add').post(async (req , res) =>{
	try{
		let {standing , id} = req.query;
		console.log(`JSON standing : ${standing}`);
		standing = JSON.parse(standing);
		let st = {
			leagueID : id , 
			standings : standing
		}
		const scStanding = new Standing(st);
		const response = await scStanding.save((err , st) =>{
			if(err) throw new Error(err);
			else res.json({msg : 'Document Updated'});
		});
	}catch(err){
		console.error(`${err.message} , standingRoute/add`);
		res.json({err : err , msg : 'Failed To Update'});
	}
});


