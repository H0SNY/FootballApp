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

