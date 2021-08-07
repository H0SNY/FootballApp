import axios from 'axios';
import express from 'express';
import { Teams } from '../models/teams.model.js';
export const teamsRoute = express();


//get all teams as an array of teams of each league


teamsRoute.route('/all').get(async(req , res) =>{
	try{
		const teams = await Teams.find({});
		res.json({leagueTeams : teams});
	}catch(err){
		console.error(err.message , 'teams.js/all')
		res.json({err : err , leagueTeams : null})
	}
});



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
		let {id } = req.query;
		const t = new Teams({
			leagueID : id , 
			teams : []
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
teamsRoute.route('/addteams').post(async (req , res) =>{
	try{
		let {id , team} = req.query;
		console.log(team);
		team = JSON.parse(team);
		console.log(team);
		const response = await Teams.updateOne(
			{leagueID : id} , 
			{
				$push : {teams : { $each : [...team] } }
			}
		);
		res.json({msg : 'Updated Successfully'})

	}catch(err){
		console.error(err.message , 'teams.js/update');
		res.json({err : err , msg : 'Failed To Update'});
	}
});


