import express from 'express';
import { Teams } from '../models/teams.model.js';

export const teamsRoute = express();


//get teams of a league
teamsRoute.route('/').get(async (req , res) =>{
	try{
		const {id} = req.query;
		const teams = await Teams.findOne({leagueID : {$eq : id}});
		res.json({teams : teams.teams});
	}catch(err){
		console.error(`${err.message} , teams.js/id`);
		return {err : err , teams : null};
	}
});

//post teams of a league
teamsRoute.route('/add').post(async(req , res)=>{
	try{
		let {id , teams} = req.query;
		teams = JSON.parse(teams);
		const t = new Teams({
			leagueID : id , 
			teams : teams
		});

		const response = await t.save((err , te) =>{
			if(err)throw new Error(err);
			res.json({msg : 'Document Updated'});
		});
	}catch(err){
		console.error(`${err.message} , teams.js/add`);
		res.json({err : err , msg : 'Failed To Update'});
	}
});

//update teams of a eague
teamsRoute.route('/update').post(async (req , res) =>{
	try{
		let {id , teams} = req.query;
		teams = JSON.parse(teams);
		console.log(teams);
		const response = Teams.updateOne(
			{leagueID : id} , 
			{
				$push : {teams : { $each :  [...teams] } }
			}
		);
		res.json({msg : 'Updated Successfully'})

	}catch(err){
		console.error(err.message , 'teams.js/update');
		res.json({err : err , msg : 'Failed To Update'});
	}
});